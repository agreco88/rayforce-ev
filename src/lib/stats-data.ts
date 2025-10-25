export type StatItem = {
  key: string;
  value: number;
  suffix?: string; // optional suffix like %, +, kW, etc.
};

export const stats: StatItem[] = [
  { key: "dailyProduction", value: 500, suffix: "+" },
  { key: "exportCountries", value: 12, suffix: "+" },
  { key: "certifications", value: 8 },
  { key: "desserts", value: 99, suffix: "+" },
];
