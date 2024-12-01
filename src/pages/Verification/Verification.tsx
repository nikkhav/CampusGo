import Layout from "@/layout/Layout.tsx";
import Lottie from "lottie-react";
import verification_animation from "@/assets/animations/verification.json";
import { Link } from "react-router-dom";

const verificationOptions = [
  "Personalasweis (für EU-Bürger)",
  "Aufenthaltstitel (für Nicht-EU-Bürger)",
  "Reisepass",
  "Führerschein",
];

const Verification = () => {
  return (
    <Layout>
      <div className="bg-white w-8/12 border-2 border-green-600 rounded-2xl shadow-lg p-8 mx-auto mt-10">
        <h1 className="text-center text-2xl font-bold">
          Verifiziere Deine Identität
        </h1>
        <div className="flex justify-center">
          <Lottie
            animationData={verification_animation}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div className="text-center">
          <p className="text-gray-700">
            Wähle bitte aus, wie Du Dich verifizieren möchtest
          </p>
          <select className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mt-4 focus:outline-none focus:ring-2 focus:ring-green-600">
            {verificationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center mt-6">
          <input
            type="checkbox"
            id="datenschutz"
            className="w-4 h-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
          />
          <label htmlFor="datenschutz" className="ml-2 text-sm text-gray-600">
            Datenschutzbestimmungen akzeptieren
          </label>
        </div>
        <div className="flex justify-center mt-6">
          <Link
            to="/verification-processing"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Bestätigen
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
