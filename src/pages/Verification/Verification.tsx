import { useState } from "react";
import Layout from "@/layout/Layout.tsx";
import Lottie from "lottie-react";
import verification_animation from "@/assets/animations/verification.json";
import { supabase } from "@/supabaseClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const verificationOptions = [
  "Personalausweis (für EU-Bürger)",
  "Reisepass",
  "Führerschein",
];

const Verification = () => {
  const [selectedOption, setSelectedOption] = useState(verificationOptions[0]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [document, setDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!isCheckboxChecked) {
      toast.error("Bitte akzeptiere die Datenschutzbestimmungen.");
      return;
    }

    if (!document) {
      toast.error("Bitte lade ein Dokument hoch.");
      return;
    }

    try {
      setIsLoading(true);

      const sanitizedDocumentType = selectedOption.replace(
        /[^a-zA-Z0-9]/g,
        "_",
      );
      const newFileName = `${sanitizedDocumentType}_${document.name}`;

      const { error } = await supabase.storage
        .from("documents")
        .upload(`verification/${newFileName}`, document);

      if (error) {
        console.error(error);
        throw new Error("Fehler beim Hochladen des Dokuments.");
      }

      navigate("/verification-processing");
    } catch (error) {
      toast.error((error as Error).message || "Ein Fehler ist aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div className="bg-white lg:w-8/12 w-11/12 border-2 border-green-600 rounded-2xl shadow-lg p-8 mx-auto mt-10">
        <h1 className="text-center text-2xl font-bold">
          Verifiziere Deine Dokumente
        </h1>
        <div className="flex justify-center">
          <Lottie
            animationData={verification_animation}
            style={{ width: 300, height: 300 }}
          />
        </div>
        <div className="text-center">
          <p className="text-gray-700">
            Wähle bitte aus, welches Dokument du hochladen möchtest.
          </p>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md mt-4 focus:outline-none focus:ring-2 focus:ring-green-600"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {verificationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center mt-4">
          <label
            htmlFor="upload"
            className="block w-fit mx-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 cursor-pointer"
          >
            Dokument auswählen
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {document && (
            <p className="text-sm text-gray-600 mt-2">{document.name}</p>
          )}
        </div>
        <div className="flex justify-center items-center mt-6">
          <input
            type="checkbox"
            id="datenschutz"
            className="w-4 h-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
            checked={isCheckboxChecked}
            onChange={(e) => setIsCheckboxChecked(e.target.checked)}
          />
          <label htmlFor="datenschutz" className="ml-2 text-sm text-gray-600">
            Datenschutzbestimmungen akzeptieren
          </label>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-6 py-3 rounded-md`}
          >
            {isLoading ? "Hochladen..." : "Bestätigen"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
