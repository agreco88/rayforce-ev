export type Brand = {
  name: string;
  models: string[];
};

export const COMPATIBILITY_DATA: Brand[] = [
  {
    name: "BYD",
    models: [
      "Yuan Pro",
      "Yuan Plus",
      "Dolphin",
      "Dolphin Mini",
      "Seagull",
      "Seal",
      "Han",
      "Song Pro",
      "Song Plus",
      "Shark",
      "D1",
    ],
  },
  {
    name: "Tesla",
    models: ["Model 3", "Model Y", "Model S", "Model X"],
  },
  { name: "Dongfeng", models: ["Vigo", "Mage", "Huge", "Nammi", "Nano Box"] },
  {
    name: "Chery",
    models: ["eQ1", "eQ7", "Tiggo 4 ", "Tiggo 7 ", "Tiggo 8 "],
  },
  { name: "Chevrolet", models: ["Bolt EV", "Bolt EUV", "Spark EUV"] },
  { name: "Suzuki", models: ["Swift ", "Fronx "] },
  { name: "Geely", models: ["Geometry E", "Geometry C", "EX5"] },
  {
    name: "Omoda",
    models: ["5 SHS", "5 EV", "Jaecoo 7", "Jaecoo 6", "Jaecoo 5"],
  },
  { name: "Lynk & Co", models: ["01 ", "02 ", "08 EM-P", "Z10 EV"] },
  { name: "JAC", models: ["E2", "E-S1", "E-S2", "E-S3"] },
  {
    name: "GAC MOTOR",
    models: ["Aion Y", "Aion S", "Aion V", "Aion V Plus", "Aion ES"],
  },
  { name: "Hyundai", models: ["Kona ", "Ioniq ", "Ioniq 5"] },
  { name: "Jetour", models: ["T1", "T2", "X50", "X70"] },
  { name: "JMEV", models: ["GSE", "EV3"] },
  { name: "Kia", models: ["Niro EV", "EV6"] },
  {
    name: "Toyota",
    models: ["bZ4X", "Corolla ", "Corolla Cross ", "RAV4 "],
  },
  { name: "Leapmotor", models: ["T03", "C11"] },
  { name: "MG", models: ["MG4 ", "ZS EV", "Marvel R"] },
  { name: "Mini", models: ["Cooper SE "] },
  { name: "Nissan", models: ["Leaf"] },
  { name: "Renault", models: ["Kwid E-Tech", "Zoe"] },
  {
    name: "Audi",
    models: ["Q4 e-tron", "e-tron", "e-tron Sport", "e-tron GT"],
  },
  { name: "BMW", models: ["i3", "i4", "iX1", "iX3", "iX"] },
  { name: "Volkswagen", models: ["ID.3", "ID.4", "ID.5"] },
  { name: "Volvo", models: ["EX30", "XC40", "C40"] },
];
