import Layout from "@/layout/Layout.tsx";
import Lottie from "lottie-react";
import processing_animation from "@/assets/animations/verifcation-processing.json";
import { Link } from "react-router-dom";

const VerificationProcessing = () => {
  return (
    <Layout>
      <div className="bg-white w-8/12 border-2 border-green-600 rounded-2xl shadow-lg p-8 mx-auto my-20">
        <h1 className="text-center text-2xl font-bold">
          Verifizierungsanfrage gesendet
        </h1>
        <div className="flex justify-center mt-6">
          <Lottie
            animationData={processing_animation}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-700">
            Ihre Verifizierungsanfrage wurde erfolgreich gesendet.
          </p>
          <p className="text-gray-700 mt-4">
            Bitte warten Sie, während wir Ihre Identität prüfen.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default VerificationProcessing;
