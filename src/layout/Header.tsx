import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { Send, Inbox, User, LogIn, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { supabase } from "@/supabaseClient.ts";

export default function Header() {
  const { session, loading, error } = useSupabaseSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from("users")
          .select("image, first_name, last_name")
          .eq("id", session.user.id)
          .single();

        if (!error && data) {
          setUserPhoto(data.image);
          setUserFirstName(data.first_name);
          setUserLastName(data.last_name);
        }
      }
    };

    if (session) fetchUserData();
  }, [session]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <header className="w-full relative bg-white shadow">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="sm:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-8 h-8" />
            </button>
            <Link to="/" className="ml-4 sm:ml-0">
              <img src={logo} alt="CampusGo Logo" className="w-16 sm:w-20" />
            </Link>
          </div>

          <div className="hidden sm:flex space-x-6">
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
              to="/contact-us"
              className="text-gray-600 hover:text-gray-900"
            >
              Hilfe & Kontakt
            </Link>
          </div>

          <div ref={dropdownRef} className="relative">
            {session ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center focus:outline-none"
                >
                  {userPhoto ? (
                    <img
                      src={userPhoto}
                      alt="Profilbild"
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-green-600 object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-green-600 bg-gray-200 flex items-center justify-center text-lg font-bold text-green-700 cursor-pointer">
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
                        <Link to="/your-rides" className="text-gray-700">
                          Deine Fahrten
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                        <Send className="w-5 h-5 text-gray-700" />
                        <Link to="/chats" className="text-gray-700">
                          Chats
                        </Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-700" />
                        <Link
                          to={`/profile/${session.user.id}`}
                          className="text-gray-700"
                        >
                          Profil
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
                <LogIn className="w-10 sm:w-12 h-10 sm:h-12 p-2 rounded-full border-2 border-green-600 cursor-pointer text-green-600" />
              </Link>
            )}
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          ref={menuRef}
          className={`bg-white w-64 h-full shadow-md p-6 flex flex-col transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end mb-6"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2 mb-4">
            <Link className={"text-2xl font-semibold text-green-600"} to="/">
              CampusGo
            </Link>
          </div>
          <Link
            to="/find-ride"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Fahrt finden
          </Link>
          <Link
            to="/offer-ride"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Fahrt veröffentlichen
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-600 hover:text-gray-900 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Hilfe & Kontakt
          </Link>
        </div>
      </div>
    </header>
  );
}
