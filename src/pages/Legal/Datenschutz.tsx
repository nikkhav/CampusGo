import Layout from "@/layout/Layout.tsx";

const Datenschutz = () => {
  return (
    <Layout>
      <div className="p-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">
          Datenschutzerklärung für CampusGo
        </h1>

        <section>
          <h2 className="text-xl font-semibold">1. Verantwortlicher</h2>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
            und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie
            sonstiger datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p>
            <strong>CampusGo</strong>
            <br />
            Universität Bayreuth, Universitätsstraße 30, 95447 Bayreuth
            <br />
            <a href="mailto:support@campusgo.live">support@campusgo.live</a>
            <br />
            Telefon: +49 123 456 7890
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            2. Erfassung und Verarbeitung personenbezogener Daten
          </h2>
          <p>
            Wir erfassen und verarbeiten personenbezogene Daten unserer Nutzer
            nur, soweit dies für die Bereitstellung einer funktionsfähigen
            Plattform sowie unserer Inhalte und Leistungen erforderlich ist. Die
            Erfassung und Verarbeitung personenbezogener Daten erfolgt
            regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in
            solchen Fällen, in denen eine vorherige Einholung einer Einwilligung
            aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der
            Daten durch gesetzliche Vorschriften gestattet ist.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            3. Arten der verarbeiteten Daten
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Bestandsdaten: Name, E-Mail-Adresse, Telefonnummer,
              Studierendenstatus, Universität.
            </li>
            <li>Nutzungsdaten: IP-Adresse, Datum und Uhrzeit der Zugriffe.</li>
            <li>
              Fahrtdaten: Abfahrtsort, Zielort, Datum, Uhrzeit, Anzahl der
              Plätze.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            4. Zweck der Datenverarbeitung
          </h2>
          <ul className="list-disc pl-6">
            <li>Bereitstellung und Optimierung der Plattform.</li>
            <li>Vermittlung von Mitfahrgelegenheiten zwischen Nutzern.</li>
            <li>
              Kommunikation mit den Nutzern (z.B. bei Buchungsbestätigungen oder
              Änderungen).
            </li>
            <li>Sicherstellung der Sicherheit und Integrität der Plattform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            5. Rechtsgrundlage der Datenverarbeitung
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Einwilligung (Art. 6 Abs. 1 lit. a DSGVO): Der Nutzer hat seine
              Einwilligung zur Verarbeitung seiner personenbezogenen Daten
              gegeben.
            </li>
            <li>
              Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO): Die Verarbeitung
              ist für die Erfüllung eines Vertrags erforderlich, dessen
              Vertragspartei der Nutzer ist.
            </li>
            <li>
              Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO): Die
              Verarbeitung ist zur Wahrung der berechtigten Interessen des
              Verantwortlichen oder eines Dritten erforderlich.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Weitergabe von Daten</h2>
          <p>
            Personenbezogene Daten werden nur an Dritte weitergegeben, wenn dies
            für die Vertragserfüllung erforderlich ist (z.B. an andere Nutzer im
            Rahmen der Vermittlung von Mitfahrgelegenheiten) oder wenn der
            Nutzer ausdrücklich eingewilligt hat. Eine Weitergabe an Behörden
            erfolgt nur im Rahmen gesetzlicher Verpflichtungen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            7. Datenübertragung in Drittländer
          </h2>
          <p>
            Eine Datenübertragung in Drittländer außerhalb der Europäischen
            Union (EU) oder des Europäischen Wirtschaftsraums (EWR) findet nur
            dann statt, wenn dies für die Nutzung der Plattform erforderlich ist
            und der Nutzer eingewilligt hat. In solchen Fällen stellen wir
            sicher, dass ein angemessenes Datenschutzniveau gewährleistet ist.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Speicherdauer der Daten</h2>
          <p>
            Personenbezogene Daten werden nur so lange gespeichert, wie es für
            die Erfüllung des Verarbeitungszwecks erforderlich ist oder wie es
            gesetzlich vorgeschrieben ist. Nach Ablauf der Speicherfrist werden
            die Daten gelöscht.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            9. Rechte der betroffenen Personen
          </h2>
          <p>Gemäß der DSGVO haben Nutzer folgende Rechte:</p>
          <ul className="list-disc pl-6">
            <li>
              Auskunftsrecht: Recht auf Informationen über die verarbeiteten
              personenbezogenen Daten.
            </li>
            <li>
              Berichtigungsrecht: Recht auf Berichtigung unrichtiger oder
              unvollständiger Daten.
            </li>
            <li>
              Löschungsrecht: Recht auf Löschung der personenbezogenen Daten,
              sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </li>
            <li>
              Einschränkungsrecht: Recht auf Einschränkung der Verarbeitung der
              personenbezogenen Daten.
            </li>
            <li>
              Widerspruchsrecht: Recht, der Verarbeitung der personenbezogenen
              Daten zu widersprechen.
            </li>
            <li>
              Datenübertragbarkeit: Recht auf Übertragung der Daten in einem
              strukturierten, gängigen und maschinenlesbaren Format.
            </li>
          </ul>
          <p>
            Um diese Rechte geltend zu machen, können sich Nutzer an uns unter
            der oben angegebenen Kontaktadresse wenden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Datensicherheit</h2>
          <p>
            Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein,
            um die personenbezogenen Daten unserer Nutzer vor Verlust,
            Missbrauch oder unbefugtem Zugriff zu schützen. Unsere
            Sicherheitsmaßnahmen werden regelmäßig überprüft und an den
            technologischen Fortschritt angepasst.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">
            11. Änderungen der Datenschutzerklärung
          </h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie
            an geänderte rechtliche Anforderungen oder an Änderungen unserer
            Dienstleistungen anzupassen.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">12. Kontakt</h2>
          <p>
            Bei Fragen oder Anliegen zum Datenschutz können Sie uns unter
            folgender Kontaktadresse erreichen:
          </p>
          <p>
            <strong>CampusGo</strong>
            <br />
            Universität Bayreuth, Universitätsstraße 30, 95447 Bayreuth
            <br />
            <a href="mailto:support@campusgo.live">support@campusgo.live</a>
            <br />
            Telefon: +49 123 456 7890
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Datenschutz;
