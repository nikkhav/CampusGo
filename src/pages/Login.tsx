import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import login_bg from "@/assets/login-bg.webp";

const Login = () => {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${login_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <Link to="/">
        <div className="absolute top-20 left-40 z-10">
          <button className="flex items-center p-2 rounded-full hover:bg-gray-200 focus:outline-none">
            <ArrowLeft />
          </button>
        </div>
      </Link>

      <div className="relative w-full max-w-sm p-6 bg-white bg-opacity-90 rounded-3xl shadow-md z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">CampusGo</h2>
        </div>

        <h1 className="text-center text-3xl font-semibold text-gray-900 mb-4">
          Einloggen oder registrieren
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="sr-only">
            E-mail Adresse
          </label>
          <input
            type="email"
            id="email"
            placeholder="E-mail Adresse"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-4 text-left">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            Login-Daten vergessen
          </Link>
        </div>

        <button className="w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
          Anmelden
        </button>

        <div className="text-center mt-5">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Jetzt registrieren
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
