import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import dummy_avatar from "@/assets/avatars/Eduard.webp";
import logo from "@/assets/images/logo.png";
import {
  Send,
  Inbox,
  FileText,
  User,
  MapPin,
  MoreHorizontal,
} from "lucide-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="w-full relative">
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
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={dummy_avatar}
                alt="Profilbild"
                className="w-12 h-12 rounded-full border-2 border-green-600 cursor-pointer"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    <Inbox className="w-5 h-5 text-gray-700" />
                    <Link to="/deine-fahrten" className="text-gray-700">
                      Deine Fahrten
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    <Send className="w-5 h-5 text-gray-700" />
                    <Link to="/posteingang" className="text-gray-700">
                      Posteingang
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-700" />
                    <Link to="/zahlungen" className="text-gray-700">
                      Zahlungen
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-700" />
                    <Link to="/profil" className="text-gray-700">
                      Profil
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-700" />
                    <Link to="/fahrt-verfolgen" className="text-gray-700">
                      Fahrt verfolgen
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                    <MoreHorizontal className="w-5 h-5 text-gray-700" />
                    <Link to="/bla-bla" className="text-gray-700">
                      BlaBla
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
