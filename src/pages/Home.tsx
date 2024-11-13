import TripSearch from "@/components/TripSearch.tsx";
import Layout from "@/layout/Layout.tsx";
import PillLabel from "@/components/PillLabel.tsx";
import CheckmarkLabel from "@/components/CheckmarkLabel.tsx";

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
      </div>
    </Layout>
  );
};

export default Home;
