import { useState, useEffect } from "react";
import Layout from "@/layout/Layout.tsx";
import Modal from "@/components/Modal";
import { User, Vehicle } from "@/types.ts";
import { supabase } from "@/supabaseClient.ts";
import Select from "@/components/Select.tsx";
import constants from "@/assets/data/constants.ts";
import Input from "@/components/Input.tsx";
import { Link } from "react-router-dom";

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
    preferences: [],
    vehicles: [],
    created_at: "",
    updated_at: "",
  });
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
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
            <PublicProfile user={user} refetchUserData={fetchData} />
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

const PublicProfile = ({
  user,
  refetchUserData,
}: {
  user: User;
  refetchUserData: () => void;
}) => {
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] =
    useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] =
    useState<boolean>(false);

  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    id: "",
    user_id: "",
    brand: "",
    model: "",
    color: "",
    license_plate: "",
    seats: 5,
    created_at: "",
    updated_at: "",
  });

  const [newPreference, setNewPreference] = useState<string>("");
  const [newLanguage, setNewLanguage] = useState<string>("");

  const saveVehicle = async () => {
    try {
      const { error } = await supabase.from("vehicles").insert([
        {
          user_id: user.id,
          brand: newVehicle.brand,
          model: newVehicle.model,
          color: newVehicle.color,
          license_plate: newVehicle.license_plate,
          seats: newVehicle.seats,
        },
      ]);
      if (error) throw error;
      await refetchUserData();
      setIsVehicleModalOpen(false);
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  const savePreference = async () => {
    try {
      if (!newPreference || user.preferences.includes(newPreference)) return;
      const { error } = await supabase
        .from("users")
        .update({
          preferences: [...user.preferences, newPreference],
        })
        .eq("id", user.id);
      if (error) throw error;
      await refetchUserData();
      setIsPreferencesModalOpen(false);
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  const saveLanguage = async () => {
    try {
      if (!newLanguage || user.languages.includes(newLanguage)) return;

      const { error } = await supabase
        .from("users")
        .update({ languages: [...user.languages, newLanguage] })
        .eq("id", user.id);

      if (error) throw error;

      await refetchUserData();
      setIsLanguageModalOpen(false);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

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
              <span>✘</span> ID nicht verifiziert.{" "}
              <Link to={"/"} className="text-green-600 hover:underline">
                Jetzt verifizieren
              </Link>
            </li>
          )}
          {user.is_license_verified ? (
            <li className="flex items-center gap-2 text-green-600">
              <span>✔</span> Führerschein verifiziert
            </li>
          ) : (
            <li className="flex items-center gap-2 text-red-600">
              <span>✘</span> Führerschein nicht verifiziert.{" "}
              <Link to={"/"} className="text-green-600 hover:underline">
                Jetzt verifizieren
              </Link>
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
        <button
          className="text-green-600 mt-2 hover:underline"
          onClick={() => setIsVehicleModalOpen(true)}
        >
          + Fahrzeug hinzufügen
        </button>

        {/* Add Vehicle Modal */}
        <Modal
          isOpen={isVehicleModalOpen}
          onClose={() => setIsVehicleModalOpen(false)}
          title="Add Vehicle"
          footer={
            <div className="flex justify-between w-5/12 mx-auto">
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveVehicle();
                  setIsVehicleModalOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">Brand</label>
              <Select
                value={newVehicle.brand}
                options={constants.vehiclesBrands}
                onChange={(brand) => {
                  setNewVehicle({ ...newVehicle, brand: brand });
                }}
                className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <Input
                value={newVehicle.model}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, model: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <Select
                value={newVehicle.color}
                options={constants.vehiclesColors}
                onChange={(color) => {
                  setNewVehicle({ ...newVehicle, color: color });
                }}
                className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                License Plate
              </label>
              <Input
                value={newVehicle.license_plate}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    license_plate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seats (including driver)
              </label>
              <Input
                type="number"
                value={newVehicle.seats}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    seats: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </Modal>
      </div>

      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">Über dich</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.preferences.map((preference, index) => (
            <span
              key={index}
              className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm"
            >
              {preference}
            </span>
          ))}
          <button
            className="text-green-600 text-sm hover:underline"
            onClick={() => setIsPreferencesModalOpen(true)}
          >
            + Präferenz hinzufügen
          </button>
        </div>

        {/* Add Preference Modal */}
        <Modal
          isOpen={isPreferencesModalOpen}
          onClose={() => setIsPreferencesModalOpen(false)}
          title="Add Preference"
          footer={
            <div className="flex justify-between w-5/12 mx-auto">
              <button
                onClick={() => setIsPreferencesModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  savePreference();
                  setIsPreferencesModalOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preference
              </label>
              <Select
                value={newPreference}
                options={constants.userPreferences}
                onChange={(preference) => setNewPreference(preference)}
                className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>
        </Modal>

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
          <button
            className="text-green-600 text-sm hover:underline"
            onClick={() => setIsLanguageModalOpen(true)}
          >
            + Sprache hinzufügen
          </button>

          {/* Add Language Modal */}
          <Modal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            title="Add Language"
            footer={
              <div className="flex justify-between w-5/12 mx-auto">
                <button
                  onClick={() => setIsLanguageModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={saveLanguage}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <Select
                  value={newLanguage}
                  options={constants.languagesList}
                  onChange={(language) => setNewLanguage(language)}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
          </Modal>
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
