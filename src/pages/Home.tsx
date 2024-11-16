import TripSearch from "@/components/TripSearch.tsx";
import Layout from "@/layout/Layout.tsx";
import PillLabel from "@/components/PillLabel.tsx";
import CheckmarkLabel from "@/components/CheckmarkLabel.tsx";
import home_story from "@/assets/home-story.jpg";
import home_ideology from "@/assets/home-ideology.jpg";
import auto_icon from "@/assets/icons/auto-icon.svg";
import smile_icon from "@/assets/icons/smile-icon.svg";
import filter_icon from "@/assets/icons/filter-icon.svg";
import path_icon from "@/assets/icons/path-icon.svg";
import mariia from "@/assets/avatars/Mariia.webp";
import eduard from "@/assets/avatars/Eduard.webp";
import nikita from "@/assets/avatars/Nikita.webp";
import sasha from "@/assets/avatars/Sasha.webp";

const features = [
  [
    {
      icon: auto_icon,
      text: "Erstellung und Suche von Mitfahrangeboten",
    },
    {
      icon: smile_icon,
      text: "Intuitive und benutzerfreundliche Bedienung",
    },
  ],
  [
    {
      icon: filter_icon,
      text: "Filtermöglichkeiten nach Pendelzeiten und Routen",
    },
    {
      icon: path_icon,
      text: "Integration von Orten und Haltestellen sowie barrierefreier Zugang für alle Nutzergruppen",
    },
  ],
];

interface TeamMemberProps {
  name: string;
  course: string;
  image: string;
}

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex items-center gap-4 mt-7 first:mt-0">
      <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center  shrink-0">
        <img src={icon} alt="icon" className="w-10 h-10 object-contain" />
      </div>
      <p>{text}</p>
    </div>
  );
};

const TeamMember = ({ name, course, image }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 rounded-full border-2 border-green-600"
      />
      <h5 className="text-xl font-semibold mt-5">{name}</h5>
      <p className="text-gray-700 mt-3">{course}</p>
    </div>
  );
};

const Home = () => {
  return (
    <Layout>
      <div className="w-10/12">
        <h2 className="text-6xl text-center mt-16">
          Nachhaltig fahren und <br />
          Zeit sparen
        </h2>
        <p className="text-xl text-center font-light mt-12">
          Reduziere deine Fahrtkosten und lerne neue Freunde aus deiner Nähe
          kennen –
          <br />
          alles auf dem Weg zur Uni.
        </p>
        <TripSearch />
        <PillLabel text="Workflows" />
        <h2 className="font-semibold text-4xl mt-5">
          Schneller und Nachhaltiger fahren
        </h2>
        <p className="text-lg font-light mt-3 text-gray-700">
          Mit unserem Service kannst du schnell und einfach eine
          Fahrgemeinschaft finden, um gemeinsam zur Uni zu fahren. So sparst du
          nicht nur Geld, sondern tust auch etwas Gutes für die Umwelt.
        </p>
        <div className="flex my-5 space-x-6">
          <CheckmarkLabel text="Schnell und einfach" />
          <CheckmarkLabel text="Kostenlos" />
          <CheckmarkLabel text="Umweltfreundlich" />
        </div>

        <div className="mt-10">
          <PillLabel text="Über uns" />
          <div className="flex flex-row justify-between mt-10">
            <div className="flex flex-col w-5/12">
              <h3 className="border-b-4 border-b-green-600 text-2xl font-semibold">
                Our story
              </h3>
              <p className="font-light mt-3 text-gray-700">
                CampusGo wurde entwickelt, um eine der zentralen
                Herausforderungen der Region zu lösen: die Verbesserung der
                Mobilität von Mitarbeiter und Studierenden zwischen den
                Campusstandorten der Universität Bayreuth und Kulmbach. Das
                Hauptproblem ist die vorherrschende Nutzung von Autos, was zu
                einer hohen Belastung der Infrastruktur und der Umwelt führt.
                Das Projekt zielt darauf ab, nachhaltige und effiziente
                Mobilitätslösungen zu schaffen und die Bildung von
                Fahrgemeinschaften zu fördern.
              </p>
            </div>
            <div className="flex flex-col w-5/12">
              <img src={home_story} alt="Home Story" />
            </div>
          </div>
          <div className="flex flex-row-reverse justify-between  mt-20">
            <div className="flex flex-col w-5/12">
              <h3 className="border-b-4 border-b-green-600 text-2xl font-semibold">
                Ideologie und Ziele
              </h3>
              <p className="font-light mt-3 text-gray-700">
                CampusGo basiert auf den Prinzipien der Nachhaltigkeit,
                Inklusion und Benutzerfreundlichkeit. Unser Ziel ist es, den
                CO₂-Fußabdruck zu reduzieren und komfortable Bedingungen für die
                Mobilität zwischen den Campusstandorten zu schaffen. Wir sind
                überzeugt, dass Mobilitätslösungen für alle zugänglich und auf
                die Bedürfnisse moderner Nutzer zugeschnitten sein sollten.
              </p>
            </div>
            <div className="flex flex-col w-5/12">
              <img src={home_ideology} alt="Home Ideology" />
            </div>
          </div>
        </div>
        <h3 className="text-4xl text-center mt-20 underline decoration-green-600">
          Key Features of CampusGo
        </h3>
        <div className="flex justify-between w-full mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col w-5/12">
              {feature.map((item, index) => (
                <FeatureItem key={index} icon={item.icon} text={item.text} />
              ))}
            </div>
          ))}
        </div>

        <h3 className="text-4xl text-center mt-20 underline decoration-green-600">
          Our Goals
        </h3>

        <div className="flex justify-evenly text-center mt-10">
          <div className="w-1/3 flex flex-col items-center mx-3">
            <div className="h-14 flex items-center">
              <h5 className="text-2xl font-semibold">
                Förderung von Fahrgemeinschaften
              </h5>
            </div>
            <p className="mt-3 text-gray-700">
              Die App ermöglicht es Nutzer, gemeinsame Fahrten zu organisieren
              und dadurch die Verkehrsbelastung zu reduzieren und CO₂-Emissionen
              einzusparen
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center mx-3">
            <div className="h-14 flex items-center">
              <h5 className="text-2xl font-semibold">
                Integration die UBT-App
              </h5>
            </div>
            <p className="mt-3 text-gray-700">
              Langfristig soll CampusGo in die bestehende Infrastruktur der
              Universität integriert werden, um den Nutzer maximalen Komfort zu
              bieten
            </p>
          </div>
          <div className="w-1/3 flex flex-col items-center mx-3">
            <div className="h-14 flex items-center">
              <h5 className="text-2xl font-semibold ">
                Entwicklung neuer Mobilitätslösungen
              </h5>
            </div>
            <p className="mt-3 text-gray-700">
              Wir möchten ein Vorbild für nachhaltige Mobilität in der Region
              sein und innovative Ansätze fördern
            </p>
          </div>
        </div>

        <h3 className="text-4xl text-center mt-20 underline decoration-green-600">
          Our Team
        </h3>

        <div className="flex justify-between w-full mt-16 text-center">
          <TeamMember
            name="Mariia Mankovska"
            course="2 Semester Wirtschaftsinformatik"
            image={mariia}
          />
          <TeamMember
            name="Eduard Rusakov"
            course="4 Semester Wirtschaftsinformatik"
            image={eduard}
          />
          <TeamMember
            name="Nikita Khavkin"
            course="4 Semester Wirtschaftsinformatik"
            image={nikita}
          />
          <TeamMember
            name="Oleksandra Shortova"
            course="5 Semester Wirtschaftsinformatik"
            image={sasha}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
