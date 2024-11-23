import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import register_bg from "@/assets/images/register-bg.webp";
import logo from "@/assets/images/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    console.log("Form data submitted:", formData);
    navigate("/profile/1");
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${register_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <Link to="/" className="absolute top-20 left-40 z-10">
        <button className="flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
          <ArrowLeft />
        </button>
      </Link>

      <div className="relative w-full max-w-md p-6 bg-white rounded-3xl shadow-md z-10">
        <img src={logo} alt="CampusGo Logo" className="w-20 mx-auto" />

        <h2 className="text-2xl text-center font-semibold text-gray-900 mt-4">
          Registrieren
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label htmlFor="vorname" className="sr-only">
              Vorname
            </label>
            <input
              type="text"
              id="vorname"
              placeholder="Vorname"
              value={formData.vorname}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="nachname" className="sr-only">
              Nachname
            </label>
            <input
              type="text"
              id="nachname"
              placeholder="Nachname"
              value={formData.nachname}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="sr-only">
              E-mail Adresse
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-mail Adresse"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="password" className="sr-only">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              placeholder="Passwort"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="confirmPassword" className="sr-only">
              Passwort bestätigen
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Passwort bestätigen"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Registrieren
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Bereits registriert?{" "}
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Jetzt einloggen
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
