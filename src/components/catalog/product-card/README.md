# ProductCard / ProductCollection

**Para mostrar productos en cualquier pagina, se usa esto.** No se arma una
card de producto nueva: se elige una variante, y si ninguna sirve, se agrega
una variante aca.

```tsx
const toCard = useChargerCardData();
const chargers = getChargerProducts().map(toCard);

<ProductCollection items={chargers} variant="row-3" />                     // lista
<ProductCollection items={chargers} variant="grid-1" />                    // grilla de 2
<ProductCollection items={chargers} variant="row-3" display="carousel" />  // carousel
<ProductCollection items={chargers} variant="row-3" gradient />            // gradiente en todas
<ProductCard {...chargers[0]} variant="row-3" />                           // una sola
```

**`gradient`** (por defecto `false`): solo el destacado va en gradiente (borde,
badge, divider, precio, acento del titulo, valores de specs); el resto pinta
ese texto solido en el primer stop del tema. Con `true`, gradiente en todas.

Tres decisiones, cada una en un solo lugar:

| Pregunta                  | Donde se decide                                            |
| ------------------------- | ---------------------------------------------------------- |
| ¿Que producto y que dice? | El adaptador: `useChargerCardData`                         |
| ¿Como se ve la card?      | `variant`: `"row-3"`, `"grid-1"`…                          |
| ¿Como se acomodan?        | `display` de `ProductCollection`: lista, grilla o carousel |

**En este proyecto (Rayforce) se usa `row-3` con el `gradient` por defecto**, lo que eligio el cliente. Las
demas quedan porque la card esta pensada para reusarse en otros proyectos.

## Variantes

Se nombran `familia-numero`. La familia dice la forma de la card y con eso el
`display` por defecto: `row` va en lista, `grid` en grilla de 2.

| Variante | Como se ve                                                                            | Titulo                                              | CTA                      |
| -------- | ------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| `row-1`  | Foto en caja al costado, texto al lado                                                | `fullTitle` + `titleAccent` en gradiente, minuscula | Chevron                  |
| `row-2`  | Foto + titulo/bullets arriba; precio grande y CTA abajo a todo el ancho               | `title` + `specs`, mayuscula                        | "Ver más info" + chevron |
| `row-3`  | Foto al ras del borde izquierdo a todo el alto, texto al lado                         | `title` + `specs`, mayuscula                        | Chevron                  |
| `grid-1` | Vertical: foto arriba con el badge adentro, modelo visible, impuesto abajo del precio | `fullTitle` + `titleAccent`, minuscula              | Chevron chico            |

## Datos (`ProductCardData`)

El adaptador llena **todos** los campos y cada variante usa los suyos. Por eso
cambiar de variante es cambiar un string: los datos no se tocan.

| Campo            |           |                                                                        |
| ---------------- | --------- | ---------------------------------------------------------------------- |
| `id`             | requerido | Unico en la lista (el slug).                                           |
| `title`          | requerido | Titulo corto, para las variantes con bullets.                          |
| `image`          | requerido | Se pinta en `contain` sobre un gradiente neutro.                       |
| `price`          | requerido | `{ currency, amount, taxLabel? }`                                      |
| `theme`          | requerido | Colores del producto: precio, bullets, chevron, borde del destacado.   |
| `href`           | opcional  | Sin `href` no navega ni muestra chevron (producto sin pagina todavia). |
| `fullTitle`      | opcional  | Titulo largo, para las variantes sin bullets. Si falta, usan `title`.  |
| `titleAccent`    | opcional  | Pegado al titulo largo, en gradiente (los kW).                         |
| `specs`          | opcional  | Bullets: un string, o `{ label, value }` con el valor en gradiente.    |
| `highlight`      | opcional  | Badge ("Más vendido"), borde con glow y divider en gradiente.          |
| `imageClassName` | opcional  | Fotos que no son recorte: `"object-cover object-[76%_50%]"`.           |
| `imageStyle`     | opcional  | Correccion de escala por producto.                                     |

**Otro tipo de producto** (cables, accesorios): un adaptador nuevo al lado de
`useChargerCardData`, que devuelve `ProductCardData`. Nada de la carpeta cambia.

## Archivos

```
product-card/
├── ProductCollection.tsx  ← varios productos: lista / grilla / carousel
├── ProductCard.tsx        ← una card: contenedor, link, borde, badge + catalogo VARIANTS
├── types.ts               ← ProductCardData
├── parts.tsx              ← piezas compartidas: AccentText, Photo, Title, SpecList, Divider, Price, Chevron
└── variants/
    ├── row/Row1.tsx, Row2.tsx, Row3.tsx
    └── grid/Grid1.tsx
```

- **`ProductCard`** pone lo que comparten todas: contenedor, `Link` (o `div`
  sin `href`), borde del destacado y badge. El objeto `VARIANTS` lista cada
  variante con su componente y lo poco que necesita distinto del contenedor.
- **Cada variante** es solo el interior y se lee de arriba abajo como la card
  en pantalla.
- **`parts.tsx`** son los bloques que se repiten. Traen su estilo fijo y
  reciben por `className` solo lo que cambia (tamaño, borde, margen).

## Agregar una variante

1. Copiar la mas parecida, por ejemplo `variants/grid/Grid1.tsx` →
   `Grid2.tsx`, y cambiar el layout. Usar las piezas de `parts.tsx`. Si una
   necesita otro estilo en una sola variante, escribirla inline ahi (como el
   titulo de `grid-1`), no agregarle opciones a la pieza.
2. Sumarla a `VARIANTS` en `ProductCard.tsx` con su `container` y `ribbon`.
   El tipo `ProductCardVariant` sale de ese objeto: no hay otra lista que
   actualizar.
3. Agregar la fila en la tabla de variantes de este README.

Una familia nueva (ej. `list-1`) cae en `display="list"` por defecto; si
necesita otro, se agrega en `ProductCollection`.

## Llevarla a otro proyecto

Copiar la carpeta y un adaptador. Depende de:

| Dependencia                                           | Para que                                                   | Reemplazo                                                             |
| ----------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `@/components/animated/GradientText`                  | Precio, `titleAccent`, valores de specs (via `AccentText`) | Cualquier span con `bg-clip-text`                                     |
| `@/components/shared/carousel/CardCarousel`           | `display="carousel"`                                       | Traerlo (Motion+ Carousel)                                            |
| `@/i18n/navigation` → `Link`                          | Link con locale (next-intl)                                | `next/link` si no hay i18n                                            |
| `ProductHighlightRibbon`, `getHighlightBorderStyle`   | Badge y borde del destacado                                | Traerlos (`../ProductHighlightRibbon.tsx`)                            |
| `CatalogTheme`, `PriceDefinition`, `ProductHighlight` | Tipos                                                      | Del tema usa `gradientColors`, `accentText`, `accentBg`, `glowStrong` |
| next-intl `Common.ProductCard.cta`                    | "Ver más info" (solo `row-2`)                              | Clave en los messages, o un string                                    |
| `next/image`, `lucide-react`, Tailwind v4             |                                                            |                                                                       |

Los colores (`neutral-800`, fondos de la foto) asumen un sitio oscuro.
