"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useLocale, useTranslations } from "next-intl";

import { GradientText } from "@/components/animated/GradientText";
import {
  ProductHighlightRibbon,
  getHighlightBorderStyle,
} from "@/components/catalog/ProductHighlightRibbon";
import HeaderLogo from "./header-logo";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { CHIP_WHATSAPP_CLASS } from "./nav-chip";
import { Link } from "@/i18n/navigation";
import {
  getCableProducts,
  getCatalogPowerLabel,
  getChargerProducts,
  getPowerLabel,
} from "@/lib/catalog/catalog.helpers";
import type { CatalogProduct } from "@/lib/catalog/catalog.types";

/** Mirrors ChargersCardGrid's map — the catalog's heroImage is not the card photo. */
const PRODUCT_IMAGES: Record<string, string> = {
  "bs20-bc-7kw": "/assets/images/chargers/BS20-7KW.png",
  "bs20-ba-7kw": "/assets/images/chargers/BS20-7KW-SOCKET.png",
  "bs20-bc-11kw": "/assets/images/chargers/BS20-7KW.png",
  "bs20-bc-22kw": "/assets/images/chargers/BS20-22KW.png",
};

interface DropdownItem {
  title: string;
  description: string;
  badge?: string;
  href: string;
}

/** Card de producto del panel ancho: sirve tanto para cargadores como para cables. */
interface ProductPanelItem {
  slug: string;
  image: string;
  title: string;
  /** El titulo sin la potencia concatenada; el acordeon mobile la pinta aparte. */
  baseTitle: string;
  description: string;
  power: string;
  modelCode: string;
  price: number;
  accentText: string;
  gradientColors: readonly [string, string, string];
  product: CatalogProduct;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: {
    title: string;
    items: DropdownItem[];
  };
}

