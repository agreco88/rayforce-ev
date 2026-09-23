import type { Review } from "./GoogleReviewCard";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Rayforce+Uruguay#lrd=reviews";

/**
 * TODO(reviews): placeholder names/quotes/avatars until the real Google
 * Business reviews (and their individual review permalinks) are supplied.
 * Do not ship to production as-is.
 */
export const REVIEWS: Review[] = [
  {
    id: "review-1",
    name: "Martín Ferreira",
    initials: "MF",
    rating: 5,
    quote:
      "Instalación rápida y la app funciona diez puntos. El soporte respondió todas mis dudas antes de comprar.",
    color: "bg-sky-500/15 text-sky-300",
  },
  {
    id: "review-2",
    name: "Lucía Gómez",
    initials: "LG",
    rating: 5,
    quote:
      "Excelente atención de principio a fin. El cargador quedó impecable y la certificación URSEA me dio mucha tranquilidad.",
    color: "bg-cyan-500/15 text-cyan-300",
  },
  {
    id: "review-3",
    name: "Diego Bentancor",
    initials: "DB",
    rating: 5,
    quote:
      "Comparé varias opciones y esta fue la mejor relación precio-calidad. Recomendado para quien recién arranca con un eléctrico.",
    color: "bg-lime-500/15 text-lime-300",
  },
  {
    id: "review-4",
    name: "Valentina Rocha",
    initials: "VR",
    rating: 4,
    quote:
      "Muy conformes con la instalación trifásica. Coordinaron todo por WhatsApp y cumplieron los tiempos acordados.",
    color: "bg-green-500/15 text-green-300",
  },
  {
    id: "review-5",
    name: "Nicolás Suárez",
    initials: "NS",
    rating: 5,
    quote:
      "El monitoreo desde el celular es un golazo. Se nota que es un equipo pensado para uso real, no solo de vidriera.",
    color: "bg-sky-500/15 text-sky-300",
  },
  {
    id: "review-6",
    name: "Camila Etchart",
    initials: "CE",
    rating: 5,
    quote:
      "Desde la consulta inicial hasta el service post-venta, todo con respuestas claras y sin vueltas. Lo recomiendo sin dudar.",
    color: "bg-cyan-500/15 text-cyan-300",
  },
];
