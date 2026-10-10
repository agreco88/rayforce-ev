export type Brand = {
  name: string;
  models: string[];
};

// Por ventas en Uruguay (ACAU, agosto 2026), salvo Tesla, primera porque
// recien empieza a entregar. Wuling sale de julio; sin dato, al final.
export const COMPATIBILITY_DATA: Brand[] = [
  { name: "Tesla", models: ["Model 3", "Model Y"] },
  {
    name: "BYD",
    models: [
      "Seagull",
      "Seagull Surf",
      "New E2",
      "Yuan Pro",
      "Yuan Pro DM-i",
      "Yuan Plus",
      "Song Plus EV",
      "Song Plus DM-i",
      "Song Pro DM-i",
      "Seal",
      "Sealion 7",
      "Han",
      "Atto 8",
      "Tang",
      "Shark",
    ],
  },
  { name: "Geely", models: ["EX2", "EX5", "EX5 EM-i"] },
  { name: "GAC / Aion", models: ["Aion UT", "Aion ES", "Aion V", "Hyptec HT"] },
  { name: "Fiat", models: ["600e"] },
  {
    name: "Dongfeng",
    models: ["Nammi 330", "Nammi 430", "Vigo E2", "Mage EV"],
  },
  { name: "Renault", models: ["Kangoo E-Tech"] },
  {
    name: "Chevrolet",
    models: [
      "Spark EUV",
      "Captiva EV",
      "Captiva PHEV",
      "Equinox EV",
      "Blazer EV",
    ],
  },
  { name: "Jetour", models: ["T1 PHEV", "T2 PHEV", "G700 PHEV"] },
  { name: "Toyota", models: ["bZ4X", "RAV4 PHEV"] },
  { name: "Omoda", models: ["E5"] },
  { name: "Hyundai", models: ["Kona Electric", "Ioniq 5", "Ioniq 9"] },
  { name: "JMC / JMEV", models: ["JMEV 2", "JMEV 3", "JMEV GSE"] },
  {
    name: "GWM / Ora",
    models: ["ORA 5", "ORA 03", "Haval H6 PHEV", "Haval H6 GT PHEV"],
  },
  { name: "Riddara", models: ["RD6", "Horizon"] },
  { name: "MG", models: ["MGS5 EV", "MG4 EV"] },
  {
    name: "Changan",
    models: [
      "Lumin EV",
      "Eado Plus iDD",
      "CS55 Plus PHEV",
      "Q05 PHEV",
      "Hunter REEV",
    ],
  },
  {
    name: "Foton",
    models: ["E Wonder", "e-Tunland", "e-View Connect", "e-Toano Pro"],
  },
  { name: "Karry", models: ["KQ53 Furgón EV"] },
  { name: "Deepal", models: ["S5 EV/REEV", "S7 EV/REEV", "G318 REEV"] },
  { name: "Citroën", models: ["ë-Berlingo Van"] },
  { name: "Peugeot", models: ["E-Partner"] },
  {
    name: "BMW",
    models: [
      "i4",
      "i7",
      "iX",
      "iX1",
      "iX2",
      "iX3",
      "330e",
      "530e",
      "X1 xDrive25e",
      "X3 30e",
      "X5 xDrive50e",
    ],
  },
  { name: "Forthing", models: ["T5 Friday", "S7 EV"] },
  { name: "Victory", models: ["Furgón EV", "Pick Up EV"] },
  { name: "Wuling", models: ["Bingo S", "Binguo EV"] },
  {
    name: "JAC",
    models: ["e-S1", "Ytterby", "M3 EV", "RF8 PHEV", "Sunray EV"],
  },
  { name: "Soueast", models: ["S06 PHEV", "S08 PHEV"] },
  { name: "Jaecoo", models: ["5 EV", "6 EV", "7 PHEV"] },
  { name: "Jeep", models: ["Avenger Summit"] },
  { name: "Bestune", models: ["Xiaoma", "NAT", "Joy 03"] },
  { name: "DFSK", models: ["EC35 EV Van"] },
  { name: "Leapmotor", models: ["B10", "C10 EV/REEV", "C16 EV/REEV"] },
  {
    name: "Mercedes-Benz",
    models: ["EQA", "EQE", "EQS", "C 350e", "E 350e", "GLC 300e"],
  },
  { name: "Lynk & Co", models: ["02 EV", "01 PHEV", "08 PHEV"] },
  { name: "BAIC", models: ["EU5", "X55 REHEV", "BJ30e"] },
  {
    name: "Audi",
    models: [
      "Q6 e-tron",
      "Q6 Sportback e-tron",
      "A6 Sportback e-tron",
      "e-tron GT",
      "Q5 e-hybrid",
    ],
  },
  {
    name: "Maxus",
    models: ["eTerron 9", "eDeliver 3", "eDeliver 5", "eDeliver 9"],
  },
  { name: "Arcfox", models: ["T1", "T5", "αS5"] },
  { name: "Kia", models: ["EV3", "EV5"] },
  { name: "Farizon", models: ["V6E", "SuperVan"] },
  { name: "Hudson", models: ["eBuddy"] },
  { name: "Zeekr", models: ["001", "7X", "X"] },
  { name: "Smart", models: ["#1", "#3"] },
  { name: "Volvo", models: ["EX30", "XC40 Recharge", "XC60 Recharge"] },
  { name: "Land Rover", models: ["Velar P400e", "Defender 110 P400e"] },
  { name: "Xpeng", models: ["G6", "G9"] },
  { name: "Kaiyi", models: ["e-Qute 04"] },
  { name: "Mini", models: ["Aceman"] },
  { name: "Keyton", models: ["Q2 EV"] },
  { name: "Opel", models: ["Mokka-e"] },
  { name: "Avantier", models: ["EX"] },
  { name: "Maserati", models: ["Grecale Folgore"] },
  { name: "Avatr", models: ["07 REEV", "11"] },
  {
    name: "BAW",
    models: ["Pony EV", "E7 EV", "E7 Pro", "Truck", "MPV EV", "V70 EV"],
  },
  { name: "KGM", models: ["Torres EVX"] },
  { name: "XEV", models: ["Yoyo"] },
];

/** Las marcas en una frase ("Tesla, BYD… y XEV"), para el `{brands}` de la
 *  pregunta de compatibilidad del FAQ: asi la respuesta no se desfasa de la lista. */
export function brandList(locale: string) {
  return new Intl.ListFormat(locale, { type: "conjunction" }).format(
    COMPATIBILITY_DATA.map((brand) => brand.name),
  );
}
