import Layout from "@/layout/Layout.tsx";

const Impressum = () => {
  return (
    <Layout>
      <div className="p-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold">Impressum</h1>
        <p className="text-lg">Angaben gemäß § 5 DDG</p>
        <p className="space-y-1">
          Campus Go <br />
          Universitätsstraße 30 <br />
          95447 Bayreuth <br />
        </p>
        <p className="space-y-1">
          <strong className="font-semibold">Vertreten durch: </strong>
          <br />
          Mariia Mankovska
          <br />
          Eduard Rusakov
          <br />
          Nikita Khavkin
          <br />
          Oleksandra Shortova
          <br />
        </p>
        <p className="space-y-1">
          <strong className="font-semibold">Kontakt:</strong> <br />
          Telefon: +49 123 456 7890 <br />
          E-Mail:{" "}
          <a href="mailto:support@campusgo.live" className="text-blue-500">
            support@campusgo.live
          </a>
        </p>
        <p className="space-y-1">
          <strong className="font-semibold">Umsatzsteuer-ID: </strong> <br />
          Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: XXX
          <br />
          <br />
          <strong className="font-semibold">Wirtschafts-ID: </strong>
          <br />
          YYY
        </p>
        <p className="space-y-1">
          <strong className="font-semibold">Haftungsausschluss: </strong>
          <br />
          <br />
          <strong className="font-semibold">Haftung für Links</strong>
          <br />
          <br />
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
          <br />
          <br />
          <strong className="font-semibold">Urheberrecht</strong>
          <br />
          <br />
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
          <br />
          <br />
          <strong className="font-semibold">Datenschutz</strong>
          <br />
          <br />
          Die Nutzung unserer Webseite ist in der Regel ohne Angabe
          personenbezogener Daten möglich. Soweit auf unseren Seiten
          personenbezogene Daten (beispielsweise Name, Anschrift oder
          eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
          auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
          Zustimmung nicht an Dritte weitergegeben.
          <br />
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
          der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
          lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
          möglich.
          <br />
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
          Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
          angeforderter Werbung und Informationsmaterialien wird hiermit
          ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
          ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
          von Werbeinformationen, etwa durch Spam-Mails, vor.
          <br />
          <br />
          <strong className="font-semibold">Google Analytics</strong>
          <br />
          <br />
          Diese Website benutzt Google Analytics, einen Webanalysedienst der
          Google Inc. ("Google"). Google Analytics verwendet sog. "Cookies",
          Textdateien, die auf Ihrem Computer gespeichert werden und die eine
          Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den
          Cookie erzeugten Informationen über Ihre Benutzung dieser Website
          (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in
          den USA übertragen und dort gespeichert. Google wird diese
          Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
          Reports über die Websiteaktivitäten für die Websitebetreiber
          zusammenzustellen und um weitere mit der Websitenutzung und der
          Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird
          Google diese Informationen gegebenenfalls an Dritte übertragen, sofern
          dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im
          Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre
          IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie
          können die Installation der Cookies durch eine entsprechende
          Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch
          darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
          Funktionen dieser Website voll umfänglich nutzen können. Durch die
          Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über
          Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und
          Weise und zu dem zuvor benannten Zweck einverstanden.
        </p>
        <br />
      </div>
    </Layout>
  );
};

export default Impressum;
