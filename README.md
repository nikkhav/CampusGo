# CampusGo - Pendler-App zur Bildung von Fahrgemeinschaften

## Projektbeschreibung

Dieses Projekt zielt darauf ab, eine **Pendler-App** zu entwickeln, die die Bildung von Fahrgemeinschaften fördert, insbesondere für Fahrten zur Universität, zwischen den Campusstandorten Bayreuth und Kulmbach sowie für gemeinsame Dienstreisen. Die App soll zur Reduzierung des Verkehrsaufkommens und zur Förderung der Nachhaltigkeit beitragen, indem sie den Mitarbeitern der Universität eine bequeme Möglichkeit zur Organisation von Fahrgemeinschaften bietet.

## Ausgangssituation

Eine Mobilitätsumfrage der Universität Bayreuth (UBT) hat gezeigt:
- Das **Auto ist das meistgenutzte Verkehrsmittel**, insbesondere bei den Beschäftigten, die im Landkreis wohnen.
- Der **Pendlerverkehr zwischen den Campusstandorten Bayreuth und Kulmbach** nimmt zu, besonders für Gremiensitzungen und ähnliche Termine der Beschäftigten.
- Die UBT will die **Nachhaltigkeit weiter vorantreiben**, neue Mobilitätslösungen schaffen und als großer Arbeitgeber in der Region Vorbild sein.

## Zweck der App
Die Pendler-App soll die Bildung von Fahrgemeinschaften erleichtern, indem sie folgende Anwendungsfälle unterstützt:
- **Fahrten zur Universität**
- **Pendlerverkehr zwischen den Campusstandorten Bayreuth und Kulmbach**
- **Gemeinsame Dienstreisen**

## Hauptfunktionen
- **Darstellung von Fahrgesuchen und -angeboten**: Nutzer können Fahrten suchen oder anbieten.
- **Intuitive, benutzerfreundliche Bedienung**: Fokus auf einfache und schnelle Nutzung.
- **Filtermöglichkeiten**: Z. B. nach Pendelzeiten, um passende Fahrgemeinschaften leichter zu finden.

## Langfristiges Ziel
Das langfristige Ziel ist die **Integration in die bestehende UBT-App** (über UniNow), sodass die Funktionalitäten für die Nutzer der Universität bequem erreichbar sind.

## Erweiterungsmöglichkeiten
- **Einbindung von Orten und Gemeinden in der Region**: Die App könnte Orte und Gemeinden in der Region einbeziehen, um das Fahrgemeinschaftsnetzwerk zu erweitern.
- **Integration von Sonderzielen**: Unterstützung für besondere Ziele wie Bahnhöfe und Parkplätze.
- **Umkreissuche rund um Start- und Zielorte**: Möglichkeit zur Suche nach Fahrten im Umkreis von Start- und Zielorten.
- **Option für Zwischenziele**: Möglichkeit, zusätzliche Mitfahrende entlang der Strecke aufzunehmen.
- **Barrierefreiheit**: Anpassung der App für alle Nutzergruppen.
- **Anzeige des eingesparten CO₂**: Visualisierung der CO₂-Reduktion durch die Nutzung von Fahrgemeinschaften.

## Technologie-Stack
- **Frontend**: React mit TypeScript für eine webbasierte Anwendung

## Installation und Start
1. **Abhängigkeiten installieren**: Führen Sie den folgenden Befehl aus, um alle erforderlichen Pakete zu installieren:
   ```bash
   yarn install
   ```
   
2. **Konfiguration**: Erstellen Sie eine `.env`-Datei im Hauptverzeichnis des Projekts und fügen Sie die folgenden Umgebungsvariablen hinzu:
   ```bash
   VITE_SUPABASE_URL=supabase-url
   VITE_SUPABASE_KEY=supabase-key
   VITE_REACT_APP_MAPBOX_TOKEN=mapbox-token
   ```
    Ersetzen Sie `supabase-url`, `supabase-key` und `mapbox-token` durch die entsprechenden Werte.
    Bitte uns kontaktieren, um die Werte zu erhalten.

3. **App starten**: Nutzen Sie den folgenden Befehl, um die App im Entwicklungsmodus zu starten:
   ```bash
   yarn dev
   ```

## Mitwirken
Wir freuen uns über Beiträge zu diesem Projekt! Bitte nutzen Sie Pull Requests und halten Sie sich an die üblichen Best Practices für Commit-Nachrichten (kurz, prägnant und im Imperativ).

## Lizenz
Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der Datei `LICENSE`.

---

Falls es Fragen gibt oder weitere Informationen benötigt werden, zögern Sie nicht, uns zu kontaktieren.
