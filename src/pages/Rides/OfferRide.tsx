import { useEffect, useState } from "react";
import Layout from "@/layout/Layout.tsx";
import { DatePicker } from "@/components/DatePicker.tsx";
import { Vehicle, Location } from "@/types.ts";
import { supabase } from "@/supabaseClient.ts";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";
import Select from "@/components/Select.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input.tsx";

export interface NewStop {
  ride_id: string | null;
  location_id: string;
  stop_type: "start" | "end" | "intermediate";
  stop_time: string | null;
  stop_order: number;
}

const OfferRide = () => {
  const {
    session,
    loading: sessionLoading,
    error: sessionError,
  } = useSupabaseSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [stops, setStops] = useState<NewStop[]>([
    {
      ride_id: null,
      location_id: "",
      stop_type: "start",
      stop_time: null,
      stop_order: 1,
    },
    {
      ride_id: null,
      location_id: "",
      stop_type: "end",
      stop_time: null,
      stop_order: 2,
    },
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [availableSeats, setAvailableSeats] = useState(1);

  const navigate = useNavigate();

  const getVehicles = async () => {
    if (!session?.user?.id) return;

    try {
      const { data: vehiclesData, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) throw error;
      setVehicles(vehiclesData || []);
    } catch (error) {
      console.error("Error fetching user vehicles:", error);
    }
  };

  const getLocations = async () => {
    try {
      const { data: locationsData, error } = await supabase
        .from("locations")
        .select("*");

      if (error) throw error;
      setLocations(locationsData || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const addStop = () => {
    setStops((prevStops) => [
      ...prevStops.slice(0, prevStops.length - 1),
      {
        ride_id: null,
        location_id: "",
        stop_type: "intermediate",
        stop_time: "",
        stop_order: prevStops.length,
      },
      {
        ...prevStops[prevStops.length - 1],
        stop_order: prevStops.length + 1,
      },
    ]);
  };

  const updateStopLocation = (index: number, locationId: string) => {
    setStops((prevStops) =>
      prevStops.map((stop, i) =>
        i === index ? { ...stop, location_id: locationId } : stop,
      ),
    );
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const createOffer = async () => {
    try {
      if (!date || !startTime || !endTime || !selectedVehicle) {
        console.error("Required fields are missing");
        toast.error("Bitte füllen Sie alle erforderlichen Felder aus.");
        return;
      }

      const startDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(startTime.split(":")[0], 10),
        parseInt(startTime.split(":")[1], 10),
      );

      const endDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(endTime.split(":")[0], 10),
        parseInt(endTime.split(":")[1], 10),
      );

      if (endDateTime <= startDateTime) {
        toast.error("Endzeit muss nach der Startzeit liegen.");
        return;
      }

      for (const stop of stops) {
        if (stop.stop_type === "intermediate" && stop.stop_time) {
          const [hours, minutes] = stop.stop_time.split(":").map(Number);
          const stopDateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes,
          );

          if (stopDateTime < startDateTime || stopDateTime > endDateTime) {
            toast.error(
              `Die Zwischenstoppzeit (${stop.stop_time}) muss zwischen der Startzeit und der Endzeit liegen.`,
            );
            return;
          }
        }
      }

      const startTimestamp = startDateTime.toISOString();
      const endTimestamp = endDateTime.toISOString();

      const { data: rideData, error: rideError } = await supabase
        .from("rides")
        .insert([
          {
            driver_id: session?.user?.id,
            vehicle_id: selectedVehicle.id,
            start_time: startTimestamp,
            end_time: endTimestamp,
            available_seats: availableSeats,
          },
        ])
        .select()
        .single();

      if (rideError) throw rideError;

      const rideId = rideData.id;

      const stopsWithRideId = stops.map((stop) => {
        if (stop.stop_type === "intermediate" && stop.stop_time) {
          const [hours, minutes] = stop.stop_time.split(":").map(Number);
          const stopTimestamp = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hours,
            minutes,
          ).toISOString();

          return {
            ...stop,
            ride_id: rideId,
            stop_time: stopTimestamp,
          };
        }

        return { ...stop, ride_id: rideId };
      });

      const { error: stopsError } = await supabase
        .from("stops")
        .insert(stopsWithRideId);

      if (stopsError) throw stopsError;

      toast.success("Angebot erfolgreich erstellt!");
      setTimeout(() => {
        navigate("/find-ride");
      }, 5000);
    } catch (error) {
      console.error("Error creating offer:", error);
      toast.error("Fehler beim Erstellen des Angebots.");
    }
  };

  useEffect(() => {
    if (!sessionLoading && session) {
      getVehicles();
    }
    getLocations();
  }, [session, sessionLoading]);

  if (sessionLoading) {
    return <div>Loading...</div>;
  }
  if (sessionError) {
    return <div>Error: {sessionError}</div>;
  }

  return (
    <Layout>
      <div className="w-10/12 mx-auto">
        <h2 className="text-5xl text-center mt-16">Dein Angebot erstellen</h2>
        <p className="text-xl text-center font-light mt-4 text-gray-600">
          Fülle die folgenden Schritte aus, um eine Mitfahrgelegenheit
          anzubieten. Es dauert nur wenige Minuten!
        </p>
        <div className="mt-10 border rounded-xl shadow-lg bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                  currentStep >= 1 ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                1
              </div>
              <p className="mt-2 font-medium text-gray-800">Details</p>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep >= 2 ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                  currentStep >= 2 ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                2
              </div>
              <p className="mt-2 font-medium text-gray-800">Zeit & Plätze</p>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep === 3 ? "bg-green-600" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                  currentStep === 3 ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                3
              </div>
              <p className="mt-2 font-medium text-gray-800">Überprüfen</p>
            </div>
          </div>

          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Details der Fahrt</h3>
              {stops.map((stop, index) => (
                <div className="mt-5" key={index}>
                  <label className="block text-gray-700">
                    {stop.stop_type === "start"
                      ? "Startort"
                      : stop.stop_type === "end"
                      ? "Zielort"
                      : `Zwischenstopp ${index}`}
                  </label>
                  <Select
                    className="mt-2 p-3 border rounded-md"
                    value={
                      locations.find(
                        (location) => location.id === stop.location_id,
                      )?.name || ""
                    }
                    options={locations.map((location) => location.name)}
                    onChange={(value) => {
                      const selectedLocation = locations.find(
                        (location) => location.name === value,
                      );
                      if (selectedLocation) {
                        updateStopLocation(index, selectedLocation.id);
                      }
                    }}
                    placeholder="Wähle den Ort"
                  />
                  {stop.stop_type === "intermediate" && (
                    <div className="mt-3">
                      <label className="block text-gray-700">
                        Stopzeit (z.B. 15:30)
                      </label>
                      <Input
                        type="time"
                        className="mt-2 p-3 border rounded-md w-full"
                        value={stop.stop_time || ""}
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          setStops((prevStops) =>
                            prevStops.map((s, i) =>
                              i === index ? { ...s, stop_time: value } : s,
                            ),
                          );
                        }}
                        placeholder="Stopzeit eingeben"
                      />
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addStop}
                className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Zwischenstopp hinzufügen
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Zeit</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700">Datum</label>
                  <DatePicker
                    date={date}
                    setDate={setDate}
                    fullWidth
                    className="border mt-2 text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Startzeit</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Endzeit</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold my-4">Plätze</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700">Fahrzeug</label>
                  <Select
                    className="mt-2 p-3 border rounded-md"
                    value={selectedVehicle?.license_plate || ""}
                    options={vehicles.map(
                      (vehicle) =>
                        `${vehicle.brand} - ${vehicle.license_plate}`,
                    )}
                    onChange={(value) => {
                      const vehicle = vehicles.find(
                        (v) => `${v.brand} - ${v.license_plate}` === value,
                      );
                      setSelectedVehicle(vehicle || null);
                      setAvailableSeats(1);
                    }}
                    placeholder="Wähle dein Fahrzeug"
                  />
                </div>
                <div>
                  <label
                    className={`block text-gray-700 ${
                      selectedVehicle ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    Anzahl der verfügbaren Plätze
                  </label>
                  <Select
                    className={`mt-2 p-3 border rounded-md ${
                      selectedVehicle ? "opacity-100" : "opacity-50"
                    }`}
                    value={availableSeats.toString()}
                    options={
                      selectedVehicle
                        ? Array.from(
                            { length: selectedVehicle.seats },
                            (_, i) => (i + 1).toString(),
                          )
                        : []
                    }
                    onChange={(value) => setAvailableSeats(parseInt(value))}
                    placeholder="Wähle die Anzahl der Plätze"
                    disabled={!selectedVehicle}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-3xl font-bold mb-6 text-center">
                Überprüfen
              </h3>
              <p className="text-lg text-gray-600 text-center">
                Bitte überprüfe die eingegebenen Informationen:
              </p>
              <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stops
                    .filter(
                      (stop) =>
                        stop.stop_type === "start" || stop.stop_type === "end",
                    )
                    .map((stop, index) => (
                      <div key={index}>
                        <p className="text-sm text-gray-500">
                          {stop.stop_type === "start" ? "Startort" : "Zielort"}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {locations.find(
                            (location) => location.id === stop.location_id,
                          )?.name || "Nicht angegeben"}
                        </p>
                      </div>
                    ))}
                </div>

                {stops.filter((stop) => stop.stop_type === "intermediate")
                  .length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">Zwischenstopps</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {stops
                        .filter((stop) => stop.stop_type === "intermediate")
                        .map((stop, index) => {
                          const locationName =
                            locations.find(
                              (location) => location.id === stop.location_id,
                            )?.name || "Nicht angegeben";
                          const stopTime = stop.stop_time
                            ? ` (${new Date(stop.stop_time).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                              )})`
                            : "";
                          return `${index + 1}. ${locationName}${stopTime}`;
                        })
                        .join(", ")}
                    </p>
                  </div>
                )}
                <div className="border-t border-gray-300 my-6"></div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500">Datum</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {date ? date.toLocaleDateString() : "Nicht angegeben"}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Uhrzeit</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {startTime || "Nicht angegeben"} -{" "}
                    {endTime || "Nicht angegeben"}
                  </p>
                </div>

                <div className="border-t border-gray-300 my-6"></div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500">Fahrzeug</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedVehicle
                      ? `${selectedVehicle.brand} (${selectedVehicle.license_plate})`
                      : "Nicht angegeben"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Anzahl der verfügbaren Plätze
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {availableSeats || "Nicht angegeben"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            <button
              onClick={prevStep}
              className={`px-6 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 ${
                currentStep > 1 ? "" : "opacity-0"
              }`}
            >
              Zurück
            </button>

            <button
              onClick={currentStep < 3 ? nextStep : createOffer}
              disabled={
                currentStep === 1 &&
                (stops[0].location_id === "" ||
                  stops[stops.length - 1].location_id === "")
              }
              className={`px-6 py-2 text-white rounded-md shadow ${
                currentStep === 1 &&
                (stops[0].location_id === "" ||
                  stops[stops.length - 1].location_id === "")
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {currentStep < 3 ? "Weiter" : "Bestätigen"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OfferRide;
