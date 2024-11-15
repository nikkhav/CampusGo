import { Link } from "react-router-dom";
import dummy_avatar from "@/assets/dummy-avatar.png";

export default function Header() {
  return (
      <header className="w-full">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-5">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-semibold text-gray-800">Logo</Link>
            </div>
            <ul className="flex space-x-6">
              <li>
                <Link to="/plane-deine-reise" className="text-gray-600 hover:text-gray-900">Fahrt finden</Link>
              </li>
              <li>
                <Link to="/fahrt-verfolgen" className="text-gray-600 hover:text-gray-900">Fahrt verfolgen</Link>
              </li>
              <li>
                <Link to="/hilfe-kontakt" className="text-gray-600 hover:text-gray-900">Hilfe & Kontakt</Link>
              </li>
            </ul>
            <div className="flex">
              <Link to={"/"}>
                Fahrt hinzufügen
              </Link>
            <div className="flex flex-col items-center">

              <img src={dummy_avatar} alt="team member"
                   className="w-20 h-20 rounded-full border-2 border-green-600"/>
            </div>
            </div>
          </nav>
        </div>
      </header>
  )
}
