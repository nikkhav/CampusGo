import Layout from "@/layout/Layout.tsx";
import Lottie from "lottie-react";
import success_animation from "@/assets/animations/success.json";
import { Link } from "react-router-dom";

const EmailConfirmed = () => {
  return (
    <Layout>
      <div className="bg-white w-8/12 border-2 border-green-600 rounded-2xl shadow-lg p-8 mx-auto my-20">
        <h1 className="text-center text-2xl font-bold">E-Mail bestätigt</h1>
        <div className="flex justify-center mt-6">
          <Lottie
            animationData={success_animation}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-700">
            Ihre E-Mail-Adresse wurde erfolgreich bestätigt.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Jetzt einloggen
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EmailConfirmed;
