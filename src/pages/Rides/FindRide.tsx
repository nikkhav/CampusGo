import Layout from "@/layout/Layout.tsx";
import TripSearch from "@/components/TripSearch.tsx";
import { DestinationCard } from "@/components/DestinationCard.tsx";
import { useState } from "react";

const destinations = [
  {
    id: "1",
    from: "Bayreuth",
    to: "Kulmbach",
    fromAddress: "Universitätstr. 1",
    toAddress: "Universitätstr. 2",
    startTime: "12:00",
    duration: "1:00 Std.",
    endTime: "13:00",
    passengerName: "Nikita K.",
    passengerInitials: "NK",
  },
  {
    id: "2",
    from: "Nürnberg",
    to: "Erlangen",
    fromAddress: "Bahnhofstr. 5",
    toAddress: "Hauptstr. 12",
    startTime: "08:30",
    duration: "0:30 Std.",
    endTime: "09:00",
    passengerName: "Julia M.",
    passengerInitials: "JM",
  },
  {
    id: "3",
    from: "München",
    to: "Augsburg",
    fromAddress: "Marienplatz",
    toAddress: "Maximilianstr. 8",
    startTime: "10:15",
    duration: "1:15 Std.",
    endTime: "11:30",
    passengerName: "Lukas H.",
    passengerInitials: "LH",
  },
  {
    id: "4",
    from: "Berlin",
    to: "Potsdam",
    fromAddress: "Alexanderplatz",
    toAddress: "Schlossstr. 3",
    startTime: "14:00",
    duration: "0:45 Std.",
    endTime: "14:45",
    passengerName: "Sophia B.",
    passengerInitials: "SB",
  },
  {
    id: "5",
    from: "Frankfurt",
    to: "Wiesbaden",
    fromAddress: "Hauptbahnhof",
    toAddress: "Rheinstr. 10",
    startTime: "17:30",
    duration: "0:40 Std.",
    endTime: "18:10",
    passengerName: "Mark T.",
    passengerInitials: "MT",
  },
];

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

interface DateObj {
  day: string; // Short day name (e.g., "Mon", "Tue")
  date: number; // Numeric day of the month
  month: string; // Short month name (e.g., "Jan", "Feb")
}

const formatDate = (dateObj: DateObj): string =>
  `${dateObj.day}, ${dateObj.date} ${dateObj.month}`;

const FindRide = () => {
  const [activeDate, setActiveDate] = useState(today);

  const visibleDates = dates.slice(0, 3);
  return (
    <Layout>
      <TripSearch />
      <div className="w-10/12 mx-auto flex justify-between mt-6">
        <div className="w-4/12">
          <p className="text-lg font-bold mb-4">Abfahrtszeit</p>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              Vor 5:00
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              5:01 - 12:00
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              12:01 - 17:00
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Nach 17:00
            </label>
          </div>
          <p className="text-lg font-bold mt-6 mb-4">Präferenzen</p>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Nicht Raucher
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Haustiere sind erlaubt
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Only Ladies
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Zwischenstopps sind gewünscht
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
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              id={destination.id}
              from={destination.from}
              to={destination.to}
              fromAddress={destination.fromAddress}
              toAddress={destination.toAddress}
              startTime={destination.startTime}
              duration={destination.duration}
              endTime={destination.endTime}
              passengerName={destination.passengerName}
              passengerInitials={destination.passengerInitials}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FindRide;
