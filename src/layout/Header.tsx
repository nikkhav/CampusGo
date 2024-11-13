import { Link } from "react-router-dom";

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
                <Link to="/plane-deine-reise" className="text-gray-600 hover:text-gray-900">Plane deine Reise</Link>
              </li>
              <li>
                <Link to="/fahrt-verfolgen" className="text-gray-600 hover:text-gray-900">Fahrt verfolgen</Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-600 hover:text-gray-900">Service</Link>
              </li>
              <li>
                <Link to="/hilfe-kontakt" className="text-gray-600 hover:text-gray-900">Hilfe & Kontakt</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  )
}
