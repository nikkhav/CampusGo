import Layout from "@/layout/Layout.tsx";
import { Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleContactSupport } from "../../helpers.ts";
import { useSupabaseSession } from "@/hooks/useSupabaseSession.tsx";

const ContactUs = () => {
  const { session } = useSupabaseSession();
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="lg:w-8/12 w-11/12 mx-auto my-16">
        <h1 className="text-4xl font-semibold text-center text-green-700 mb-6">
          Kontaktiere Uns
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Hast du Fragen, Anregungen oder möchtest uns einfach kontaktieren? Wir
          sind für dich da!
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => handleContactSupport(session, navigate)}
            className="text-lg text-white bg-green-600 p-5 rounded-full shadow-md hover:bg-green-700 transition-colors"
          >
            Schick uns eine Nachricht
          </button>
        </div>

        <div className="mt-10 bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">
            Unsere Kontaktinformationen
          </h2>
          <p className="text-gray-600 mb-6">
            Du kannst uns auch über die folgenden Informationen erreichen:
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-green-600" />
              <p className="ml-4 text-gray-700">+49 123 456 7890</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-green-600" />
              <p className="ml-4 text-gray-700">support@campusgo.live</p>
            </div>
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-green-600 mt-1" />
              <p className="ml-4 text-gray-700">
                Universität Bayreuth,
                <br /> Universitätsstraße 30, 95447 Bayreuth
              </p>
            </div>
            <p className="text-gray-600 mt-4">
              Unsere Arbeitszeiten:
              <br /> Montag - Freitag: 9:00 - 18:00 Uhr
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
