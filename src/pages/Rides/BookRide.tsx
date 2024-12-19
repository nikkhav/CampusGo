import Layout from "@/layout/Layout.tsx";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient.ts";
import { Stop } from "@/types.ts";
import Mapbox from "@/components/Map.tsx";
import { calculateDuration } from "@/lib/utils.ts";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import PreferenceTag from "@/components/PreferenceTag.tsx";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";
import AccountRequired from "@/pages/AccountRequired.tsx";
import { toast } from "react-toastify";

const BookRide = () => {
  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useSupabaseSession();
  const [rideData, setRideData] = useState({
    id: "",
    start_time: "",
    end_time: "",
    available_seats: 0,
    users: {
      first_name: "",
      last_name: "",
      image: "",
      preferences: [],
      languages: [],
    },
    stops: [
      {
        stop_type: "start",
        locations: { name: "" },
      },
      {
        stop_type: "end",
        locations: { name: "" },
      },
    ],
    vehicles: {
      brand: "",
      model: "",
      color: "",
      license_plate: "",
    },
  });
  const [startStop, setStartStop] = useState<Stop>({
    id: "",
    ride_id: "",
    location_id: "",
    stop_type: "start",
    stop_order: 0,
    created_at: "",
    updated_at: "",
    locations: {
      id: "",
      name: "",
      latitude: 0,
      longitude: 0,
      created_at: "",
      updated_at: "",
    },
  });
  const [endStop, setEndStop] = useState<Stop>({
    id: "",
    ride_id: "",
    location_id: "",
    stop_type: "end",
    stop_order: 0,
    created_at: "",
    updated_at: "",
    locations: {
      id: "",
      name: "",
      latitude: 0,
      longitude: 0,
      created_at: "",
      updated_at: "",
    },
  });

  const [intermediateStops, setIntermediateStops] = useState([
    {
      id: "",
      ride_id: "",
      location_id: "",
      stop_type: "intermediate",
      stop_order: 0,
      created_at: "",
      updated_at: "",
      stop_time: "",
      locations: {
        id: "",
        name: "",
        latitude: 0,
        longitude: 0,
        created_at: "",
        updated_at: "",
      },
    },
  ]);
  const [duration, setDuration] = useState<string>("");

  const rideId = window.location.pathname.split("/").pop();
  const formatDateTime = (isoString: string): [string, string] => {
    const date = new Date(isoString);

    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const dateString = `${day} ${month}`;

    const timeString = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return [dateString, timeString];
  };

  const fetchRideData = async () => {
    try {
      const { data, error } = await supabase
        .from("rides")
        .select(
          `
        *,
        users (first_name, last_name, image, preferences, languages),
        vehicles (brand, model, color, license_plate),
        stops (
          *,
          locations (*)
        )
      `,
        )
        .eq("id", rideId)
        .single();

      if (error) throw error;

      setRideData(data);

      const startStop = data.stops.find(
        (stop: Stop) => stop.stop_type === "start",
      );
      const endStop = data.stops.find((stop: Stop) => stop.stop_type === "end");
      const intermediateStops = data.stops.filter(
        (stop: Stop) => stop.stop_type === "intermediate",
      );

      setStartStop(startStop);
      setEndStop(endStop);
      setIntermediateStops(intermediateStops);
      setDuration(calculateDuration(data.start_time, data.end_time));
    } catch (err) {
      console.error("Error fetching rides:", err);
    }
  };

  const createBooking = async (rideId: string) => {
    if (!session || !session.user) {
      console.error("User session is not available.");
      return;
    }

    if (!rideId) {
      console.error("Ride ID is not available.");
      return;
    }

    const passengerId = session.user.id;

    try {
      const { data, error } = await supabase.from("bookings").insert([
        {
          ride_id: rideId,
          passenger_id: passengerId,
          seats_reserved: 1, // Default to 1 seat for now. Should be calculated?
          status: "pending", // Default status can be changed as needed
        },
      ]);

      if (error) {
        console.error("Error creating booking:", error);
        return;
      }

      toast.success("Buchung erfolgreich erstellt!");
      console.log("Booking created:", data);
    } catch (err) {
      console.error("Error creating booking:", err);
    }
  };

  if (sessionLoading) {
    return <div>Loading...</div>;
  }
  if (sessionError) {
    return <div>Error: {sessionError}</div>;
  }

  if (!session) {
    return <AccountRequired />;
  }

  useEffect(() => {
    fetchRideData();
  }, []);
  return (
    <Layout>
      <div className="w-8/12 mx-auto my-10">
        <h2 className="text-4xl text-center font-semibold">Reise buchen</h2>
        <p className="mt-4 text-center text-gray-600">
          Bitte lesen Sie die Informationen zur Fahrt sorgfältig durch, bevor
          Sie diese buchen.
        </p>

        <div className="mt-10 border p-8 bg-white shadow-lg rounded-xl">
          <div className="flex justify-between items-center w-full mx-auto">
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-sm font-semibold text-gray-500">
                {formatDateTime(rideData.start_time)[0]}
              </p>
              <p className="text-xl font-bold mt-2">
                {startStop.locations && startStop.locations.name}
              </p>
              <p className="mt-1 text-gray-500">
                {formatDateTime(rideData.start_time)[1]}
              </p>
              <div className="mt-4">
                {startStop?.locations && startStop.locations.longitude && (
                  <Mapbox
                    longitude={startStop.locations.longitude}
                    latitude={startStop.locations.latitude}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-center flex-grow mx-4 relative">
              <div className="h-px bg-green-600 flex-grow"></div>
              <p className="mx-4 text-green-600 font-semibold">
                Fahrtzeit: {duration}
              </p>
              <div className="h-px bg-green-600 flex-grow" />
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-sm font-semibold text-gray-500">
                {formatDateTime(rideData.end_time)[0]}
              </p>
              <p className="text-xl font-bold mt-2">
                {endStop.locations && endStop.locations.name}
              </p>
              <p className="mt-1 text-gray-500">
                {formatDateTime(rideData.end_time)[1]}
              </p>
              <div className="mt-4">
                {endStop?.locations && endStop.locations.longitude && (
                  <Mapbox
                    longitude={endStop.locations.longitude}
                    latitude={endStop.locations.latitude}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {intermediateStops.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Zwischenstopps
            </h3>
            <div className="flex justify-center gap-8 bg-white py-5 border shadow-lg rounded-xl">
              {intermediateStops.map((stop, index) => (
                <div key={stop.id} className="flex flex-col items-center">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">
                      Stopp {index + 1}
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-2">
                      {stop.locations.name}
                    </p>
                    <p className="text-gray-500">
                      {formatDateTime(stop.stop_time)[1]}
                    </p>
                  </div>
                  <div className="mt-4">
                    {stop.locations.longitude && stop.locations.latitude && (
                      <Mapbox
                        longitude={stop.locations.longitude}
                        latitude={stop.locations.latitude}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 border bg-white shadow-lg rounded-xl p-8">
          {/* User Info Section */}
          <div className="flex items-center mb-6">
            <Avatar className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
              <AvatarImage
                src={rideData.users.image}
                alt={`${rideData.users.first_name} ${rideData.users.last_name}'s image`}
                className="object-cover h-full w-full"
              />
              <AvatarFallback className="bg-gray-300 text-lg text-gray-700 font-bold">
                {rideData.users.first_name.charAt(0)}
                {rideData.users.last_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p className="text-lg font-bold">
                {rideData.users.first_name} {rideData.users.last_name}
              </p>
              <p className="text-sm text-gray-500 mt-1">Über mich:</p>
            </div>
          </div>

          {/* Preferences Section */}
          {rideData.users.preferences.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-500 font-semibold">Präferenzen:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {rideData.users.preferences.map((preference) => (
                  <PreferenceTag text={preference} key={preference} />
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {rideData.users.languages.length > 0 && (
            <div className="mb-6">
              <p className="text-gray-500 font-semibold">Sprachen:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {rideData.users.languages.map((language) => (
                  <PreferenceTag text={language} key={language} />
                ))}
              </div>
            </div>
          )}

          {/* Vehicle Section */}
          <div className="mb-6">
            <p className="text-gray-700 font-semibold">
              Fahrzeug: {rideData.vehicles.brand} {rideData.vehicles.model} -{" "}
              {rideData.vehicles.color} ({rideData.vehicles.license_plate})
            </p>
            <p className="text-gray-500 text-sm mt-2">
              {rideData.available_seats} freie Plätze
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-start gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 shadow-md">
              {`${rideData.users.first_name} kontaktieren`}
            </button>
            <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 shadow-md">
              Fahrt melden
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="rounded-3xl bg-green-600 text-white px-6 py-3 text-lg hover:bg-green-700"
            onClick={() => createBooking(rideId || "")}
          >
            Buchung bestätigen
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookRide;
