import { useState } from "react";
import Layout from "@/layout/Layout.tsx";
import { DatePicker } from "@/components/DatePicker";

const OfferRide = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const createOffer = () => {
    console.log({ from, to, date: date?.toISOString(), time, seats });
  };

  return (
    <Layout>
      <div className="w-10/12 mx-auto">
        <h2 className="text-5xl text-center mt-16">Dein Angebot erstellen</h2>
        <p className="text-xl text-center font-light mt-4 text-gray-600">
          Fülle die folgenden Schritte aus, um eine Mitfahrgelegenheit
          anzubieten. Es dauert nur wenige Minuten!
        </p>
        <div className="mt-10 border rounded-xl shadow-lg bg-white p-8">
          {/* Stepper */}
          {/* Stepper */}
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

          {/* Step Content */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Details der Fahrt</h3>
              <div>
                <label className="block text-gray-700">Startort</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Startort auswählen</option>
                  <option value="Bayreuth">Bayreuth</option>
                  <option value="München">München</option>
                  <option value="Hamburg">Hamburg</option>
                  <option value="Frankfurt">Frankfurt</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Zielort</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Zielort auswählen</option>
                  <option value="Bayreuth">Bayreuth</option>
                  <option value="München">München</option>
                  <option value="Hamburg">Hamburg</option>
                  <option value="Frankfurt">Frankfurt</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Zeit & Plätze</h3>
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
                  <label className="block text-gray-700">Uhrzeit</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Anzahl der Plätze
                  </label>
                  <select
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="w-full mt-2 p-3 border rounded-md focus:ring-2 focus:ring-green-600"
                  >
                    <option value="1">1 Platz</option>
                    <option value="2">2 Plätze</option>
                    <option value="3">3 Plätze</option>
                    <option value="4">4 Plätze</option>
                  </select>
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
                  <div>
                    <p className="text-sm text-gray-500">Startort</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {from || "Nicht angegeben"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Zielort</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {to || "Nicht angegeben"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Datum</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {date ? date.toLocaleDateString() : "Nicht angegeben"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Uhrzeit</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {time || "Nicht angegeben"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Plätze</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {seats}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
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
                (currentStep === 1 && (!from || !to)) ||
                (currentStep === 2 && (!date || !time))
              }
              className={`px-6 py-2 text-white rounded-md shadow ${
                (currentStep === 1 && (!from || !to)) ||
                (currentStep === 2 && (!date || !time))
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
