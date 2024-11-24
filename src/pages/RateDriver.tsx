import { useState } from "react";
import Layout from "@/layout/Layout.tsx";
import { Link } from "react-router-dom";
import { Car, User, Clock, MapPin } from "lucide-react";
import constants from "@/assets/data/constants.ts";
import success_animation from "@/assets/animations/success.json";
import Lottie from "lottie-react";

const RateDriver = () => {
  const [step, setStep] = useState(1);
  const [likedRide, setLikedRide] = useState<boolean | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const rideDetails = {
    from: "Bayreuth",
    to: "Kulmbach",
    driverName: "Nikita K.",
    driverCar: "Tesla Model 3",
    duration: "45 Minuten",
  };

  const handleFeedbackSelection = (feedback: string) => {
    setSelectedFeedback((prev) =>
      prev.includes(feedback)
        ? prev.filter((item) => item !== feedback)
        : [...prev, feedback],
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mt-8">Wie war deine Fahrt?</h2>
            <div className="flex space-x-10 mt-10">
              <button
                onClick={() => {
                  setStep(2);
                  setLikedRide(false);
                }}
                className="text-6xl hover:scale-110 transition"
              >
                😔
              </button>
              <button
                onClick={() => {
                  setStep(2);
                  setLikedRide(true);
                }}
                className="text-6xl hover:scale-110 transition"
              >
                😄
              </button>
            </div>
            <Link
              to={"/"}
              className="mt-10 text-green-700 border border-green-700 px-4 py-2 rounded-full hover:bg-green-700 hover:text-white transition"
            >
              Überspringen
            </Link>
          </div>
        );
      case 2: {
        const feedbackOptions = likedRide
          ? constants.positiveFeedbackDriver
          : constants.negativeFeedbackDriver;
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mt-10">
              {likedRide
                ? "Was hat dir an der Fahrt am meisten gefallen?"
                : "Was hat dir an der Fahrt nicht gefallen?"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {feedbackOptions.map((feedback, index) => (
                <button
                  key={index}
                  onClick={() => handleFeedbackSelection(feedback)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedFeedback.includes(feedback)
                      ? "bg-green-700 text-white"
                      : "text-green-700 border-green-700"
                  } transition`}
                >
                  {feedback}
                </button>
              ))}
            </div>
            <textarea
              className="w-8/12 border border-gray-300 rounded-lg p-3 mt-10 focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="Kommentar hinterlassen"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={() => setStep(3)}
              className="text-xl bg-green-700 text-white px-6 py-2 rounded-full mt-10 hover:bg-green-800 transition"
            >
              Senden
            </button>
          </div>
        );
      }
      case 3:
        return (
          <div className="flex flex-col items-center mt-10">
            <Lottie
              animationData={success_animation}
              style={{ width: 150, height: 150 }}
              loop={false}
            />
            <h2 className="text-3xl font-bold mt-6">
              Danke für dein Feedback!
            </h2>

            <Link
              to={"/"}
              className="text-green-700 border border-green-700 px-4 py-2 rounded-full mt-10 hover:bg-green-700 hover:text-white transition"
            >
              Zurück zur Startseite
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="w-10/12 mx-auto my-14 p-10">
        <h1
          className={`text-4xl font-bold text-center ${
            step === 3 ? "text-green-700" : "text-gray-800"
          }`}
        >
          Danke für deine Fahrt!
        </h1>
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold">Fahrtdetails</h3>
          <div className="flex flex-wrap gap-6 mt-5">
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-700" />
              <p className="text-gray-700">
                <strong>Von:</strong> {rideDetails.from}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-700" />
              <p className="text-gray-700">
                <strong>Nach:</strong> {rideDetails.to}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-green-700" />
              <p className="text-gray-700">
                <strong>Fahrer:</strong> {rideDetails.driverName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-6 h-6 text-green-700" />
              <p className="text-gray-700">
                <strong>Auto:</strong> {rideDetails.driverCar}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-700" />
              <p className="text-gray-700">
                <strong>Dauer:</strong> {rideDetails.duration}
              </p>
            </div>
          </div>
        </div>
        {renderStep()}
      </div>
    </Layout>
  );
};

export default RateDriver;
