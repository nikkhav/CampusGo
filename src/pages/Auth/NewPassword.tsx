import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import newpass_bg from "@/assets/images/newpass-bg.webp";
import logo from "@/assets/images/logo.png";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.old_password || !formData.new_password) {
      setError(
        "Bitte geben Sie Ihre E-Mail-Adresse, Ihr altes und neues Passwort ein.",
      );
      return;
    }

    console.log("Pass change data submitted:", formData);
    alert("Erfolgreiche Passwortänderung!"); // Temporary success message
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${newpass_bg})`,
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
          Passwort ändern
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label htmlFor="email" className="sr-only">
              E-Mail Adresse
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-Mail Adresse"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="old_password" className="sr-only">
              Altes Passwort
            </label>
            <input
              type="password"
              id="old_password"
              placeholder="Altes Passwort"
              value={formData.old_password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="new_password" className="sr-only">
              Neues Passwort
            </label>
            <input
              type="password"
              id="new_password"
              placeholder="Neues Passwort"
              value={formData.new_password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Änderung bestätigen
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
