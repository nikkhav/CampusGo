import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "@/supabaseClient";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Die Passwörter stimmen nicht überein.");
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: window.location.origin + "/email-confirmed",
        },
      });

      if (authError) {
        toast.error(authError.message);
        setLoading(false);
        return;
      }

      const { error: dbError } = await supabase.from("users").insert([
        {
          id: authData?.user?.id,
          first_name: formData.vorname,
          last_name: formData.nachname,
          email: formData.email,
        },
      ]);

      if (dbError) {
        toast.error(dbError.message);
        setLoading(false);
        return;
      }

      toast.success("Erfolgreich registriert!");
      navigate("/login");
    } catch {
      toast.error("Etwas ist schief gelaufen. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
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
            <input
              type="password"
              id="confirmPassword"
              placeholder="Passwort bestätigen"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className={`mt-6 w-full py-3 text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50`}
            disabled={loading}
          >
            {loading ? "Registrieren..." : "Registrieren"}
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