export function NavigationScroll() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  /** El header se va hacia arriba al bajar y vuelve al subir. Patron tomado
   *  del ejemplo oficial "Scroll Direction: Hide Header" de Motion
   *  (https://examples.motion.dev/react/scroll-hide-header, MotionScore S). */
  const [hidden, setHidden] = useState(false);
  /** Item del nav sobre el que esta el mouse: alimenta el subrayado animado
   *  de los links internos. */
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  /** Item fijado con click: sobrevive al mouseleave hasta que se scrollee,
   *  se clickee afuera o se apriete Escape. */
  const [pinnedDropdown, setPinnedDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null);
  /** Un ref por trigger: el panel angosto (Enterprise/Customers) se alinea con
   *  el boton que lo abrio. El panel ancho de productos ocupa todo el nav y no
   *  necesita offset. */
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  /** Contenedor `relative` del nav: origen de coordenadas del panel. */
  const panelAnchorRef = useRef<HTMLDivElement>(null);
  const [panelOffset, setPanelOffset] = useState(0);
  /** Signo del desplazamiento entre paneles: +1 si el nuevo item esta a la
   *  derecha del anterior, -1 si esta a la izquierda. Alimenta las variants
   *  para que el contenido entre y salga hacia el lado que corresponde. */
  const [direction, setDirection] = useState(0);
  const prevIndexRef = useRef(-1);

  /** Salir de un trigger no cierra al instante: se agenda. Si el mouse cae en
   *  otro trigger (o vuelve al panel) dentro de esta ventana, el cierre se
   *  cancela y el shell nunca se desmonta — solo se intercambia el contenido.
   *  Sin esto, `activeDropdown` pasa por null entre item e item y el shell
   *  hace un exit/enter completo, que es el parpadeo. */
  const CLOSE_DELAY_MS = 120;
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  /** Abre un panel calculando de que lado viene respecto del que estaba. */
  const openDropdown = (label: string) => {
    cancelScheduledClose();
    const nextIndex = navItems.findIndex((navItem) => navItem.label === label);
    if (prevIndexRef.current !== -1 && nextIndex !== prevIndexRef.current) {
      setDirection(nextIndex > prevIndexRef.current ? 1 : -1);
    }
    prevIndexRef.current = nextIndex;
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    cancelScheduledClose();
    setPinnedDropdown(null);
    setActiveDropdown(null);
    prevIndexRef.current = -1;
  };

  /** Cierre diferido: lo cancela cualquier apertura dentro de la ventana. */
  const scheduleClose = () => {
    cancelScheduledClose();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setActiveDropdown(null);
      prevIndexRef.current = -1;
    }, CLOSE_DELAY_MS);
  };

  // No dejar un timer vivo si el componente se desmonta antes de que dispare.
  useEffect(() => cancelScheduledClose, []);

  // Con el menu mobile abierto el fondo no scrollea.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  // Con un panel fijado: cerrar al scrollear, al clickear afuera y con Escape.
  useEffect(() => {
    if (!pinnedDropdown) return;

    const onScroll = () => closeDropdown();
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeDropdown();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pinnedDropdown]);

  /** Direccion del scroll: bajando esconde, subiendo muestra. El umbral de
   *  150px evita que el header parpadee con el rebote del top. */
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    // Con un panel desplegado o el menu mobile abierto el header queda quieto:
    // esconderlo se llevaria el panel puesto.
    if (activeDropdown || isMobileMenuOpen) {
      setHidden(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 150);
  });

  const t = useTranslations("HomePage.HomeChargersSection");
  const tCables = useTranslations("CablesPage.ProductCard");
  const tCableShop = useTranslations("CablesPage.ShopCard");
  const tNav = useTranslations("Layout.Header.nav");
  const locale = useLocale();
  const chargers = getChargerProducts();
  const cables = getCableProducts();

  /** Real catalog products, rendered as thumb + title + blurb cards. */
  const chargerItems = chargers.map((product) => {
    const power = getPowerLabel(product, locale);

    return {
      slug: product.slug,
      image: PRODUCT_IMAGES[product.slug],
      // La potencia se agrega acá y no en los mensajes: el mismo `title` lo
      // comparten la grilla, el carrusel y las tablas de comparación, donde
      // el kW ya aparece por separado. Acá es el texto del link, así que
      // suma para SEO y desambigua los dos modelos de 7kW.
      title: `${t(`chargers.${product.slug}.title`)} de ${power}`,
      // El mismo titulo sin la potencia pegada. El acordeon mobile la pinta
      // aparte, al final de la linea: concatenada quedaba dos veces en la
      // misma card (una en el titulo, otra en el bloque de kW).
      baseTitle: t(`chargers.${product.slug}.title`),
      description: t(`chargers.${product.slug}.blurb`),
      power,
      modelCode: product.modelCode,
      price: product.price.amount,
      accentText: product.theme.accentText,
      gradientColors: product.theme.gradientColors,
      // El producto entero viaja con el item para que la card lea `highlight`.
      product,
      href: `/cargadores/${product.slug}`,
    };
  });

  /** Cables del catalogo, con la misma forma de card que los cargadores. */
  const cableItems = cables.map((product) => ({
    slug: product.slug,
    // A diferencia de los cargadores, el heroImage del catalogo si es la foto.
    image: product.heroImage,
    // Mismo titulo largo que el <h3> de las cards de /cables, en vez del label
    // corto ("Cable 7kW"): el panel muestra tipo + potencia + fase completos.
    title: tCableShop(
      `type.${product.specs.cableStyle}.${product.specs.phaseType ?? "single"}`,
      { power: product.specs.maxPowerKw ?? 7 },
    ),
    // Los cables no concatenan la potencia, asi que el titulo del acordeon es
    // el mismo — el campo existe para que las dos listas compartan forma.
    baseTitle: tCableShop(
      `type.${product.specs.cableStyle}.${product.specs.phaseType ?? "single"}`,
      { power: product.specs.maxPowerKw ?? 7 },
    ),
    description: tCables(`variants.${product.slug}.description`),
    power: getCatalogPowerLabel(product, locale),
    modelCode: product.modelCode,
    price: product.price.amount,
    accentText: product.theme.accentText,
    gradientColors: product.theme.gradientColors,
    product,
    href: `/cables/${product.slug}`,
  }));

  /** Items del nav que renderizan la grilla de productos en vez de la lista simple. */
  const productPanels: Record<string, ProductPanelItem[]> = {
    "Cargadores Wallbox": chargerItems,
    Accesorios: cableItems,
  };

  const navItems: NavItem[] = [
    {
      label: "Cargadores Wallbox",
      dropdown: {
        title: "LINEA DE CARGADORES WALLBOX BESEN BS20",
        // Rendered from `chargerItems` instead of this list — see the panel below.
        items: [],
      },
    },
    {
      label: "Accesorios",
      dropdown: {
        title: "CABLES DE CARGA RAYFORCE",
        // Rendered from `cableItems` instead of this list — see the panel below.
        items: [],
      },
    },
    {
      label: "Empresas",
      href: "/empresas",
    },
    {
      // El contacto no es una ruta: vive como seccion del footer en todas las paginas.
      label: "Contacto",
      href: "#contacto",
    },
  ];

  // El panel vive fuera del map, asi que para el dropdown angosto hay que
  // correrlo hasta su trigger a mano.
  useEffect(() => {
    if (!activeDropdown) return;
    const trigger = triggerRefs.current[activeDropdown];
    const anchor = panelAnchorRef.current;
    if (!trigger || !anchor) return;
    setPanelOffset(
      trigger.getBoundingClientRect().left -
        anchor.getBoundingClientRect().left,
    );
  }, [activeDropdown]);

  /** El item cuyo panel esta visible. Un solo panel para todos los triggers. */
  const activeItem = navItems.find(
    (
      navItem,
    ): navItem is NavItem & { dropdown: NonNullable<NavItem["dropdown"]> } =>
      navItem.label === activeDropdown && navItem.dropdown != null,
  );

  /** Cada card sube un toque al entrar. Hereda el escalonado del panel via
   *  `staggerChildren`, y no define `exit`: al salir se va con el bloque
   *  entero, que es lo que evita que el contenido se desarme de a pedazos. */
  const panelChildVariants = {
    enter: { opacity: 0, y: 8 },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  /** Slide direccional del contenido dentro del panel compartido. El signo lo
   *  pone `direction`, asi el panel entrante viene del lado del trigger nuevo. */
  const panelContentVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.22,
        ease: [0.4, 0, 0.2, 1] as const,
        // Las cards entran escalonadas junto con el panel, no despues: sin
        // `when: "beforeChildren"` arrancan en paralelo al fade del bloque.
        // El fondo ya no depende de ellas, asi que aunque tarden no se ve
        // nada por atras.
        staggerChildren: 0.1,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * -24,
      transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
    }),
  };

  return (
    <>
      {/* El header se posiciona a si mismo (antes lo hacia base-layout con un
          div fijo). Tiene que ser el elemento animado para que el `y` se
          aplique sobre el backdrop tambien. */}
      <motion.header
        ref={navRef}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-[100] w-full py-5 px-4 sm:px-6 lg:px-16 2xl:px-0 bg-linear-to-b from-black via-black/50 to-transparent"
      >
        <div
          ref={panelAnchorRef}
          className="relative max-w-[1440px] mx-auto w-full flex items-center justify-between gap-8"
        >
          {/* Tres bloques: logo | nav centrado | contacto. El del medio toma
              el espacio sobrante para quedar centrado respecto del header. */}
          <div className="flex items-center shrink-0">
            <HeaderLogo />
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center gap-1">
              {navItems.map((item) =>
                // Items sin dropdown (Empresas, Contacto) son links directos:
                // mismo chip que los triggers, sin chevron ni panel.
                item.href ? (
                  // Links internos: sin fondo. El afford de link lo da el
                  // chevron `>` y un subrayado que crece en hover — animado
                  // con scaleX, que corre en el compositor.
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => {
                      scheduleClose();
                      setHoveredLink(item.label);
                    }}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={closeDropdown}
                    className="group relative flex items-center gap-1 px-3 h-10 text-sm tracking-tight font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.label}
                    <ChevronRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    <motion.span
                      aria-hidden="true"
                      className="absolute bottom-2 left-3 right-3 h-px origin-left bg-current"
                      initial={false}
                      animate={{ scaleX: hoveredLink === item.label ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </Link>
                ) : (
                  <div
                    key={item.label}
                    onMouseEnter={() => {
                      openDropdown(item.label);
                      // Pasar el mouse por otro item suelta el pin anterior.
                      if (pinnedDropdown && pinnedDropdown !== item.label) {
                        setPinnedDropdown(null);
                      }
                    }}
                    // Un panel fijado con click no se cierra al salir con el mouse.
                    // El resto agenda el cierre en vez de aplicarlo, para que
                    // pasar a otro trigger no desmonte el shell.
                    onMouseLeave={() => {
                      if (pinnedDropdown !== item.label) scheduleClose();
                    }}
                  >
                    <button
                      ref={(node) => {
                        triggerRefs.current[item.label] = node;
                      }}
                      onClick={() => {
                        if (pinnedDropdown === item.label) {
                          closeDropdown();
                          return;
                        }
                        setPinnedDropdown(item.label);
                        openDropdown(item.label);
                      }}
                      // Sin fondo y sin subrayado: el unico afford es el
                      // chevron que rota. El estado abierto se marca con el
                      // color del texto.
                      className={`flex items-center gap-1.5 px-3 h-10 transition-colors text-sm tracking-tight font-medium ${
                        activeDropdown === item.label
                          ? "text-white"
                          : "text-neutral-300 hover:text-white"
                      }`}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}

                      {/* Chevron: abajo cerrado, arriba abierto */}
                      <motion.span
                        className="inline-flex"
                        animate={{
                          rotate: activeDropdown === item.label ? 180 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      >
                        <ChevronDown size={14} />
                      </motion.span>
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Panel compartido: se monta una sola vez y el contenido hace
                crossfade adentro. Antes habia un AnimatePresence por item, asi
                que pasar rapido de un trigger a otro desmontaba un panel y
                montaba el siguiente — de ahi el parpadeo. Patron tomado de la
                seccion "Navigation: Mega menu" de Motion UI. */}
          <AnimatePresence>
            {activeItem && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute top-full pt-2 z-50 ${
                  productPanels[activeItem.label] ? "left-0 right-0" : ""
                }`}
                // El panel angosto se corre hasta su trigger. Va en `left` y
                // no en `transform` para no pisar el `y` de la animacion.
                style={
                  productPanels[activeItem.label]
                    ? undefined
                    : { left: panelOffset }
                }
                // Entrar al panel cancela el cierre agendado al salir del
                // trigger, asi se puede cruzar el gap sin que se cierre.
                onMouseEnter={cancelScheduledClose}
                onMouseLeave={() => {
                  if (pinnedDropdown !== activeItem.label) scheduleClose();
                }}
              >
                {/* El fondo, el borde y la sombra viven en este contenedor,
                        que no se desmonta al cambiar de item. Antes estaban
                        adentro del bloque que se intercambia, asi que durante
                        el swap se iban con el saliente y se veia el hero. */}
                <div
                  className={`relative overflow-hidden bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl py-2 ${
                    productPanels[activeItem.label] ? "w-full" : "min-w-[500px]"
                  }`}
                >
                  {/* Solo el contenido se intercambia, con slide hacia el
                          lado del que viene. Entrante y saliente se apilan en
                          la misma celda del grid para hacer crossfade sin que
                          uno empuje al otro. */}
                  <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={activeItem.label}
                        custom={direction}
                        variants={panelContentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        {/* El heading tambien entra en el escalonado, asi
                                la secuencia arranca por el titulo. */}
                        <motion.div
                          variants={panelChildVariants}
                          className={`text-xs font-medium tracking-widest text-neutral-400 dark:text-neutral-500 my-4 ${
                            productPanels[activeItem.label] ? "px-5" : "px-4"
                          }`}
                        >
                          {activeItem.dropdown.title}
                        </motion.div>

                        {productPanels[activeItem.label] ? (
                          // `motion.div` sin variants propias: un div comun
                          // cortaria la propagacion del stagger y las cards
                          // no lo heredarian.
                          <motion.div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 px-5 pb-4 w-full">
                            {productPanels[activeItem.label].map((charger) => (
                              <motion.div
                                key={charger.slug}
                                variants={panelChildVariants}
                              >
                                <Link
                                  href={charger.href}
                                  onClick={closeDropdown}
                                  className="group flex 2xl:flex-col gap-5 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors h-full"
                                  style={getHighlightBorderStyle(
                                    charger.product,
                                  )}
                                >
                                  {/* Thumb — square plate */}
                                  <div className="relative shrink-0 w-44 2xl:w-full aspect-square rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                    <ProductHighlightRibbon
                                      product={charger.product}
                                      className="right-2 top-2"
                                    />
                                    <Image
                                      src={charger.image}
                                      alt=""
                                      width={352}
                                      height={352}
                                      className="h-full w-full object-contain"
                                    />
                                  </div>

                                  {/* Info */}
                                  <div className="min-w-0 flex-1 flex flex-col">
                                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                      {charger.modelCode}
                                    </span>

                                    {/* Alto mínimo en líneas para que los kW arranquen a la
                                        misma altura en todas las tarjetas */}
                                    <h3 className="mt-2 min-h-[2.5rem] 2xl:min-h-[3.25rem] text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
                                      {charger.title}
                                    </h3>

                                    {/* Power — big, under the title */}
                                    <GradientText
                                      colors={charger.gradientColors}
                                      className="text-4xl font-thin tracking-tight"
                                    >
                                      {charger.power}
                                    </GradientText>

                                    <p className="mt-2 mb-2 min-h-[2.5rem] 2xl:min-h-[3.75rem] max-w-xs text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                      {charger.description}
                                    </p>

                                    {/* Price + CTA */}
                                    <div className="mt-auto pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
                                      <GradientText
                                        colors={charger.gradientColors}
                                        className="text-2xl font-thin tracking-tighter"
                                      >
                                        USD {charger.price}
                                      </GradientText>

                                      <span
                                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${charger.accentText}`}
                                        aria-hidden="true"
                                      >
                                        Más información
                                        <ArrowRight
                                          size={14}
                                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div className="grid grid-cols-2 gap-3 px-2">
                            {activeItem.dropdown.items.map(
                              (dropdownItem, idx) => (
                                <motion.a
                                  key={idx}
                                  href={dropdownItem.href}
                                  variants={panelChildVariants}
                                  className="group p-3 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                                      {dropdownItem.title}
                                    </h3>
                                    {dropdownItem.badge && (
                                      <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                                        {dropdownItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {dropdownItem.description}
                                  </p>
                                </motion.a>
                              ),
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Tercer bloque: la unica accion destacada de la fila. */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppHref(tNav("quoteCtaMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDropdown}
              className={`hidden md:flex ${CHIP_WHATSAPP_CLASS}`}
            >
              <FaWhatsapp className="size-4" />
              {tNav("quoteCta")}
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden px-4 h-10 text-neutral-200 hover:text-white transition-colors flex items-center gap-2"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            /* `z-[110]`, por encima del header (`z-[100]`). Con `z-50` el
               header quedaba arriba del panel abierto: su caja fija ocupa la
               misma franja superior que la X, asi que el tap de cerrar lo
               interceptaba el boton de abrir que hay debajo — que llama a
               `setIsMobileMenuOpen(true)` sobre un menu ya abierto. De ahi que
               el menu "no cerrara". */
            className="fixed inset-0 z-[110] flex flex-col bg-white dark:bg-neutral-950 md:hidden"
          >
            <div className="flex shrink-0 items-center justify-between py-6 px-4">
              <HeaderLogo />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setMobileExpandedItem(null);
                }}
                className="flex items-center gap-2 px-4 h-10 bg-neutral-200 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-md text-sm font-medium text-neutral-900 dark:text-neutral-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* `flex-1 min-h-0` en vez de `h-[calc(100vh-240px)]`: el alto
                fijo no coincidia con el header ni con el footer reales, asi que
                el area de scroll terminaba antes de tiempo y debajo quedaba una
                franja del fondo del panel tapando las cards. Con el panel como
                columna flex, esta fila toma exactamente lo que sobra. */}
            <div className="min-h-0 flex-1 overflow-y-auto py-4 sm:py-6">
              <nav className="space-y-2">
                {/* Con un acordeon abierto quedan los items ANTERIORES (cerrados)
                    mas el activo, y se ocultan los posteriores.

                    Ocultar tambien los de arriba hacia que el trigger activo
                    saltara al tope del panel al abrirse: el dedo lo toca en una
                    posicion y el contenido aparece en otra. Dejandolos, el
                    trigger no se mueve de donde estaba y el panel crece hacia
                    abajo, que es donde ya no hay nada que desplazar. Los
                    posteriores si se van: con cards de ~1400px caian fuera de
                    pantalla igual. */}
                {navItems
                  .filter((_item, itemIndex) => {
                    if (mobileExpandedItem === null) return true;
                    const expandedIndex = navItems.findIndex(
                      (navItem) => navItem.label === mobileExpandedItem,
                    );
                    return itemIndex <= expandedIndex;
                  })
                  .map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setMobileExpandedItem(null);
                        }}
                        className="w-full flex items-center px-4 py-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-left transition-colors font-medium text-neutral-900 dark:text-neutral-100"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpandedItem(
                              mobileExpandedItem === item.label
                                ? null
                                : item.label,
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-left transition-colors"
                        >
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">
                            {item.label}
                          </span>
                          <motion.div
                            animate={{
                              rotate:
                                mobileExpandedItem === item.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileExpandedItem === item.label &&
                            item.dropdown && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.2,
                                  ease: [0.4, 0, 0.2, 1],
                                }}
                                className="overflow-hidden"
                              >
                                {/* 2x2 cuando son cards de producto: apiladas
                                    de a una, cuatro cards con plancha de 160px
                                    dan ~1400px de acordeon y el item siguiente
                                    del nav queda fuera de pantalla. La lista
                                    simple (sin panel de productos) sigue en
                                    una columna: son titulo + descripcion, no
                                    entran de a dos. */}
                                <div
                                  className={
                                    productPanels[item.label]
                                      ? "grid grid-cols-2 gap-2 px-2 pt-2 pb-3"
                                      : "space-y-1 px-2 pt-2 pb-3"
                                  }
                                >
                                  {productPanels[item.label]
                                    ? productPanels[item.label].map(
                                        (charger, idx) => (
                                          <motion.div
                                            key={charger.slug}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              duration: 0.2,
                                              delay: idx * 0.03,
                                            }}
                                            /* `h-full` para que el `h-full` de
                                               la card resuelva contra el alto
                                               de la fila: sin esto cada card
                                               mide su contenido y las dos de
                                               una fila quedan desparejas. */
                                            className="h-full"
                                          >
                                            <Link
                                              href={charger.href}
                                              onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                setMobileExpandedItem(null);
                                              }}
                                              /* Apilada, no en fila: la card
                                                 mide ~280px y el thumb de
                                                 96px le dejaba al titulo solo
                                                 ~160px, que es lo que lo
                                                 empujaba a 4 lineas — y ese
                                                 alto era el que estiraba la
                                                 plancha. Arriba y a todo el
                                                 ancho, la foto respira y el
                                                 titulo entra en 2 lineas. */
                                              className="flex h-full flex-col gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
                                              style={getHighlightBorderStyle(
                                                charger.product,
                                              )}
                                            >
                                              {/* Alto fijo en vez de
                                                  `aspect-square`: a todo el
                                                  ancho, cuadrada daria ~280px
                                                  de plancha para un item de
                                                  acordeon que ya viene
                                                  acompaniado de titulo, kW,
                                                  blurb y precio. 160px alcanza
                                                  para leer el producto sin
                                                  comerse la lista. */}
                                              <div className="relative h-40 w-full shrink-0 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                                                <ProductHighlightRibbon
                                                  product={charger.product}
                                                  className="right-2 top-2 px-1.5 py-0.5 text-[8px]"
                                                />
                                                <Image
                                                  src={charger.image}
                                                  alt=""
                                                  width={320}
                                                  height={320}
                                                  className="h-full w-full object-contain"
                                                />
                                              </div>
                                              <div className="flex min-w-0 flex-col">
                                                <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                                  {charger.modelCode}
                                                </span>
                                                {/* `normal-case` explicito: el
                                                    `h3` de `globals.css:153`
                                                    aplica `uppercase` a todos
                                                    los h3 del sitio. En
                                                    versalitas y a 175px de
                                                    ancho, "WALLBOX RESIDENCIAL
                                                    MONOFASICO CON CABLE
                                                    INTEGRADO" son 4 lineas de
                                                    bloque solido: el ojo
                                                    pierde la forma de cada
                                                    palabra y no hay donde
                                                    engancharse.

                                                    Sin versalitas el texto se
                                                    lee de un saque, asi que
                                                    entra a `text-xs` sin
                                                    perder legibilidad. */}
                                                {/* La potencia cierra la misma
                                                    linea en vez de ocupar su
                                                    propio bloque de 3xl. El
                                                    gradiente ya la despega de
                                                    todo lo demas; el tamaño
                                                    grande encima la hacia
                                                    pelear con el titulo por
                                                    ser lo primero que se mira,
                                                    y ademas repetia los kW que
                                                    el titulo ya traia pegados
                                                    (por eso `baseTitle`). */}
                                                {/* `text-[13px]` + `leading-relaxed`
                                                    + `py-1`: a `text-xs` justo
                                                    y con las lineas pegadas el
                                                    titulo se leia apretado.
                                                    Medio punto mas de cuerpo y
                                                    aire entre lineas alcanzan
                                                    sin sumar una linea mas. */}
                                                <h3 className="mt-1 py-1 text-[13px] font-medium normal-case tracking-tight text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                                  {charger.baseTitle}{" "}
                                                  <GradientText
                                                    colors={
                                                      charger.gradientColors
                                                    }
                                                    className="font-semibold whitespace-nowrap"
                                                  >
                                                    {charger.power}
                                                  </GradientText>
                                                </h3>
                                                {/* Sin blurb: a 143px de
                                                    contenido util son 5-6
                                                    lineas de texto chico por
                                                    card, que en un menu es mas
                                                    de lo que nadie lee. El
                                                    detalle esta en la pagina
                                                    del producto.

                                                    Precio y chevron vuelven a
                                                    una fila: sin el texto
                                                    "Mas informacion" entran
                                                    holgados. El chevron dice
                                                    lo mismo — la card entera
                                                    ya es un link — y no se
                                                    come el ancho.

                                                    Precio en color plano: con
                                                    la potencia ya pintada en
                                                    el titulo, un segundo
                                                    gradiente en la misma card
                                                    le saca fuerza al primero. */}
                                                <div className="mt-auto flex items-end justify-between gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-3">
                                                  {/* El precio vuelve al
                                                      gradiente y sube a `xl`:
                                                      es el dato que cierra la
                                                      decision. El "IVA Inc."
                                                      sale del catalogo
                                                      (`price.taxLabel`), no
                                                      hardcodeado — los siete
                                                      productos ya lo traen. */}
                                                  <span className="flex min-w-0 flex-col">
                                                    <GradientText
                                                      colors={
                                                        charger.gradientColors
                                                      }
                                                      className="text-xl font-light tracking-tight"
                                                    >
                                                      USD {charger.price}
                                                    </GradientText>
                                                    {charger.product.price
                                                      .taxLabel && (
                                                      <span className="text-[10px] font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
                                                        {
                                                          charger.product.price
                                                            .taxLabel
                                                        }
                                                      </span>
                                                    )}
                                                  </span>
                                                  {/* `self-center`: con el IVA
                                                      debajo del precio, el
                                                      `items-end` del contenedor
                                                      dejaba el chevron a la
                                                      altura de la letra chica
                                                      en vez de la del precio. */}
                                                  <span
                                                    className={`inline-flex size-6 shrink-0 self-center items-center justify-center rounded-full border border-current/20 ${charger.accentText}`}
                                                    aria-hidden="true"
                                                  >
                                                    <ChevronRight size={14} />
                                                  </span>
                                                </div>
                                              </div>
                                            </Link>
                                          </motion.div>
                                        ),
                                      )
                                    : item.dropdown.items.map(
                                        (dropdownItem, idx) => (
                                          <motion.a
                                            key={idx}
                                            href={dropdownItem.href}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              duration: 0.2,
                                              delay: idx * 0.03,
                                            }}
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              setMobileExpandedItem(null);
                                            }}
                                            className="block p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                          >
                                            <div className="flex items-center gap-2 mb-1">
                                              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {dropdownItem.title}
                                              </h3>
                                              {dropdownItem.badge && (
                                                <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                                                  {dropdownItem.badge}
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                              {dropdownItem.description}
                                            </p>
                                          </motion.a>
                                        ),
                                      )}
                                </div>
                              </motion.div>
                            )}
                        </AnimatePresence>
                      </>
                    )}
                  </motion.div>
                ))}

                {/* "Cotizar instalacion" como una fila mas del nav en vez de un
                    footer fijo: el footer se comia alto del area de scroll y
                    tapaba la ultima fila de cards. Sigue la misma regla que los
                    demas items — con un acordeon abierto no se muestra. */}
                {mobileExpandedItem === null && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: navItems.length * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <a
                      href={buildWhatsAppHref(tNav("quoteCtaMessage"))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-left transition-colors font-medium text-neutral-900 dark:text-neutral-100"
                    >
                      <FaWhatsapp className="size-4 text-[#25D366]" />
                      {tNav("quoteCta")}
                    </a>
                  </motion.div>
                )}
              </nav>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavigationScroll;
