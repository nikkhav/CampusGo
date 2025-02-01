import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/supabaseClient";
import newpass_bg from "@/assets/images/newpass-bg.webp";
import logo from "@/assets/images/logo.png";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Bitte geben Sie Ihre E-Mail-Adresse ein.");
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/new-password`,
        },
      );

      if (resetError) {
        setError(`Fehler beim Senden der E-Mail: ${resetError.message}`);
        return;
      }

      setSuccess(
        "Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet!",
      );
    } catch (err) {
      console.error(err);
      setError(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      );
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100 lg:px-0 px-5"
      style={{
        backgroundImage: `url(${newpass_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <Link to="/" className="absolute lg:block hidden top-20 left-40 z-10">
        <button className="flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
          <ArrowLeft />
        </button>
      </Link>

      <div className="relative w-full max-w-md p-6 bg-white rounded-3xl shadow-md z-10">
        <img src={logo} alt="CampusGo Logo" className="w-20 mx-auto" />

        <h2 className="text-2xl text-center font-semibold text-gray-900 mt-4">
          Passwort zurücksetzen
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
          )}
          {success && (
            <p className="mt-3 text-sm text-green-600 text-center">{success}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Link zum Zurücksetzen senden
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
