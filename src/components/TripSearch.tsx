import { useState, useEffect } from "react";
import { MapPin, Users, Minus, Plus } from "lucide-react";
import { DatePicker } from "@/components/DatePicker";
import Select from "@/components/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/supabaseClient";

export default function TripSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState(1);
  const [locations, setLocations] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const incrementPassengers = () => setPassengers((prev) => prev + 1);
  const decrementPassengers = () =>
    setPassengers((prev) => Math.max(prev - 1, 1));

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select("name")
        .order("name", { ascending: true });

      if (error) throw error;

      setLocations(data.map((location: { name: string }) => location.name));
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  useEffect(() => {
    fetchLocations();

    const queryFrom = searchParams.get("from");
    const queryTo = searchParams.get("to");
    const queryDate = searchParams.get("date");
    const queryPassengers = searchParams.get("passengers");

    if (queryFrom) setFrom(queryFrom);
    if (queryTo) setTo(queryTo);
    if (queryDate) {
      const parsedDate = new Date(queryDate);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      }
    }
    if (queryPassengers) setPassengers(parseInt(queryPassengers, 10));
  }, [searchParams]);

  const formatToISODate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    const query = new URLSearchParams({
      ...(from && { from }),
      ...(to && { to }),
      ...(date && { date: formatToISODate(date) }),
      passengers: passengers.toString(),
    }).toString();

    navigate(`/find-ride?${query}`);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-4xl items-center gap-4 sm:gap-2 rounded-xl sm:rounded-full border bg-white p-4 sm:p-2 shadow-md mx-auto my-6">
      <div className="flex w-full sm:w-3/12 items-center gap-2 lg:px-2">
        <MapPin className="h-5 w-5 text-gray-400" />
        <Select
          options={locations}
          value={from}
          onChange={setFrom}
          placeholder="Von"
          className="w-full"
        />
      </div>

      <div className="flex w-full sm:w-3/12 items-center gap-2 border-t sm:border-t-0 sm:border-l lg:px-2 pt-4 sm:pt-0">
        <MapPin className="h-5 w-5 text-gray-400" />
        <Select
          options={locations}
          value={to}
          onChange={setTo}
          placeholder="Nach"
          className="w-full"
        />
      </div>

      <div className="flex w-full sm:w-3/12 items-center border-t sm:border-t-0 sm:border-l px-2 pt-4 sm:pt-0">
        <DatePicker date={date} setDate={setDate} />
      </div>

      <div className="flex w-full sm:w-3/12 justify-between items-center gap-3 border-t sm:border-t-0 sm:border-l px-2 sm:px-4 pt-2 sm:pt-0">
        <Users className="h-5 w-5 text-gray-400" />
        <div className="flex items-center justify-between w-full sm:w-10/12">
          <button
            onClick={decrementPassengers}
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 focus:outline-none w-10 h-10 sm:w-8 sm:h-8 border rounded-full"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-center text-lg">{passengers}</span>
          <button
            onClick={incrementPassengers}
            className="flex items-center justify-center text-gray-600 hover:text-gray-800 focus:outline-none w-10 h-10 sm:w-8 sm:h-8 border rounded-full"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto rounded-full bg-emerald-600 px-6 py-3 sm:py-2 text-white hover:bg-emerald-700 mt-2 sm:mt-0"
      >
        Suchen
      </button>
    </div>
  );
}
