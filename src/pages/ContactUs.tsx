import Layout from "@/layout/Layout.tsx";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <Layout>
      <div className="w-10/12 mx-auto mt-10">
        <h1 className="text-4xl font-semibold text-center text-green-700 mb-6">
          Kontaktiere Uns
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Hast du Fragen, Anregungen oder möchtest uns einfach kontaktieren? Wir
          sind für dich da!
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:space-x-8 gap-8">
          <div className="lg:w-7/12">
            <h2 className="text-2xl font-semibold mb-4">
              Schick uns eine Nachricht
            </h2>
            <form className="bg-white p-8 rounded-md shadow-lg border-2 border-green-600">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Dein Name"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Deine E-Mail-Adresse"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Deine Nachricht"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Senden
              </button>
            </form>
          </div>

          <div className="lg:w-5/12 bg-gray-50 p-8 rounded-md shadow-lg border-2 border-green-600">
            <h2 className="text-2xl font-semibold mb-4">
              Unsere Kontaktinformationen
            </h2>
            <p className="text-gray-600 mb-6">
              Du kannst uns auch über die folgenden Informationen erreichen:
            </p>
            <div className="flex items-center mb-4">
              <Phone className="w-6 h-6 text-green-600" />
              <p className="ml-4 text-gray-700">+49 123 456 7890</p>
            </div>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-green-600" />
              <p className="ml-4 text-gray-700">support@campusgo.live</p>
            </div>
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
              <p className="ml-4 text-gray-700">
                Universität Bayreuth,
                <br />
                Universitätsstraße 30, 95447 Bayreuth
              </p>
            </div>
            <p className="text-gray-600">
              Unsere Arbeitszeiten:
              <br />
              Montag - Freitag: 9:00 - 18:00 Uhr
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
