import { Link } from "react-router-dom";
import Layout from "@/layout/Layout.tsx";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col my-40 text-center w-10/12 mx-auto">
        <h1 className="text-6xl font-bold text-green-600 mt-10">404</h1>
        <h2 className="text-4xl font-semibold text-gray-900 mt-5">
          Seite nicht gefunden
        </h2>
        <p className="text-xl text-gray-700 font-light mt-5">
          Die von Ihnen gesuchte Seite existiert nicht. Bitte überprüfen Sie die
          URL oder kehren Sie zur Startseite zurück.
        </p>
        <Link to="/" className="mt-8">
          <button className="py-3 px-6 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
            Zurück zur Startseite
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
