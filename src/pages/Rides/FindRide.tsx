import Layout from "@/layout/Layout.tsx";
import TripSearch from "@/components/TripSearch.tsx";
import { DestinationCard } from "@/components/DestinationCard.tsx";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient.ts";

interface RideDataSupabase {
  id: string;
  start_time: string;
  end_time: string;
  users: {
    first_name: string;
    last_name: string;
    image?: string;
  };
  stops: {
    stop_type: "start" | "end" | "intermediate";
    locations: {
      name: string;
    };
  }[];
}

interface FullRide {
  id: string;
  start_time: string;
  end_time: string;
  start_location: string;
  end_location: string;
  intermediate_stops: number;
  driver: {
    first_name: string;
    last_name: string;
    image?: string;
  };
}

const today = new Date();

const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(today.getDate() + i);
  return {
    day: date.toLocaleDateString("de-DE", { weekday: "short" }),
    date: date.getDate(),
    month: date.toLocaleDateString("de-DE", { month: "short" }),
    fullDate: date,
  };
});

const formatDate = (dateObj: { day: string; date: number; month: string }) =>
  `${dateObj.day}, ${dateObj.date} ${dateObj.month}`;

const FindRide = () => {
  const [allRides, setAllRides] = useState<FullRide[]>([]);
  const [rides, setRides] = useState<FullRide[]>([]);
  const [activeDate, setActiveDate] = useState(today);
  const [timeFilters, setTimeFilters] = useState<string[]>([]);

  const visibleDates = dates.slice(0, 3);

  const getRides = async () => {
    try {
      const { data, error } = await supabase.from("rides").select(
        `
        id,
        start_time,
        end_time,
        users(first_name, last_name, image),
        stops(
          stop_type,
          locations(name)
        )
      `,
      );

      if (error) throw error;

      // @ts-ignore
      const formattedData = (data as RideDataSupabase[]).map((ride) => {
        const startStop = ride.stops.find((stop) => stop.stop_type === "start");
        const endStop = ride.stops.find((stop) => stop.stop_type === "end");
        const intermediateStops = ride.stops.filter(
          (stop) => stop.stop_type === "intermediate",
        );

        return {
          id: ride.id,
          start_time: ride.start_time,
          end_time: ride.end_time,
          start_location: startStop?.locations.name || "Unknown",
          end_location: endStop?.locations.name || "Unknown",
          intermediate_stops: intermediateStops.length,
          driver: {
            first_name: ride.users.first_name,
            last_name: ride.users.last_name,
            image: ride.users.image,
          },
        };
      });

      setAllRides(formattedData);
      setRides(formattedData);
    } catch (error) {
      console.error("Error fetching rides:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...allRides];

    if (timeFilters.length > 0) {
      filtered = filtered.filter((ride) => {
        const rideStartTime = new Date(ride.start_time).getHours();
        return timeFilters.some((filter) => {
          if (filter === "before_5") return rideStartTime < 5;
          if (filter === "5_to_12")
            return rideStartTime >= 5 && rideStartTime < 12;
          if (filter === "12_to_17")
            return rideStartTime >= 12 && rideStartTime < 17;
          if (filter === "after_17") return rideStartTime >= 17;
          return false;
        });
      });
    }

    setRides(filtered);
  };

  const toggleTimeFilter = (filter: string) => {
    setTimeFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((item) => item !== filter)
        : [...prev, filter],
    );
  };

  useEffect(() => {
    getRides();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [timeFilters]);

  return (
    <Layout>
      <TripSearch />
      <div className="w-10/12 mx-auto flex justify-between mt-6">
        <div className="w-4/12">
          <p className="text-lg font-bold mb-4">Abfahrtszeit</p>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleTimeFilter("before_5")}
              />
              Vor 5:00
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleTimeFilter("5_to_12")}
              />
              5:00 - 12:00
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleTimeFilter("12_to_17")}
              />
              12:00 - 17:00
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleTimeFilter("after_17")}
              />
              Nach 17:00
            </label>
          </div>
        </div>
        <div className="w-8/12">
          <div className="flex justify-around items-center mb-4 text-lg font-bold">
            {visibleDates.map((dateObj, index) => (
              <p
                key={index}
                onClick={() => setActiveDate(dateObj.fullDate)}
                className={`cursor-pointer ${
                  dateObj.fullDate.toDateString() === activeDate.toDateString()
                    ? "border-b-2 border-b-green-600"
                    : ""
                }`}
              >
                {formatDate(dateObj)}
              </p>
            ))}
          </div>
          {rides.map((ride) => (
            <DestinationCard
              key={ride.id}
              id={ride.id}
              startDate={ride.start_time}
              endDate={ride.end_time}
              intermediateStopsAmount={ride.intermediate_stops}
              from={ride.start_location}
              to={ride.end_location}
              driverFirstName={ride.driver.first_name}
              driverLastName={ride.driver.last_name}
              driverImage={ride.driver.image}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FindRide;
