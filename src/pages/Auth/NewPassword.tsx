import { useState } from "react";
import { supabase } from "@/supabaseClient";
import newpass_bg from "@/assets/images/newpass-bg.webp"; // Import the background image

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!newPassword) {
      setError("Bitte geben Sie ein neues Passwort ein.");
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (resetError) {
        setError(`Fehler beim Ändern des Passworts: ${resetError.message}`);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      );
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100 lg:px-0 px-5"
      style={{
        backgroundImage: `url(${newpass_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-md z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Neues Passwort setzen
        </h2>
        {success ? (
          <p className="text-green-600 text-center">
            Ihr Passwort wurde erfolgreich geändert! Sie können sich jetzt
            einloggen.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="newPassword" className="sr-only">
                Neues Passwort
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Neues Passwort"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Passwort ändern
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
