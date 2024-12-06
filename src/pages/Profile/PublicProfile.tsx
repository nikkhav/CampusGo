import { User, Vehicle } from "@/types.ts";
import { ChangeEvent, useState } from "react";
import { supabase } from "@/supabaseClient.ts";
import { Link } from "react-router-dom";
import Modal from "@/components/Modal.tsx";
import Select from "@/components/Select.tsx";
import constants from "@/assets/data/constants.ts";
import Input from "@/components/Input.tsx";
import { Pencil, Trash2Icon } from "lucide-react";
import { toast } from "react-toastify";

export const PublicProfile = ({
  user,
  refetchUserData,
}: {
  user: User;
  refetchUserData: () => void;
}) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [tempPhoto, setTempPhoto] = useState<string | null>(null);
  const [isDeleteProfilePhotoModalOpen, setIsDeleteProfilePhotoModalOpen] =
    useState<boolean>(false);
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

  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] =
    useState<boolean>(false);
  const [isDeleteVehicleModalOpen, setIsDeleteVehicleModalOpen] =
    useState<boolean>(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<
    "preference" | "language" | null
  >(null);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);

  const [isCustomBrand, setIsCustomBrand] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Keine Datei ausgewählt. Bitte erneut versuchen.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setTempPhoto(reader.result as string);
        setIsPreviewModalOpen(true);
      } else {
        toast.error("Fehler beim Erstellen der Vorschau.");
      }
    };
    reader.readAsDataURL(file);
  };

  const savePreviewPhoto = async () => {
    if (!tempPhoto) return;

    const file = new File(
      [await (await fetch(tempPhoto)).blob()],
      "preview.jpg",
    );
    const fileName = `${user.id}-${Date.now()}-${file.name}`;
    const filePath = `profile_photos/${fileName}`;

    try {
      setIsUploading(true);

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
      }

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      if (!data.publicUrl) {
        toast.error("Fehler beim Abrufen der öffentlichen URL der Datei.");
        return;
      }

      await updateProfilePhoto(data.publicUrl);
      toast.success("Profilfoto erfolgreich hochgeladen und aktualisiert!");
      setTempPhoto(null);
      setPreview(null);
      setIsPreviewModalOpen(false);
    } catch (error: any) {
      console.error("Fehler beim Hochladen der Datei:", error);
      toast.error(`Fehler beim Hochladen des Fotos: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const updateProfilePhoto = async (photoUrl: string) => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ image: photoUrl })
        .eq("id", user.id);

      if (error) throw error;

      await refetchUserData();
    } catch {
      toast.error("Fehler beim Aktualisieren des Profilfotos.");
    }
  };

  const deleteProfilePhoto = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ image: null })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Profilfoto erfolgreich gelöscht!");
      setIsDeleteProfilePhotoModalOpen(false);
      await refetchUserData();
    } catch (error) {
      console.error("Fehler beim Löschen des Profilfotos:", error);
      toast.error("Fehler beim Löschen des Profilfotos.");
    }
  };

  const saveVehicle = async () => {
    try {
      if (
        !newVehicle.brand ||
        !newVehicle.model ||
        !newVehicle.color ||
        !newVehicle.license_plate ||
        !newVehicle.seats
      ) {
        toast.error(
          "Bitte füllen Sie alle Felder aus, um das Fahrzeug zu speichern.",
        );
        return;
      }

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

      toast.success("Fahrzeug erfolgreich gespeichert!");
      await refetchUserData();
      setIsVehicleModalOpen(false);

      setNewVehicle({
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
    } catch (error) {
      console.error("Fehler beim Speichern des Fahrzeugs:", error);
      toast.error(
        "Fehler beim Speichern des Fahrzeugs. Bitte versuchen Sie es erneut.",
      );
    }
  };

  const updateVehicle = async () => {
    if (!editVehicle) return;
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({
          brand: editVehicle.brand,
          model: editVehicle.model,
          color: editVehicle.color,
          license_plate: editVehicle.license_plate,
          seats: editVehicle.seats,
        })
        .eq("id", editVehicle.id);
      if (error) throw error;
      await refetchUserData();
      setIsEditVehicleModalOpen(false);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Fahrzeugs:", error);
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      const { error } = await supabase.from("vehicles").delete().eq("id", id);
      if (error) throw error;
      await refetchUserData();
    } catch (error) {
      console.error("Fehler beim Löschen des Fahrzeugs:", error);
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
      console.error("Fehler beim Speichern der Präferenz:", error);
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
      console.error("Fehler beim Speichern der Sprache:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === "preference" && deleteItem) {
        const updatedPreferences = user.preferences.filter(
          (p) => p !== deleteItem,
        );
        const { error } = await supabase
          .from("users")
          .update({ preferences: updatedPreferences })
          .eq("id", user.id);
        if (error) throw error;
        toast.success("Präferenz erfolgreich gelöscht!");
      } else if (deleteType === "language" && deleteItem) {
        const updatedLanguages = user.languages.filter((l) => l !== deleteItem);
        const { error } = await supabase
          .from("users")
          .update({ languages: updatedLanguages })
          .eq("id", user.id);
        if (error) throw error;
        toast.success("Sprache erfolgreich gelöscht!");
      }

      setIsDeleteModalOpen(false);
      await refetchUserData();
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      toast.error("Fehler beim Löschen. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center bg-gray-100 overflow-hidden">
            {tempPhoto ? (
              <img
                src={tempPhoto}
                alt="Foto Vorschau"
                className="w-full h-full object-cover"
              />
            ) : preview ? (
              <img
                src={preview}
                alt="Profilfoto Vorschau"
                className="w-full h-full object-cover"
              />
            ) : user.image ? (
              <img
                src={user.image}
                alt="Profilfoto"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-2xl font-bold">
                {user.first_name?.charAt(0).toUpperCase()}
                {user.last_name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {user.first_name} {user.last_name}
            </h2>
            <div className="flex items-center mt-2">
              <label
                className="text-green-600 hover:underline cursor-pointer"
                htmlFor="profile-photo"
              >
                {user.image ? "Foto ändern" : "Foto hinzufügen"}
              </label>
              {user.image && (
                <button
                  className="text-red-600 ml-4 hover:underline"
                  onClick={() => setIsDeleteProfilePhotoModalOpen(true)}
                >
                  Foto entfernen
                </button>
              )}
            </div>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {preview && (
              <button
                className="text-red-600 ml-4 hover:underline"
                onClick={() => setPreview(null)}
              >
                Vorschau löschen
              </button>
            )}
          </div>
          <Modal
            isOpen={isPreviewModalOpen}
            onClose={() => {
              setIsPreviewModalOpen(false);
              setTempPhoto(null);
            }}
            title="Foto Vorschau bestätigen"
            footer={
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setIsPreviewModalOpen(false);
                    setTempPhoto(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Abbrechen
                </button>
                <button
                  onClick={savePreviewPhoto}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  disabled={isUploading}
                >
                  {isUploading ? "Speichern..." : "Speichern"}
                </button>
              </div>
            }
          >
            {tempPhoto ? (
              <img
                src={tempPhoto}
                alt="Vorschau"
                className="w-full h-auto object-cover rounded-lg"
              />
            ) : (
              <p className="text-center text-gray-500">
                Keine Vorschau verfügbar
              </p>
            )}
          </Modal>

          <Modal
            isOpen={isDeleteProfilePhotoModalOpen}
            onClose={() => setIsDeleteProfilePhotoModalOpen(false)}
            title="Foto löschen bestätigen"
            footer={
              <div className="flex justify-between w-8/12 mx-auto">
                <button
                  onClick={() => setIsDeleteProfilePhotoModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Abbrechen
                </button>
                <button
                  onClick={async () => {
                    await deleteProfilePhoto();
                    setIsDeleteProfilePhotoModalOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Löschen
                </button>
              </div>
            }
          >
            <p className="text-gray-700 text-center">
              Möchten Sie Ihr Profilfoto wirklich löschen? Dieser Vorgang ist
              endgültig.
            </p>
          </Modal>
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
              <Link
                to={"/verification"}
                className="text-green-600 hover:underline"
              >
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
              <Link
                to={"/verification"}
                className="text-green-600 hover:underline"
              >
                Jetzt verifizieren
              </Link>
            </li>
          )}
        </ul>
        <h3 className="mt-6 text-lg font-semibold">Meine Fahrzeuge</h3>
        {user.vehicles &&
          user.vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="mt-3 flex items-center justify-between text-gray-700"
            >
              <p>
                {vehicle.brand} {vehicle.model}, {vehicle.color}
              </p>
              <div className="flex items-center gap-2">
                <Pencil
                  className="text-green-600 cursor-pointer"
                  size={16}
                  onClick={() => {
                    setEditVehicle(vehicle);
                    setIsEditVehicleModalOpen(true);
                  }}
                />
                <Trash2Icon
                  className="text-red-600 cursor-pointer"
                  size={16}
                  onClick={() => {
                    setVehicleToDelete(vehicle);
                    setIsDeleteVehicleModalOpen(true);
                  }}
                />
              </div>
            </div>
          ))}
        <button
          className="text-green-600 mt-2 hover:underline"
          onClick={() => setIsVehicleModalOpen(true)}
        >
          + Fahrzeug hinzufügen
        </button>

        <Modal
          isOpen={isVehicleModalOpen}
          onClose={() => setIsVehicleModalOpen(false)}
          title="Fahrzeug hinzufügen"
          footer={
            <div className="flex justify-between w-8/12 mx-auto">
              <button
                onClick={() => setIsVehicleModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  saveVehicle();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Hinzufügen
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">Marke</label>
              {isCustomBrand ? (
                <Input
                  value={newVehicle.brand}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, brand: e.target.value })
                  }
                  placeholder="Geben Sie die Marke ein"
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              ) : (
                <Select
                  value={newVehicle.brand}
                  options={[...constants.vehiclesBrands, "Andere"]}
                  onChange={(brand) => {
                    if (brand === "Andere") {
                      setIsCustomBrand(true);
                      setNewVehicle({ ...newVehicle, brand: "" });
                    } else {
                      setIsCustomBrand(false);
                      setNewVehicle({ ...newVehicle, brand });
                    }
                  }}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Modell
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
                Farbe
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
                Kennzeichen
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
                Verfügbare Sitze im Auto
              </label>
              <Input
                type="number"
                value={newVehicle.seats}
                min={1}
                max={10}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    seats: Math.min(Math.max(parseInt(e.target.value), 1), 10),
                  })
                }
              />
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isEditVehicleModalOpen}
          onClose={() => setIsEditVehicleModalOpen(false)}
          title="Fahrzeug bearbeiten"
          footer={
            <div className="flex justify-between w-8/12 mx-auto">
              <button
                onClick={() => setIsEditVehicleModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Abbrechen
              </button>
              <button
                onClick={updateVehicle}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Aktualisieren
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="font-medium text-gray-700">Marke</label>
              {isCustomBrand ? (
                <Input
                  value={editVehicle?.brand || ""}
                  onChange={(e) =>
                    editVehicle &&
                    setEditVehicle({ ...editVehicle, brand: e.target.value })
                  }
                  placeholder="Geben Sie die Marke ein"
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              ) : (
                <Select
                  value={editVehicle?.brand || ""}
                  options={[...constants.vehiclesBrands, "Andere"]}
                  onChange={(brand) => {
                    if (brand === "Andere") {
                      setIsCustomBrand(true);
                      if (editVehicle)
                        setEditVehicle({ ...editVehicle, brand: "" });
                    } else {
                      setIsCustomBrand(false);
                      if (editVehicle)
                        setEditVehicle({ ...editVehicle, brand });
                    }
                  }}
                  className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Modell
              </label>
              <Input
                value={editVehicle?.model || ""}
                onChange={(e) =>
                  editVehicle &&
                  setEditVehicle({ ...editVehicle, model: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Farbe
              </label>
              <Select
                value={editVehicle?.color || ""}
                options={constants.vehiclesColors}
                onChange={(color) => {
                  if (editVehicle) setEditVehicle({ ...editVehicle, color });
                }}
                className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kennzeichen
              </label>
              <Input
                value={editVehicle?.license_plate || ""}
                onChange={(e) =>
                  editVehicle &&
                  setEditVehicle({
                    ...editVehicle,
                    license_plate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Verfügbare Sitze im Auto
              </label>
              <Input
                type="number"
                value={editVehicle?.seats || ""}
                min={1}
                max={10}
                onChange={(e) =>
                  editVehicle &&
                  setEditVehicle({
                    ...editVehicle,
                    seats: Math.min(Math.max(parseInt(e.target.value), 1), 10),
                  })
                }
              />
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isDeleteVehicleModalOpen}
          onClose={() => setIsDeleteVehicleModalOpen(false)}
          title="Fahrzeug löschen bestätigen"
          footer={
            <div className="flex justify-between w-8/12 mx-auto">
              <button
                onClick={() => setIsDeleteVehicleModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  if (vehicleToDelete) {
                    deleteVehicle(vehicleToDelete.id);
                  }
                  setIsDeleteVehicleModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Löschen
              </button>
            </div>
          }
        >
          <p className="text-gray-700">
            Möchten Sie das Fahrzeug{" "}
            <span className="font-semibold text-green-600">
              {vehicleToDelete?.brand} {vehicleToDelete?.model}
            </span>{" "}
            wirklich löschen?
          </p>
        </Modal>
      </div>

      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold">Über dich</h3>
        <p className="mt-1 text-sm text-gray-500">
          Klicken Sie auf eine Präferenz oder Sprache, um sie zu löschen.
        </p>
        {/* Preferences */}
        <div className="mt-4 flex flex-wrap gap-2">
          {user.preferences.map((preference) => (
            <span
              key={preference}
              className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-50"
              onClick={() => {
                setDeleteType("preference");
                setDeleteItem(preference);
                setIsDeleteModalOpen(true);
              }}
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

        <Modal
          isOpen={isPreferencesModalOpen}
          onClose={() => setIsPreferencesModalOpen(false)}
          title="Präferenz hinzufügen"
          footer={
            <div className="flex justify-between w-8/12 mx-auto">
              <button
                onClick={() => setIsPreferencesModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  savePreference();
                  setIsPreferencesModalOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Hinzufügen
              </button>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Präferenz
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
          {user.languages.map((language) => (
            <span
              key={language}
              className="border border-green-600 text-green-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-50"
              onClick={() => {
                setDeleteType("language");
                setDeleteItem(language);
                setIsDeleteModalOpen(true);
              }}
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

          <Modal
            isOpen={isLanguageModalOpen}
            onClose={() => setIsLanguageModalOpen(false)}
            title="Sprache hinzufügen"
            footer={
              <div className="flex justify-between w-8/12 mx-auto">
                <button
                  onClick={() => setIsLanguageModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Abbrechen
                </button>
                <button
                  onClick={saveLanguage}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Hinzufügen
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sprache
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

          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Löschen bestätigen"
            footer={
              <div className="flex justify-between w-8/12 mx-auto">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Abbrechen
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Löschen
                </button>
              </div>
            }
          >
            <p className="text-gray-700">
              Möchten Sie{" "}
              <span className="font-semibold text-green-600">{deleteItem}</span>{" "}
              wirklich löschen?
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};
