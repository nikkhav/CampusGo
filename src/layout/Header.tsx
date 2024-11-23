import { Link } from "react-router-dom";
import dummy_avatar from "@/assets/avatars/Eduard.webp";
import logo from "@/assets/images/logo.png";

export default function Header() {
  return (
    <header className="w-full">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-5">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-semibold text-green-700">
              <img src={logo} alt="CampusGo Logo" className="w-20" />
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/find-ride" className="text-gray-600 hover:text-gray-900">
              Fahrt finden
            </Link>
            <Link
              to="/offer-ride"
              className="text-gray-600 hover:text-gray-900"
            >
              Fahrt veröffentlichen
            </Link>
            <Link
              to="/fahrt-verfolgen"
              className="text-gray-600 hover:text-gray-900"
            >
              Fahrt verfolgen
            </Link>
            <Link
              to="/hilfe-kontakt"
              className="text-gray-600 hover:text-gray-900"
            >
              Hilfe & Kontakt
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link to="/login">
              <img
                src={dummy_avatar}
                alt="Profilbild"
                className="w-16 h-16 rounded-full border-2 border-green-600"
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
