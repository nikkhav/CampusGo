import Layout from "@/layout/Layout.tsx";

const BookRide = () => {
  return (
    <Layout>
      <div className="w-8/12 mx-auto my-10">
        <h2 className="text-4xl text-center font-semibold">Reise buchen</h2>
        <p className="mt-4 text-center text-gray-600">
          Bitte lesen Sie die Informationen zur Fahrt sorgfältig durch, bevor
          Sie diese buchen.
        </p>

        <div className="mt-10 border p-8 bg-white shadow-lg rounded-xl">
          <div className="flex justify-between items-center w-full mx-auto">
            <div className="text-center">
              <p className="text-lg font-semibold">12:00</p>
              <p className="text-xl font-bold mt-2">Bayreuth</p>
              <p className="text-sm text-gray-500">Universitätstr. 1</p>
              <div className="mt-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Start location"
                  className="w-40 h-40 rounded-lg border-2 border-green-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-center flex-grow mx-4 relative">
              <div className="h-px bg-green-600 flex-grow"></div>
              <p className="mx-4 text-green-600 font-semibold">1:00 Std.</p>
              <div className="h-px bg-green-600 flex-grow" />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold">13:00</p>
              <p className="text-xl font-bold mt-2">Kulmbach</p>
              <p className="text-sm text-gray-500">Universitätstr. 2</p>
              <div className="mt-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="End location"
                  className="w-40 h-40 rounded-lg border-2 border-green-600"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border bg-white shadow-lg rounded-xl p-8">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mr-4">
              <p className="text-gray-500">Foto</p>
            </div>
            <p className="text-lg font-bold">Vorname Nachname</p>
          </div>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>Bitte nicht rauchen / Ich rauche auch gerne!</li>
            <li>Bitte ohne Haustiere / Ich liebe Tiere!</li>
            <li>Fahre gerne ohne Musik / Ich liebe Musik im Auto!</li>
            <li>Mache Zwischenstopps / Fahre lieber ohne Stopps!</li>
          </ul>

          <p className="mt-6 font-semibold">
            Kommentar über mich und über unsere Reise
          </p>

          <p className="mt-6 text-gray-700 font-semibold">
            BMW M5 Competition - Gold
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
              “Vorname” kontaktieren
            </button>
            <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200">
              Fahrt melden
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button className="rounded-3xl bg-green-600 text-white px-6 py-3 text-lg hover:bg-green-700">
            Buchung bestätigen
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookRide;
