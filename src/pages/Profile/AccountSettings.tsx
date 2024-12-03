import { User } from "@/types.ts";
import { useState } from "react";
import Modal from "@/components/Modal.tsx";
import Input from "@/components/Input.tsx";
import { toast } from "react-toastify";
import { supabase } from "@/supabaseClient.ts";
import { useNavigate } from "react-router-dom";

export const AccountSettings = ({
  user,
  refetchUserData,
}: {
  user: User;
  refetchUserData: () => void;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<User>({ ...user });
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const formatDate = (date: string | null) => {
    if (!date) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("de-DE", options);
  };

  const saveUserInfo = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          birth_date: updatedUser.birth_date,
          email: updatedUser.email,
          phone: updatedUser.phone,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast.success("Benutzerdaten erfolgreich aktualisiert!");
      await refetchUserData();
      setIsEditModalOpen(false);
    } catch {
      toast.error(
        "Fehler beim Aktualisieren der Benutzerdaten. Bitte versuchen Sie es erneut.",
      );
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Die neuen Passwörter stimmen nicht überein.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Passwort erfolgreich geändert!");
      setIsChangePasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error(
        "Fehler beim Ändern des Passworts. Bitte versuchen Sie es erneut.",
      );
    }
  };

  const onLogout = () => {
    localStorage.removeItem("sb-qheatslvrwrvuwuheyxc-auth-token");
    localStorage.removeItem("userId");
    toast.success("Erfolgreich ausgeloggt!");
    navigate("/login");
  };

  const onDeleteAccount = async () => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", user.id);
      if (error) throw error;
      localStorage.removeItem("sb-qheatslvrwrvuwuheyxc-auth-token");
      localStorage.removeItem("userId");
      toast.success("Konto erfolgreich gelöscht!");
      navigate("/login");
    } catch {
      toast.error(
        "Fehler beim Löschen des Kontos. Bitte versuchen Sie es erneut.",
      );
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
            <span className="font-medium">{formatDate(user.birth_date)}</span>
          </li>
          <li>
            E-Mail-Adresse: <span className="font-medium">{user.email}</span>
          </li>
          <li>
            Telefonnummer:{" "}
            <span className="font-medium">{user.phone || "N/A"}</span>
          </li>
        </ul>
        <button
          className="text-green-600 mt-4 hover:underline"
          onClick={() => setIsEditModalOpen(true)}
        >
          Persönliche Daten bearbeiten
        </button>
      </div>

      <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col">
        <h3 className="text-lg font-semibold border-green-600 border-b-2 pb-2">
          Kontoeinstellungen
        </h3>

        <div className="mt-4 flex flex-col space-y-2 items-start">
          <button
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="text-green-600 hover:underline"
          >
            Passwort ändern
          </button>
          <button onClick={onLogout} className="text-green-600 hover:underline">
            Ausloggen
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-red-600 hover:underline"
          >
            Konto schließen
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Persönliche Daten bearbeiten"
        footer={
          <div className="flex justify-between w-5/12 mx-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Abbrechen
            </button>
            <button
              onClick={saveUserInfo}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Speichern
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            value={updatedUser.first_name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, first_name: e.target.value })
            }
          />
          <Input
            value={updatedUser.last_name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, last_name: e.target.value })
            }
          />
          <Input
            type="date"
            value={updatedUser.birth_date || ""}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, birth_date: e.target.value })
            }
          />
          <Input
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
          />
          <Input
            type="tel"
            value={updatedUser.phone || ""}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, phone: e.target.value })
            }
          />
        </div>
      </Modal>

      <Modal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        title="Passwort ändern"
        footer={
          <div className="flex justify-between w-5/12 mx-auto">
            <button
              onClick={() => setIsChangePasswordModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Abbrechen
            </button>
            <button
              onClick={changePassword}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Speichern
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Aktuelles Passwort"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Neues Passwort"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Passwort bestätigen"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konto löschen bestätigen"
        footer={
          <div className="flex justify-between w-5/12 mx-auto">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Abbrechen
            </button>
            <button
              onClick={onDeleteAccount}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Konto löschen
            </button>
          </div>
        }
      >
        <p className="text-center text-gray-700">
          Möchten Sie Ihr Konto wirklich löschen? Dieser Vorgang ist endgültig.
        </p>
      </Modal>
    </div>
  );
};
