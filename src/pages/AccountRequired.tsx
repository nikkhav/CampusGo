import { Link } from "react-router-dom";
import Layout from "@/layout/Layout.tsx";

const AccountRequired = () => {
  return (
    <Layout>
      <div className="flex flex-col my-40 text-center w-10/12 mx-auto">
        <h1 className="text-6xl font-bold text-green-600 mt-10">
          Anmeldung erforderlich
        </h1>
        <h2 className="text-4xl font-semibold text-gray-900 mt-5">
          Sie müssen angemeldet sein
        </h2>
        <p className="text-xl text-gray-700 font-light mt-5">
          Bitte melden Sie sich an, um eine Mitfahrgelegenheit anzubieten. Wenn
          Sie noch kein Konto haben, können Sie sich registrieren.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="py-3 px-6 text-white bg-green-600 rounded-2xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Zur Anmeldung
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AccountRequired;
