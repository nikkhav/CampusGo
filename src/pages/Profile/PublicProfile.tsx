import { User, Vehicle } from "@/types.ts";
import { useState } from "react";
import { supabase } from "@/supabaseClient.ts";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal.tsx";
import Select from "@/components/Select.tsx";
import constants from "@/assets/data/constants.ts";
import Input from "@/components/Input.tsx";

export const PublicProfile = ({
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
