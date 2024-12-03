import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Send,
  Inbox,
  FileText,
  User,
  MapPin,
  MoreHorizontal,
  LogIn,
} from "lucide-react";
import logo from "@/assets/images/logo.png";
import { supabase } from "@/supabaseClient";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tokenData = JSON.parse(
      localStorage.getItem("sb-qheatslvrwrvuwuheyxc-auth-token") || "{}",
    );
    const token = tokenData?.access_token;
    const expiryTime = tokenData?.expires_at;

    if (token && expiryTime > Date.now() / 1000) {
      setIsLoggedIn(true);
      const localUserId = localStorage.getItem("userId");
      setUserId(localUserId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("users")
          .select("image, first_name, last_name")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
        } else if (data) {
          setUserPhoto(data.image);
          setUserFirstName(data.first_name);
          setUserLastName(data.last_name);
        }
      }
    };

    fetchUserData();
  }, [userId]);

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
              to="/contact-us"
              className="text-gray-600 hover:text-gray-900"
            >
              Hilfe & Kontakt
            </Link>
          </div>
          <div ref={dropdownRef} className="relative">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center focus:outline-none"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt="Profilbild"
                      className="w-12 h-12 rounded-full border-2 border-green-600 cursor-pointer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-lg font-bold text-green-700 cursor-pointer">
                      {userFirstName?.charAt(0).toUpperCase()}
                      {userLastName?.charAt(0).toUpperCase()}
                    </div>
                  )}
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
                        <Link
                          to={`/profile/${userId}`}
                          className="text-gray-700"
                        >
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
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogIn className="w-12 h-12 p-2 rounded-full border-2 border-green-600 cursor-pointer text-green-600" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
