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
import Select from "@/components/Select.tsx";

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
    driver_id: "",
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
  const [selectedPlaces, setSelectedPlaces] = useState<string>("1");

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

  useEffect(() => {
    fetchRideData();
  }, []);

  const createBooking = async (rideId: string) => {
    if (!session || !session.user) {
      toast.error("You need to log in to make a booking.");
      return;
    }

    const passengerId = session.user.id;

    if (passengerId === rideData.driver_id) {
      toast.error("You cannot book your own ride.");
      return;
    }

    const selectedSeats = parseInt(selectedPlaces);

    if (!selectedSeats || selectedSeats < 1) {
      toast.error("Please select a valid number of seats.");
      return;
    }

    if (rideData.available_seats < selectedSeats) {
      toast.error("Not enough seats available.");
      return;
    }

    try {
      const { error: bookingError } = await supabase
        .from("bookings")
        .insert([
          {
            ride_id: rideId,
            passenger_id: passengerId,
            seats_reserved: selectedSeats,
          },
        ])
        .select();

      if (bookingError) throw bookingError;

      const updatedAvailableSeats = rideData.available_seats - selectedSeats;
      const { error: updateError } = await supabase
        .from("rides")
        .update({ available_seats: updatedAvailableSeats })
        .eq("id", rideId);

      if (updateError) throw updateError;

      setRideData((prevState) => ({
        ...prevState,
        available_seats: updatedAvailableSeats,
      }));

      toast.success("Booking successfully created!");
    } catch (err) {
      console.error("Error during booking process:", err);
      toast.error("An error occurred while creating the booking.");
    }
  };

  const generateSeatOptions = (availableSeats: string): string[] => {
    const availableSeatsInt = parseInt(availableSeats);
    if (!availableSeatsInt || availableSeatsInt < 1) return [];
    return Array.from(
      { length: availableSeatsInt },
      (_, index) => `${index + 1}`,
    );
  };

  const handleContact = async () => {
    if (!session || !session.user) {
      toast.error("You need to log in to contact the driver.");
      return;
    }

    const userId = session.user.id;
    const driverId = rideData.driver_id;

    try {
      // Check if a conversation already exists
      const { data: existingConversations, error: conversationError } =
        await supabase
          .from("conversations")
          .select("*")
          .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
          .or(`user1_id.eq.${driverId},user2_id.eq.${driverId}`)
          .limit(1);

      if (conversationError) throw conversationError;

      let conversationId;

      if (existingConversations && existingConversations.length > 0) {
        // Conversation already exists
        conversationId = existingConversations[0].id;
      } else {
        // Create a new conversation
        const { data: newConversation, error: newConversationError } =
          await supabase
            .from("conversations")
            .insert([
              {
                user1_id: userId,
                user2_id: driverId,
              },
            ])
            .select();

        if (newConversationError) throw newConversationError;
        conversationId = newConversation[0].id;
      }

      // Redirect to the chats page with the conversation ID as a query parameter
      window.location.href = `/chats?id=${conversationId}`;
    } catch (err) {
      console.error("Error handling contact:", err);
      toast.error("An error occurred while trying to contact the driver.");
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
            <div className="flex flex-col justify-center items-center text-center w-1/3">
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

            <div className="flex items-center justify-center flex-grow mx-4 relative w-1/3">
              <div className="h-px bg-green-600 flex-grow"></div>
              <p className="mx-4 text-green-600 font-semibold">
                Fahrtzeit: {duration}
              </p>
              <div className="h-px bg-green-600 flex-grow" />
            </div>

            <div className="flex flex-col justify-center items-center text-center w-1/3">
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
              {/*<p className="text-sm text-gray-500 mt-1">Über mich:</p>*/}
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
          <label className="block text-gray-700 font-semibold">
            Anzahl der gebuchten Plätze
          </label>
          <Select
            placeholder="Anzahl der Plätze auswählen"
            className="w-1/3 mt-4 border border-gray-300 rounded-lg p-2"
            value={selectedPlaces}
            onChange={(place) => setSelectedPlaces(place)}
            options={generateSeatOptions(String(rideData.available_seats))}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex justify-start gap-4">
            <button
              onClick={handleContact}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 shadow-md"
            >
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
