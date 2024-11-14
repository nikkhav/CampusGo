import TripSearch from "@/components/TripSearch.tsx";
import Layout from "@/layout/Layout.tsx";
import PillLabel from "@/components/PillLabel.tsx";
import CheckmarkLabel from "@/components/CheckmarkLabel.tsx";
import home_story from "@/assets/home-story.jpg";
import home_ideology from "@/assets/home-ideology.jpg";
import dummy_avatar from "@/assets/dummy-avatar.png";

const Home = () => {
    return (
        <Layout>
            <div className="w-10/12">
                <h2 className="text-6xl text-center mt-16">
                    Nachhaltig fahren und <br/>
                    Zeit sparen
                </h2>
                <p className="text-xl text-center font-light mt-12">
                    Reduziere deine Fahrtkosten und lerne neue Freunde aus deiner Nähe
                    kennen –
                    <br/>
                    alles auf dem Weg zur Uni.
                </p>
                <TripSearch/>
                <PillLabel text="Workflows"/>
                <h2 className="font-semibold text-4xl mt-5">
                    Schneller und Nachhaltiger fahren
                </h2>
                <p className="text-lg font-light mt-3 text-gray-700">
                    Mit unserem Service kannst du schnell und einfach eine
                    Fahrgemeinschaft finden, um gemeinsam zur Uni zu fahren. So sparst du
                    nicht nur Geld, sondern tust auch etwas Gutes für die Umwelt.
                </p>
                <div className="flex my-5 space-x-6">
                    <CheckmarkLabel text="Schnell und einfach"/>
                    <CheckmarkLabel text="Kostenlos"/>
                    <CheckmarkLabel text="Umweltfreundlich"/>
                </div>

                <div className="mt-10">
                    <PillLabel text="Über uns"/>
                    <div className="flex flex-row justify-between items-center mt-10">
                        <div className="flex flex-col w-5/12">
                            <h3 className="border-b-4 border-b-green-600 text-2xl font-semibold mt-5">
                                Our story
                            </h3>
                            <p className="font-light mt-3 text-gray-700">
                                CampusGo wurde entwickelt, um eine der zentralen Herausforderungen der Region zu lösen:
                                die
                                Verbesserung der Mobilität von Mitarbeiter und Studierenden zwischen den
                                Campusstandorten
                                der Universität Bayreuth und Kulmbach. Das Hauptproblem ist die vorherrschende Nutzung
                                von
                                Autos, was zu einer hohen Belastung der Infrastruktur und der Umwelt führt. Das Projekt
                                zielt darauf ab, nachhaltige und effiziente Mobilitätslösungen zu schaffen und die
                                Bildung
                                von Fahrgemeinschaften zu fördern.
                            </p>
                        </div>
                        <div className="flex flex-col w-5/12">
                            <img src={home_story} alt="Home Story"/>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse justify-between items-center mt-20">
                        <div className="flex flex-col w-5/12">
                            <h3 className="border-b-4 border-b-green-600 text-2xl font-semibold mt-5">
                                Ideologie und Ziele
                            </h3>
                            <p className="font-light mt-3 text-gray-700">
                                CampusGo basiert auf den Prinzipien der Nachhaltigkeit, Inklusion und
                                Benutzerfreundlichkeit. Unser Ziel ist es, den CO₂-Fußabdruck zu reduzieren und
                                komfortable Bedingungen für die Mobilität zwischen den Campusstandorten zu schaffen. Wir
                                sind überzeugt, dass Mobilitätslösungen für alle zugänglich und auf die Bedürfnisse
                                moderner Nutzer zugeschnitten sein sollten.
                            </p>
                        </div>
                        <div className="flex flex-col w-5/12">
                            <img src={home_ideology} alt="Home Ideology"/>
                        </div>
                    </div>
                </div>
                <h3 className="text-4xl text-center mt-20 underline decoration-green-600">
                    Key Features of CampusGo
                </h3>
                <div className="flex justify-between w-full mt-12">
                    <div className="flex flex-col w-5/12">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-gray-200">
                                <img src="https://via.placeholder.com/24" alt="icon" className="w-10 h-10"/>
                            </div>
                            <p>Erstellung und Suche von Mitfahrangeboten</p>
                        </div>
                        <div className="flex items-center gap-4 mt-7">
                            <div
                                className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-gray-200">
                                <img src="https://via.placeholder.com/24" alt="icon" className="w-10 h-10"/>
                            </div>
                            <p>Intuitive und benutzerfreundliche Bedienung</p>
                        </div>
                    </div>

                    <div className="flex flex-col w-5/12">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-gray-200">
                                <img src="https://via.placeholder.com/24" alt="icon" className="w-10 h-10"/>
                            </div>
                            <p>Filtermöglichkeiten nach Pendelzeiten und Routen</p>
                        </div>
                        <div className="flex items-center gap-4 mt-7">
                            <div
                                className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-gray-200">
                                <img src="https://via.placeholder.com/24" alt="icon" className="w-10 h-10"/>
                            </div>
                            <p>Filtermöglichkeiten nach Pendelzeiten und Routen</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-4xl text-center mt-20 underline decoration-green-600">
                    Our Goals
                </h3>

                <div className="flex justify-evenly text-center mt-10">
                    <div className="w-1/3 flex flex-col items-center">
                        <h5 className="text-2xl font-semibold">
                            Förderung von Fahrgemeinschaften
                        </h5>
                        <p className="mt-3 text-gray-700">
                            Die App ermöglicht es Nutzer, gemeinsame Fahrten zu organisieren und dadurch die
                            Verkehrsbelastung zu reduzieren und CO₂-Emissionen einzusparen
                        </p>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <h5 className="text-2xl font-semibold">
                            Integration in
                            <br/>
                            die UBT-App
                        </h5>
                        <p className="mt-3 text-gray-700">
                            Langfristig soll CampusGo in die bestehende Infrastruktur der Universität integriert werden,
                            um den Nutzer maximalen Komfort zu bieten
                        </p>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <h5 className="text-2xl font-semibold">
                            Entwicklung neuer Mobilitätslösungen
                        </h5>
                        <p className="mt-3 text-gray-700">
                            Wir möchten ein Vorbild für nachhaltige Mobilität in der Region sein und innovative Ansätze
                            fördern
                        </p>
                    </div>
                </div>

                <h3 className="text-4xl text-center mt-20 underline decoration-green-600">
                    Our Team
                </h3>

                <div className="flex justify-between w-full mt-16">
                    <div className="flex flex-col items-center">
                        <img src={dummy_avatar} alt="team member"
                             className="w-40 h-40 rounded-full border-2 border-green-600"/>
                        <h5 className="text-2xl font-semibold mt-5">
                            John Doe
                        </h5>
                        <p className="text-gray-700 mt-3">
                            4 Semester Wirtschaftsinformatik
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={dummy_avatar} alt="team member"
                             className="w-40 h-40 rounded-full border-2 border-green-600"/>
                        <h5 className="text-2xl font-semibold mt-5">
                            John Doe
                        </h5>
                        <p className="text-gray-700 mt-3">
                            4 Semester Wirtschaftsinformatik
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={dummy_avatar} alt="team member"
                             className="w-40 h-40 rounded-full border-2 border-green-600"/>
                        <h5 className="text-2xl font-semibold mt-5">
                            John Doe
                        </h5>
                        <p className="text-gray-700 mt-3">
                            4 Semester Wirtschaftsinformatik
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={dummy_avatar} alt="team member"
                             className="w-40 h-40 rounded-full border-2 border-green-600"/>
                        <h5 className="text-2xl font-semibold mt-5">
                            John Doe
                        </h5>
                        <p className="text-gray-700 mt-3">
                            4 Semester Wirtschaftsinformatik
                        </p>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Home;
