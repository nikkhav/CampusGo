import { useState } from "react";
import { MapPin, Users } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";
import Select from "@/components/Select";

export default function TripSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = () => {
    console.log({ from, to, date: date?.toISOString(), passengers });
    // Further processing or navigation logic
  };

  const locations = ["Bayreuth", "München", "Hamburg", "Frankfurt", "Köln"];

  return (
    <div className="flex w-full max-w-4xl items-center gap-2 rounded-full border bg-white p-2 shadow-md mx-auto my-10">
      <div className="flex flex-1 items-center gap-2 px-2">
        <MapPin className="h-4 w-4 text-gray-400" />
        <Select
          options={locations}
          value={from}
          onChange={setFrom}
          placeholder="Von"
          className="w-full"
        />
      </div>

      <div className="flex flex-1 items-center gap-2 border-l px-4">
        <MapPin className="h-4 w-4 text-gray-400" />
        <Select
          options={locations}
          value={to}
          onChange={setTo}
          placeholder="Nach"
          className="w-full"
        />
      </div>

      <div className="flex flex-1 items-center gap-2 border-l px-4">
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div className="flex flex-1 items-center gap-2 border-l px-4">
        <Users className="h-4 w-4 text-gray-400" />
        <input
          type="number"
          min={1}
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="w-full bg-transparent p-0 focus:outline-none"
          placeholder="Passagiere"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="rounded-full bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Suchen
      </button>
    </div>
  );
}
