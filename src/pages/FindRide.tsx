import Layout from "@/layout/Layout.tsx";
import TripSearch from "@/components/TripSearch.tsx";
import { DestinationCard } from "@/components/DestinationCard.tsx";

const destinations = [
  {
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

const FindRide = () => {
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
          <div className="flex justify-around items-center mb-4">
            <p className="text-sm text-gray-500">Do., 17 Nov.</p>
            <p className="text-sm text-gray-500 underline">Fr., 18 Nov.</p>
            <p className="text-sm text-gray-500">Sa., 19 Nov.</p>
          </div>
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
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
