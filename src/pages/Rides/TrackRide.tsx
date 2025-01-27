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

interface PassengerBooking {
  id: string;
  ride_id: string;
  passenger_id: string;
  users: {
    first_name: string;
    last_name: string;
    image: string;
    preferences: string[];
    languages: string[];
  };
}

const TrackRide = () => {
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
      preferences: [] as string[],
      languages: [] as string[],
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

  const [intermediateStops, setIntermediateStops] = useState<Stop[]>([]);
  const [duration, setDuration] = useState<string>("");
  const [bookings, setBookings] = useState<PassengerBooking[]>([]);

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
      // Fetch ride data
      const { data: rideInfo, error: rideError } = await supabase
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

      if (rideError) throw rideError;

      if (rideInfo) {
        setRideData(rideInfo);

        const startStopData = rideInfo.stops.find(
          (stop: Stop) => stop.stop_type === "start",
        );
        const endStopData = rideInfo.stops.find(
          (stop: Stop) => stop.stop_type === "end",
        );
        const intermediateStopsData = rideInfo.stops.filter(
          (stop: Stop) => stop.stop_type === "intermediate",
        );

        setStartStop(startStopData);
        setEndStop(endStopData);
        setIntermediateStops(intermediateStopsData);
        setDuration(calculateDuration(rideInfo.start_time, rideInfo.end_time));
      }
    } catch (err) {
      console.error("Error fetching ride:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      // Fetch bookings for this ride
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select(
          `
            id,
            ride_id,
            passenger_id,
            users:users!bookings_passenger_id_fkey (
              first_name,
              last_name,
              image,
              preferences,
              languages
            )
          `,
        )
        .eq("ride_id", rideId);

      if (bookingsError) throw bookingsError;

      if (bookingsData) {
        // @ts-ignore
        setBookings(bookingsData);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleContact = async (otherUserId: string) => {
    if (!session || !session.user) {
      toast.error("You need to log in to contact this user.");
      return;
    }

    const currentUserId = session.user.id;

    try {
      // Check if a conversation already exists between currentUser and otherUser
      const { data: existingConversations, error: conversationError } =
        await supabase
          .from("conversations")
          .select("*")
          .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
          .or(`user1_id.eq.${otherUserId},user2_id.eq.${otherUserId}`)
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
                user1_id: currentUserId,
                user2_id: otherUserId,
              },
            ])
            .select();

        if (newConversationError) throw newConversationError;
        conversationId = newConversation[0].id;
      }

      // Redirect to the chats page with the conversation ID as a query parameter
      window.location.href = `/chats?id=${conversationId}`;
    } catch (err) {
      console.error("Error initiating contact:", err);
      toast.error("An error occurred while trying to contact this user.");
    }
  };

  useEffect(() => {
    fetchRideData();
    fetchBookings();
  }, []);

  if (sessionLoading) {
    return <div>Loading...</div>;
  }

  if (sessionError) {
    return <div>Error: {sessionError}</div>;
  }

  if (!session) {
    return <AccountRequired />;
  }

  // Identify if current user is driver
  const isDriver = session.user.id === rideData.driver_id;

  // Identify if current user is a passenger
  const isPassenger = bookings.some(
    (booking) => booking.passenger_id === session.user.id,
  );

  // Decide heading
  let pageTitle = "Fahrt verfolgen";
  if (isDriver) {
    pageTitle = "Ihre veröffentlichte Fahrt";
  } else if (isPassenger) {
    pageTitle = "Ihre gebuchte Fahrt";
  }

  return (
    <Layout>
      <div className="w-8/12 mx-auto my-10">
        <h2 className="text-4xl text-center font-semibold">{pageTitle}</h2>
        <p className="mt-4 text-center text-gray-600">
          Hier können Sie alle Details zu dieser Fahrt einsehen.
        </p>

        {/* Main Ride Info */}
        <div className="mt-10 border p-8 bg-white shadow-lg rounded-xl">
          <div className="flex justify-between items-center w-full mx-auto">
            {/* Start Stop */}
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

            {/* Duration */}
            <div className="flex items-center justify-center flex-grow mx-4 relative w-1/3">
              <div className="h-px bg-green-600 flex-grow"></div>
              <p className="mx-4 text-green-600 font-semibold">
                Fahrtzeit: {duration}
              </p>
              <div className="h-px bg-green-600 flex-grow" />
            </div>

            {/* End Stop */}
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

        {/* Intermediate Stops */}
        {intermediateStops.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-6">Zwischenstopps</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {intermediateStops.map((stop, index) => (
                <div
                  key={stop.id}
                  className="border p-4 shadow-lg rounded-xl flex flex-col"
                >
                  <p className="text-sm font-semibold text-gray-500">
                    Stopp {index + 1}
                  </p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    {stop?.locations?.name}
                  </p>
                  <p className="text-gray-500 mb-4">
                    {stop.stop_time
                      ? formatDateTime(stop.stop_time)[1]
                      : "Keine Zeit verfügbar"}
                  </p>
                  <div className="mt-auto w-full">
                    {stop?.locations?.latitude && stop.locations.longitude && (
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

        {/* Driver / Vehicle / Passenger Info */}
        <div className="mt-10 border bg-white shadow-lg rounded-xl p-8">
          {!isDriver && (
            <>
              {/* If the user is NOT the driver, show driver info */}
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
                </div>
              </div>

              {/* Preferences */}
              {rideData.users.preferences.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Präferenzen:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {rideData.users.preferences.map((pref: string) => (
                      <PreferenceTag text={pref} key={pref} />
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {rideData.users.languages.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Sprachen:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {rideData.users.languages.map((lang: string) => (
                      <PreferenceTag text={lang} key={lang} />
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicle */}
              <div className="mb-6">
                <p className="text-gray-700 font-semibold">
                  Fahrzeug: {rideData.vehicles.brand} {rideData.vehicles.model}{" "}
                  - {rideData.vehicles.color} ({rideData.vehicles.license_plate}
                  )
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {rideData.available_seats} freie Plätze
                </p>
              </div>

              {/* Action Buttons (Contact Driver, Report Ride) */}
              <div className="mt-8 flex justify-start gap-4">
                <button
                  onClick={() => handleContact(rideData.driver_id)}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 shadow-md"
                >
                  {`${rideData.users.first_name} kontaktieren`}
                </button>
                <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 shadow-md">
                  Fahrt melden
                </button>
              </div>
            </>
          )}

          {isDriver && (
            <>
              {/* If the user IS the driver, show passengers list instead of driver info */}
              <h3 className="text-xl font-bold mb-4">Passengers</h3>
              {bookings.length === 0 && (
                <p className="text-gray-500">No passengers booked yet.</p>
              )}
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border p-4 rounded-md shadow-sm"
                  >
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                        <AvatarImage
                          src={booking.users.image}
                          alt={`${booking.users.first_name} ${booking.users.last_name}`}
                          className="object-cover h-full w-full"
                        />
                        <AvatarFallback className="bg-gray-300 text-lg text-gray-700 font-bold">
                          {booking.users.first_name.charAt(0)}
                          {booking.users.last_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-semibold">
                          {booking.users.first_name} {booking.users.last_name}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {booking.users.preferences?.map((pref) => (
                            <PreferenceTag text={pref} key={pref} />
                          ))}
                          {booking.users.languages?.map((lang) => (
                            <PreferenceTag text={lang} key={lang} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleContact(booking.passenger_id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow-md"
                    >
                      Kontaktieren
                    </button>
                  </div>
                ))}
              </div>

              {/* Action button: Report Ride */}
              {!isDriver && (
                <div className="mt-8">
                  <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 shadow-md">
                    Fahrt melden
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrackRide;
