interface Constants {
  destinations: string[];
  positiveFeedbackPassenger: string[];
  negativeFeedbackPassenger: string[];
  positiveFeedbackDriver: string[];
  negativeFeedbackDriver: string[];
  vehiclesBrands: string[];
  vehiclesColors: string[];
}

const constants: Constants = {
  destinations: [
    "Mensa Bayreuth",
    "ZOH Bayreuth",
    "Hbf Bayreuth",
    "Campus Kulmbach",
  ],
  positiveFeedbackPassenger: [
    "Freundlichkeit 😊",
    "Rücksichtsnahme 🤝",
    "Pünktlichkeit ⏰",
    "Sauberes Auftreten 👔",
    "Angenehme Gespräche 🗣️",
    "Respektvolles Verhalten 🙌",
    "Antwortet Schnell 📱",
  ],
  negativeFeedbackPassenger: [
    "Unpünktlichkeit ⏰",
    "Unangenehme Gespräche 🤐",
    "Schlechte Kommunikation 📵",
    "Verschmutzung im Auto 🤢",
    "Unfreundlichkeit 😡",
    "Respektloses Verhalten ❌",
    "Unzuverlässigkeit 🤷",
  ],
  positiveFeedbackDriver: [
    "Geselligkeit 👫",
    "Sauberekeit 🧹",
    "Schnelle Fahrt 🚙💨",
    "Pünktlichkeit ⏰",
    "Gute Musik 🎶",
    "Sorgfältiges Fahren 👀",
    "Großer Kofferraum 🧳",
  ],
  negativeFeedbackDriver: [
    "Unpünktlichkeit ⏰",
    "Lange Fahrt ⏳",
    "Unfreundlichkeit 😡",
    "Unsauberes Auto 🧹❌",
    "Unvorsichtiges Fahren ⚠️",
    "Unangemessene Musik 🎵❌",
    "Überfülltes Auto 👥🧳",
  ],
  vehiclesBrands: [
    "Volkswagen",
    "Toyota",
    "Peugeot",
    "Renault",
    "Mercedes-Benz",
    "BMW",
    "Audi",
    "Ford",
    "Škoda",
    "Hyundai",
    "Kia",
    "Fiat",
    "Citroën",
    "Opel",
    "Nissan",
    "Dacia",
    "Seat",
    "Volvo",
    "Mazda",
    "Mini",
    "Suzuki",
    "Land Rover",
    "Jaguar",
    "Jeep",
    "Honda",
    "Mitsubishi",
    "Alfa Romeo",
    "Lexus",
    "Porsche",
    "Tesla",
  ],
  vehiclesColors: [
    "Rot",
    "Blau",
    "Grün",
    "Gelb",
    "Schwarz",
    "Weiß",
    "Grau",
    "Braun",
    "Orange",
    "Lila",
    "Pink",
    "Silber",
  ],
};

export default constants;
