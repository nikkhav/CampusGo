import { useState } from "react";
import { MapPin, Users, Minus, Plus } from "lucide-react";
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

  const incrementPassengers = () => {
    setPassengers((prev) => prev + 1);
  };

  const decrementPassengers = () => {
    setPassengers((prev) => Math.max(prev - 1, 1)); // Не меньше 1
  };

  return (
    <div className="flex w-full max-w-4xl items-center gap-2 rounded-full border bg-white p-2 shadow-md mx-auto my-10">
      <div className="flex w-3/12 items-center gap-2 px-2">
        <MapPin className="h-4 w-4 text-gray-400" />
        <Select
          options={locations}
          value={from}
          onChange={setFrom}
          placeholder="Von"
          className="w-full"
        />
      </div>

      <div className="flex w-3/12 items-center gap-2 border-l px-4">
        <MapPin className="h-4 w-4 text-gray-400" />
        <Select
          options={locations}
          value={to}
          onChange={setTo}
          placeholder="Nach"
          className="w-full"
        />
      </div>

      <div className="flex w-3/12 items-center border-l px-2">
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div className="flex w-3/12 justify-between items-center gap-3 border-l px-4">
        <Users className="h-5 w-5 text-gray-400" />
        <div className="flex items-center justify-between w-10/12">
          <button
            onClick={decrementPassengers}
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 focus:outline-none w-8 h-8 border rounded-full"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-center text-lg">{passengers}</span>
          <button
            onClick={incrementPassengers}
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 focus:outline-none w-8 h-8 border rounded-full"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
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
