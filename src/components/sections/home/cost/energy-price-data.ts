/**
 * Precios de energía en Uruguay, un valor por año.
 *
 * Fuentes:
 * - ANCAP, histórico de precios de combustibles (nafta súper 95).
 * - UTE, pliego tarifario residencial simple (escalón 101-600 kWh).
 *
 * Las dos gráficas de la sección leen de acá, así actualizar un año
 * es tocar un solo array.
 */
export const YEARS = [
  2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
] as const;

/** Nafta súper 95, pesos por litro. */
export const NAFTA_PRICES = [
  43.9, 45.9, 50.4, 54.95, 56.6, 65.81, 74.3, 76.5, 77.54, 78.54, 88.67,
];

/** Tarifa residencial simple UTE, pesos por kWh. */
export const UTE_PRICES = [
  5.517, 5.79, 6.06, 6.3, 6.51, 6.71, 7.24, 7.958, 8.16, 8.28, 8.45,
];

export const NAFTA_COLOR = "#f87171"; // red-400
export const UTE_COLOR = "#4ade80"; // green-400

/** Variación acumulada, en %, del primer año hasta `index`. */
export const changeUpTo = (series: number[], index: number) =>
  ((series[index] - series[0]) / series[0]) * 100;

/** Variación total de la serie, en %, del primer año al último. */
export const totalChange = (series: number[]) =>
  changeUpTo(series, series.length - 1);

/** Techo común del eje Y: fija las dos gráficas a la misma escala. */
export const Y_MAX = 100;
