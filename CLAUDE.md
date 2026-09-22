# rayforce-ev

## Dev server

Antes de correr `pnpm dev` (o cualquier variante de `next dev`), **siempre chequear primero si ya hay un servidor de este proyecto corriendo** y reusar ese puerto en vez de levantar uno nuevo.

Cómo chequear (Windows): buscar procesos `node.exe` escuchando en algún puerto cuyo command line apunte a este repo:

```bash
netstat -ano | findstr LISTENING
# para cada PID candidato:
powershell -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \"ProcessId=<PID>\").CommandLine"
```

Si el command line contiene la ruta de este repo (`rayforce-ev`), ese es el server activo — usar ese puerto para navegar/probar, **no** correr `pnpm dev` de nuevo.

Si no hay ninguno corriendo, recién ahí correr `pnpm dev` y usar el puerto que Next imprima en la consola (puede variar si otro proyecto ya tomó el 3000).

Nunca asumir "el puerto X está ocupado, uso otro" sin antes verificar si el que lo ocupa es este mismo proyecto.

## Estilo de componentes

La prioridad es que **un ser humano pueda leer el archivo y entenderlo**. Referencia de cómo tiene que quedar: `src/components/sections/home/hero/` (`HomeHeroSection` → `HomeHeroDesktop` / `HomeHeroMobile`, con `HomeHeroBackdrop` y `HomeHeroActions` extraídos).

### Componentizar sin over-engineer

El objetivo es mostrar la **estructura general del componente**: que un dev que abre el archivo mañana vea de una qué hay en pantalla. El padre se lee como un índice.

Extraer un child cuando saca ruido real del padre — un bloque visual con identidad propia (el fondo con sus overlays, el par de CTA), no cada `div`. Si solo se usa en un lugar y no saca complejidad, va inline.

Lo que **no** se abstrae: shadcn, Motion y las librerías en general. No hay que envolver `motion.div` ni los componentes de `ui/` en capas propias. Se usan directo.

La coreografía de animación (los `motion.div` con `variants`) se queda en el padre, junto al resto de los ítems de la cascada — así se lee entera en un solo lugar y los children quedan presentacionales.

### Comentarios

**Comentar solo los quirks y las decisiones no obvias de ese componente**, máximo una o dos líneas por elemento. Lo que un dev no puede deducir leyendo el código: por qué un gradiente está en 66%, por qué el h1 no se anima (es el LCP), por qué el color va acá y no en el child.

No comentar lo que el código ya dice (`{/* Description */}` arriba de un `<p>`). Si un comentario necesita párrafos, la conclusión va en una línea y el razonamiento largo va a un doc, no al archivo.

### Nada de código muerto

Variantes que ya no se usan, bloques comentados "por si vuelve", constantes de features desactivadas: se borran. Está todo en git. Un switch con dos opciones donde una nunca se eligió es una sola opción más un ternario que hay que leer al pedo.

## Traducciones

`messages/es.json` y `messages/en.json` tienen que poder leerse de corrido. Referencia de cómo queda: `HomePage.Hero`.

### Estructura

```
<Pagina>Page.<Seccion>.<clave>          ← el caso normal, compartido
<Pagina>Page.<Seccion>.mobile.<clave>   ← SOLO si mobile necesita copy propio
```

1. **Compartido por defecto, sin sufijo.** Si desktop y mobile dicen lo mismo, hay **una sola clave**. La variante mobile es la excepción y se ve como excepción.
2. **El namespace describe la página y la sección, no el componente.** Nada de `HomeHeroDesktopSection`: si el componente cambia de nombre, el JSON no se entera. El JSON dice *qué dice la página*.
3. **Sin `Home` adentro de `HomePage`** — el padre ya lo da. `HomePage.Stand`, no `HomePage.HomeStandSection`.
4. **Sin sufijo `Section`** — todos los hijos de una página son secciones.
5. **Nada de top-levels sueltos**: lo de una página cuelga de esa página.
6. **Lo compartido entre páginas va a `Common`.**

### Vocabulario de claves hoja

La misma cosa se llama igual en todos lados. Si ya tiene nombre acá, se usa ese:

| Clave | Es |
|---|---|
| `eyebrow` | El texto chico arriba del título |
| `title` | El encabezado de la sección |
| `subtitle` | El texto que acompaña al título (**no** `subheading`) |
| `description` | El párrafo que sigue al título |
| `cta` | El botón, cuando hay uno solo |
| `ctaPrimary` / `ctaSecondary` | Los botones, cuando hay par con jerarquía |
| `items` | Lista de bloques repetidos (cada uno con `title` + `description`) |
| `imageAlt` / `videoAlt` | Texto alternativo |
| `footnote` | La letra chica al pie |

### Lo que no se usa, desaparece

En la sección que se está tocando, **toda clave que no se renderice se borra**, junto con los componentes que la consumían si tampoco los monta nadie. Sin marcarla como inactiva ni conservarla por las dudas: está en git.

### Paridad en/es

Los dos archivos tienen que tener **exactamente** las mismas claves. Toda edición va en paralelo en los dos. Para verificar, aplanar ambos a dot-paths y comparar los sets — un renombre a medias rompe un idioma y no el otro, y eso no lo detecta `tsc`.
