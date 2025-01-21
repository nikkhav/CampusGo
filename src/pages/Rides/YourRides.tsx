import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import { supabase } from "@/supabaseClient.ts";
import { DestinationCard } from "@/components/DestinationCard.tsx";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";

interface Ride {
  id: string;
  start_time: string;
  end_time: string;
  start_location: string;
  end_location: string;
  available_seats: number;
  intermediate_stops: number;
  driver: { first_name: string; last_name: string; image?: string };
}

const groupRidesByDate = (rides: Ride[]) => {
  const grouped: { [date: string]: Ride[] } = {};
  rides.forEach((ride) => {
    const date = new Date(ride.start_time).toLocaleDateString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(ride);
  });
  return grouped;
};

const YourRides = () => {
  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useSupabaseSession();
  const [activeTab, setActiveTab] = useState<"booked" | "published">("booked");
  const [publishedRides, setPublishedRides] = useState<Ride[]>([]);
  const [bookedRides, setBookedRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRides = async () => {
    setLoading(true);
    try {
      if (!session?.user) return;

      const userId = session.user.id;

      // Fetch Booked Rides
      const { data: booked, error: bookedError } = await supabase
        .from("bookings")
        .select(
          `
            id,
            rides (
              id,
              start_time,
              end_time,
              available_seats,
              driver:users(first_name, last_name, image),
              stops (
                stop_type,
                location:locations(name)
              )
            )
          `,
        )
        .eq("passenger_id", userId);

      if (bookedError) throw bookedError;

      const formattedBookedRides = booked.map((booking: any) => {
        const ride = booking.rides;
        const startStop = ride.stops.find(
          (stop: any) => stop.stop_type === "start",
        );
        const endStop = ride.stops.find(
          (stop: any) => stop.stop_type === "end",
        );
        const intermediateStops = ride.stops.filter(
          (stop: any) => stop.stop_type === "intermediate",
        );

        return {
          id: ride.id,
          start_time: ride.start_time,
          end_time: ride.end_time,
          start_location: startStop?.location?.name || "Unknown",
          end_location: endStop?.location?.name || "Unknown",
          intermediate_stops: intermediateStops.length,
          available_seats: ride.available_seats,
          driver: ride.driver,
        };
      });

      setBookedRides(formattedBookedRides);

      // Fetch Published Rides
      const { data: published, error: publishedError } = await supabase
        .from("rides")
        .select(
          `
            id,
            start_time,
            end_time,
            available_seats,
            driver:users(first_name, last_name, image),
            stops (
              stop_type,
              location:locations(name)
            )
          `,
        )
        .eq("driver_id", userId);

      if (publishedError) throw publishedError;

      const formattedPublishedRides = published.map((ride: any) => {
        const startStop = ride.stops.find(
          (stop: any) => stop.stop_type === "start",
        );
        const endStop = ride.stops.find(
          (stop: any) => stop.stop_type === "end",
        );
        const intermediateStops = ride.stops.filter(
          (stop: any) => stop.stop_type === "intermediate",
        );

        return {
          id: ride.id,
          start_time: ride.start_time,
          end_time: ride.end_time,
          start_location: startStop?.location?.name || "Unknown",
          end_location: endStop?.location?.name || "Unknown",
          intermediate_stops: intermediateStops.length,
          available_seats: ride.available_seats,
          driver: ride.driver,
        };
      });

      setPublishedRides(formattedPublishedRides);
    } catch (err) {
      console.error("Error fetching rides:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchRides();
  }, [session]);

  const groupedBookedRides = groupRidesByDate(bookedRides);
  const groupedPublishedRides = groupRidesByDate(publishedRides);

  if (sessionLoading) return <div className="text-center mt-20">Laden...</div>;
  if (sessionError)
    return <div className="text-center mt-20">Fehler: {sessionError}</div>;

  return (
    <Layout>
      <div className="w-10/12 mx-auto my-16">
        <div className="flex justify-center gap-10 border-b-2 border-gray-200 pb-4">
          <button
            className={`text-lg font-medium ${
              activeTab === "booked"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("booked")}
          >
            Gebuchte Fahrten
          </button>
          <button
            className={`text-lg font-medium ${
              activeTab === "published"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("published")}
          >
            Veröffentlichte Fahrten
          </button>
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="text-center">Laden...</p>
          ) : activeTab === "booked" ? (
            Object.keys(groupedBookedRides).length > 0 ? (
              Object.entries(groupedBookedRides).map(([date, rides]) => (
                <div key={date}>
                  <h2 className="text-lg font-bold my-4">{date}</h2>
                  {rides.map((ride) => (
                    <DestinationCard
                      key={ride.id}
                      id={ride.id}
                      startDate={ride.start_time}
                      endDate={ride.end_time}
                      from={ride.start_location}
                      to={ride.end_location}
                      intermediateStopsAmount={ride.intermediate_stops}
                      driverFirstName={ride.driver.first_name}
                      driverLastName={ride.driver.last_name}
                      driverImage={ride.driver.image}
                      disabled={true}
                    />
                  ))}
                </div>
              ))
            ) : (
              <p className="text-center">Keine gebuchten Fahrten</p>
            )
          ) : Object.keys(groupedPublishedRides).length > 0 ? (
            Object.entries(groupedPublishedRides).map(([date, rides]) => (
              <div key={date}>
                <h2 className="text-lg font-bold my-4">{date}</h2>
                {rides.map((ride) => (
                  <DestinationCard
                    key={ride.id}
                    id={ride.id}
                    startDate={ride.start_time}
                    endDate={ride.end_time}
                    from={ride.start_location}
                    to={ride.end_location}
                    intermediateStopsAmount={ride.intermediate_stops}
                    driverFirstName={ride.driver.first_name}
                    driverLastName={ride.driver.last_name}
                    driverImage={ride.driver.image}
                    disabled={true}
                  />
                ))}
              </div>
            ))
          ) : (
            <p className="text-center">Keine veröffentlichten Fahrten</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default YourRides;
