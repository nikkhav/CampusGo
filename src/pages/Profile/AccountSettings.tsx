import { User } from "@/types.ts";

export const AccountSettings = ({
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
