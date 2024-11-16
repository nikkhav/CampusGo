import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import { UserData, PublicProfileData, AccountSettingsData } from "@/types.ts";
import dummy_user from "@/assets/data/dummy-user-data.json";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"public" | "account">("public");
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      const userData = dummy_user as UserData;
      setData(userData);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <Layout>
      <div className="w-10/12 mx-auto my-16">
        <div className="flex justify-center gap-10 border-b-2 border-gray-200 pb-4">
          <button
            className={`text-lg font-medium ${
              activeTab === "public"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("public")}
          >
            Öffentliches Profil
          </button>
          <button
            className={`text-lg font-medium ${
              activeTab === "account"
                ? "text-green-600 border-b-4 border-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Kontoeinstellungen
          </button>
        </div>

        <div className="mt-8">
          {activeTab === "public" ? (
            <PublicProfile data={data.publicProfile} />
          ) : (
            <AccountSettings data={data.accountSettings} />
          )}
        </div>
      </div>
    </Layout>
  );
};

const PublicProfile = ({ data }: { data: PublicProfileData }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Foto</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-sm text-gray-500">{data.status}</p>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-semibold border-b-2 border-green-600 pb-2">
          Dein Profil verifizieren
        </h3>
        <ul className="mt-4 space-y-3 text-gray-700">
          {data.verification.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-green-600">
              <span>+</span> {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold">Meine Fahrzeuge</h3>
        {data.vehicles.map((vehicle, index) => (
          <p key={index} className="mt-3 text-gray-700">
            {vehicle.make} {vehicle.model}, {vehicle.color}
          </p>
        ))}
        <button className="text-green-600 mt-2 hover:underline">
          + Fahrzeug hinzufügen
        </button>
      </div>

      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">Über dich</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.preferences.map((preference, index) => (
            <span
              key={index}
              className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm"
            >
              {preference}
            </span>
          ))}
          <button className="text-green-600 text-sm hover:underline">
            + Präferenz hinzufügen
          </button>
        </div>

        <h3 className="mt-6 text-lg font-semibold">Sprachen</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {data.languages.map((language, index) => (
            <span
              key={index}
              className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm"
            >
              {language}
            </span>
          ))}
          <button className="text-green-600 text-sm hover:underline">
            + Sprache hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = ({ data }: { data: AccountSettingsData }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Foto</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {data.personalDetails.firstName} {data.personalDetails.lastName}
            </h2>
            <p className="text-sm text-gray-500">Status</p>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-semibold">Persönliche Daten</h3>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>
            Vorname:{" "}
            <span className="font-medium">
              {data.personalDetails.firstName}
            </span>
          </li>
          <li>
            Nachname:{" "}
            <span className="font-medium">{data.personalDetails.lastName}</span>
          </li>
          <li>
            Geburtsdatum:{" "}
            <span className="font-medium">
              {data.personalDetails.birthDate}
            </span>
          </li>
          <li>
            E-Mail-Adresse:{" "}
            <span className="font-medium">{data.personalDetails.email}</span>
          </li>
          <li>
            Telefonnummer:{" "}
            <span className="font-medium">{data.personalDetails.phone}</span>
          </li>
        </ul>
        <button className="text-green-600 mt-4 hover:underline">
          Persönliche Daten bearbeiten
        </button>
      </div>

      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">Konto</h3>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>Kennwort</li>
            <li>Postanschrift</li>
          </ul>
        </div>
        <div className="flex justify-end gap-4 mt-10">
          <button className="text-green-600 hover:underline">Ausloggen</button>
          <button className="text-red-600 hover:underline">
            Konto schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
