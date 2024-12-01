import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "@/supabaseClient";
import { ArrowLeft } from "lucide-react";
import login_bg from "@/assets/images/login-bg.webp";
import logo from "@/assets/images/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(myubt\.de|uni-bayreuth\.de)$/;

    if (!formData.email || !formData.password) {
      toast.error("Bitte geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error(
        "Bitte geben Sie eine gültige E-Mail-Adresse ein, die auf @myubt.de oder @uni-bayreuth.de endet.",
      );
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      const userId = data.user?.id;
      if (userId) {
        toast.success("Erfolgreich eingeloggt!");
        localStorage.setItem("userId", userId);
        navigate(`/profile/${userId}`);
      } else {
        toast.error("Benutzer-ID konnte nicht abgerufen werden.");
      }
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
        backgroundImage: `url(${login_bg})`,
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
          Einloggen
        </h2>

        <form onSubmit={handleSubmit}>
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
            <div className="text-right mt-2">
              <Link
                to="/new-password"
                className="text-sm font-medium text-green-600 hover:text-green-700"
              >
                Passwort vergessen?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className={`mt-4 w-full py-3 text-white ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50`}
            disabled={loading}
          >
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">oder</p>

        <div className="text-center mt-4">
          <Link
            to="/register"
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
