import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import Modal from "@/components/Modal";
import { User } from "@/types.ts";
import { supabase } from "@/supabaseClient.ts";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"public" | "account">("public");
  const [user, setUser] = useState<User>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    birth_date: null,
    image: null,
    is_id_verified: false,
    is_license_verified: false,
    phone: null,
    languages: [],
    created_at: "",
    updated_at: "",
  });
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        const userId = session.session?.user?.id;

        if (userId) {
          const { data: userData, error } = await supabase
            .from("users")
            .select(
              `
              *,
              vehicles (
                id,
                brand,
                model,
                color,
                license_plate,
                seats,
                created_at,
                updated_at
              )
            `,
            )
            .eq("id", userId)
            .single();

          if (error) throw error;
          console.log("User data with reviews:", userData);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data with reviews:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    setLogoutModalOpen(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    setDeleteModalOpen(false);
  };

  if (!user) {
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
            <PublicProfile user={user} />
          ) : (
            <AccountSettings
              user={user}
              onLogout={() => setLogoutModalOpen(true)}
              onDeleteAccount={() => setDeleteModalOpen(true)}
            />
          )}
        </div>

        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          title="Logout Confirmation"
          footer={
            <div className="flex justify-between w-5/12 mx-auto">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Logout
              </button>
            </div>
          }
        >
          <p className="text-gray-700 text-center">
            Are you sure you want to log out?
            <br />
            This action will end your session.
          </p>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Account Confirmation"
          footer={
            <div className="flex justify-between w-5/12 mx-auto">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          }
        >
          <p className="text-gray-700 text-center">
            Are you sure you want to delete your account?
            <br />
            This action is irreversible.
          </p>
        </Modal>
      </div>
    </Layout>
  );
};

const PublicProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Foto</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            {/*<p className="text-sm text-gray-500">{data.status}</p>*/}
          </div>
        </div>
        <h3 className="mt-6 text-lg font-semibold border-b-2 border-green-600 pb-2">
          Dein Profil verifizieren
        </h3>
        <ul className="mt-4 space-y-3 text-gray-700">
          {user.is_id_verified ? (
            <li className="flex items-center gap-2 text-green-600">
              <span>✔</span> ID verifiziert
            </li>
          ) : (
            <li className="flex items-center gap-2 text-red-600">
              <span>✘</span> ID nicht verifiziert
            </li>
          )}
          {user.is_license_verified ? (
            <li className="flex items-center gap-2 text-green-600">
              <span>✔</span> Führerschein verifiziert
            </li>
          ) : (
            <li className="flex items-center gap-2 text-red-600">
              <span>✘</span> Führerschein nicht verifiziert
            </li>
          )}
        </ul>
        <h3 className="mt-6 text-lg font-semibold">Meine Fahrzeuge</h3>
        {user.vehicles &&
          user.vehicles.map((vehicle, index) => (
            <p key={index} className="mt-3 text-gray-700">
              {vehicle.brand} {vehicle.model}, {vehicle.color}
            </p>
          ))}
        <button className="text-green-600 mt-2 hover:underline">
          + Fahrzeug hinzufügen
        </button>
      </div>

      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">Über dich</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          // TODO: Replace with reviews? Or add preferences to user
          {/*{user.preferences.map((preference, index) => (*/}
          {/*  <span*/}
          {/*    key={index}*/}
          {/*    className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm"*/}
          {/*  >*/}
          {/*    {preference}*/}
          {/*  </span>*/}
          {/*))}*/}
          <button className="text-green-600 text-sm hover:underline">
            + Präferenz hinzufügen
          </button>
        </div>

        <h3 className="mt-6 text-lg font-semibold">Sprachen</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.languages.map((language, index) => (
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

const AccountSettings = ({
  user,
  onLogout,
  onDeleteAccount,
}: {
  user: User;
  onLogout: () => void;
  onDeleteAccount: () => void;
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Foto</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-gray-500">Status</p>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-semibold">Persönliche Daten</h3>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>
            Vorname: <span className="font-medium">{user.first_name}</span>
          </li>
          <li>
            Nachname: <span className="font-medium">{user.last_name}</span>
          </li>
          <li>
            Geburtsdatum:{" "}
            <span className="font-medium">
              {user.birth_date ? user.birth_date : "N/A"}
            </span>
          </li>
          <li>
            E-Mail-Adresse: <span className="font-medium">{user.email}</span>
          </li>
          <li>
            Telefonnummer:{" "}
            <span className="font-medium">
              {user.phone ? user.phone : "N/A"}
            </span>
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
          </ul>
        </div>
        <div className="flex justify-end gap-4 mt-10">
          <button onClick={onLogout} className="text-green-600 hover:underline">
            Ausloggen
          </button>
          <button
            onClick={onDeleteAccount}
            className="text-red-600 hover:underline"
          >
            Konto schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
