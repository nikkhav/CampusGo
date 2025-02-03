import Layout from "@/layout/Layout.tsx";
import { Link } from "react-router-dom";

const AGB = () => {
  return (
    <Layout>
      <div className="p-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">
          Allgemeine Geschäftsbedingungen für CampusGo
        </h1>

        <section>
          <h2 className="text-xl font-semibold">1. Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der
            Plattform CampusGo, erreichbar unter www.campusgo.live, die es
            Nutzern ermöglicht, Mitfahrgelegenheiten zwischen Bayreuth und
            Kulmbach anzubieten und zu suchen. Durch die Registrierung und
            Nutzung der Plattform akzeptiert der Nutzer diese AGB in vollem
            Umfang.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            2. Beschreibung der Dienstleistung
          </h2>
          <p>
            CampusGo ist eine kostenlose Plattform, die Fahrer und Mitfahrer
            vernetzt, um gemeinsam zu reisen. Die Plattform ist kein Anbieter
            von Transportdienstleistungen, sondern fungiert als Vermittler
            zwischen den Nutzern.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            3. Registrierung und Nutzerkonto
          </h2>
          <p>
            Um die Plattform nutzen zu können, müssen sich Nutzer registrieren
            und dabei wahrheitsgemäße und aktuelle Informationen angeben.
            <br />
            In dieser Phase ist die Registrierung ausschließlich Studierenden
            der Universität Bayreuth vorbehalten. CampusGo behält sich das Recht
            vor, die Identität und den Studierendenstatus der Nutzer zu
            überprüfen.
            <br />
            Jeder Nutzer ist verantwortlich für die Vertraulichkeit seines
            Kontos und Passworts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            4. Anbieten und Buchen von Fahrten
          </h2>
          <p>
            Fahrer können Fahrten anbieten, indem sie Datum, Uhrzeit,
            Abfahrtsort, Zielort und die Anzahl der verfügbaren Plätze angeben.
            <br />
            Mitfahrer können nach verfügbaren Fahrten suchen und Plätze buchen.
            <br />
            CampusGo garantiert weder die Verfügbarkeit von Fahrten noch die
            Richtigkeit der von Nutzern bereitgestellten Informationen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Pflichten der Nutzer</h2>
          <ul className="list-disc pl-6">
            <li>
              Nutzer verpflichten sich, respektvoll zu handeln und die Verkehrs-
              und Transportgesetze einzuhalten.
            </li>
            <li>
              Fahrer sind verantwortlich für einen gültigen Versicherungsschutz
              und ein verkehrssicheres Fahrzeug.
            </li>
            <li>
              Nutzer müssen sich klar und respektvoll mit anderen Mitgliedern
              der Plattform verständigen.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Gebühren und Zahlungen</h2>
          <p>
            Die Nutzung der Plattform ist derzeit für alle Nutzer kostenlos.
            Sollten in Zukunft Gebühren eingeführt werden, werden die Nutzer
            rechtzeitig informiert.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            7. Stornierungen und Rückerstattungen
          </h2>
          <p>
            Fahrer und Mitfahrer müssen Stornierungen rechtzeitig mitteilen.
            <br />
            Finanzielle Vereinbarungen zwischen Fahrern und Mitfahrern liegen in
            der alleinigen Verantwortung der beteiligten Parteien.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Geistiges Eigentum</h2>
          <p>
            Alle Inhalte der Plattform (Design, Logos, Texte etc.) sind Eigentum
            von CampusGo und urheberrechtlich geschützt.
            <br />
            Nutzer dürfen die Inhalte nicht ohne Genehmigung kopieren,
            modifizieren oder verbreiten.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Haftungsbeschränkung</h2>
          <p>
            CampusGo haftet nicht für Vereinbarungen zwischen Nutzern oder für
            Schäden, die aus der Nutzung der Plattform resultieren.
            <br />
            Die Plattform gewährleistet weder eine kontinuierliche Verfügbarkeit
            noch die Abwesenheit von technischen Fehlern.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Datenschutz</h2>
          <p className="mb-2">
            Die Verarbeitung personenbezogener Daten der Nutzer richtet sich
            nach unserer Datenschutzerklärung.
          </p>{" "}
          <Link className={"text-blue-500 hover:underline"} to="/datenschutz">
            Unsere Datenschutzerklärung
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Änderungen der AGB</h2>
          <p>
            CampusGo behält sich das Recht vor, diese AGB jederzeit zu ändern.
            Änderungen werden den Nutzern rechtzeitig mitgeteilt.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Streitbeilegung</h2>
          <p>
            Im Falle von Streitigkeiten wird den Nutzern empfohlen, diese
            einvernehmlich zu lösen. Sollte dies nicht möglich sein, gilt
            deutsches Recht.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            13. Anwendbares Recht und Gerichtsstand
          </h2>
          <p>
            Diese AGB unterliegen dem Recht der Bundesrepublik Deutschland. Für
            rechtliche Streitigkeiten sind die zuständigen Gerichte in Bayreuth
            verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">14. Schlussbestimmungen</h2>
          <p>
            Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt der Rest
            des Dokuments gültig.
            <br />
            Bei Fragen oder Anliegen können Nutzer uns unter{" "}
            <a href="mailto:support@campusgo.live">
              support@campusgo.live
            </a>{" "}
            kontaktieren.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default AGB;
