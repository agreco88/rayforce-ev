"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import { ProductCard } from "@/components/catalog/product-card/ProductCard";
import type { ProductCardData } from "@/components/catalog/product-card/types";
import { useCableCardData } from "@/components/catalog/product-card/adapters/useCableCardData";
import { useStandCardData } from "@/components/catalog/product-card/adapters/useStandCardData";
import { useChargerCardData } from "@/components/catalog/product-card/adapters/useChargerCardData";
import HeaderLogo from "./header-logo";
import { MobileMenuContact } from "./MobileMenuContact";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import {
  getCableProducts,
  getChargerProducts,
} from "@/lib/catalog/catalog.helpers";

interface DropdownItem {
  title: string;
  description: string;
  badge?: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  /** Solo en el menu mobile: la barra de desktop sigue con sus cuatro items. */
  mobileOnly?: boolean;
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

  const t = useTranslations("Layout.Header");
  const tNav = useTranslations("Layout.Header.nav");
  const toChargerCard = useChargerCardData();
  const toCableCard = useCableCardData();
  const column = useStandCardData();

  // El label traducido hace de id en todo el estado del nav (dropdown activo,
  // pin, acordeon mobile): es unico dentro de cada idioma.
  const chargersLabel = tNav("wallboxChargers");
  const accessoriesLabel = tNav("cables");

  /** Items del nav que renderizan la grilla de productos en vez de la lista simple. */
  const productPanels: Record<string, ProductCardData[]> = {
    [chargersLabel]: getChargerProducts().map(toChargerCard),
    [accessoriesLabel]: [...getCableProducts().map(toCableCard), column],
  };

  const navItems: NavItem[] = [
    {
      label: chargersLabel,
      dropdown: {
        title: t("panels.chargers.title"),
        // Rendered from `productPanels` instead of this list — see the panel below.
        items: [],
      },
    },
    {
      label: accessoriesLabel,
      dropdown: {
        title: t("panels.accessories.title"),
        // Rendered from `productPanels` instead of this list — see the panel below.
        items: [],
      },
    },
    {
      // Con `/` adelante, a diferencia del contacto: solo existe en la home.
      label: tNav("utePower"),
      href: "/#aumento-de-potencia",
      mobileOnly: true,
    },
    {
      label: tNav("companies"),
      href: "/empresas",
    },
    {
      // El contacto no es una ruta: vive como seccion del footer en todas las paginas.
      label: tNav("contact"),
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
        className="fixed inset-x-0 top-0 z-[100] w-full py-5 px-6 sm:px-8"
      >
        {/* El degradé va en capa propia para poder estirarlo debajo del header
            en mobile, donde la foto del hero llega hasta arriba y es clara */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-linear-to-b from-black via-black/60 to-transparent md:h-full md:via-black/50"
        />
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
              {navItems.filter((item) => !item.mobileOnly).map((item) =>
                // Items sin dropdown (Empresas, Contacto) son links directos:
                // mismo chip que los triggers, sin chevron ni panel.
                item.href ? (
                  // Links internos: sin fondo. El afford de link lo dan el
                  // chevron y un subrayado que crece en hover — animado con
                  // scaleX, que corre en el compositor.
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => {
                      scheduleClose();
                      setHoveredLink(item.label);
                    }}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={closeDropdown}
                    className="group flex items-center gap-1 px-3 h-10 text-sm tracking-tight font-medium text-neutral-300 hover:text-white transition-colors"
                  >
                    {/* El subrayado se mide contra el texto y no contra el
                        link: si no, cruzaba tambien el chevron. */}
                    <span className="relative">
                      {item.label}
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current"
                        initial={false}
                        animate={{ scaleX: hoveredLink === item.label ? 1 : 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </span>
                    {/* Contacto apunta abajo: baja al footer de esta misma
                        pagina, no navega a otra ruta. */}
                    {item.href.startsWith("#") ? (
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-y-0.5"
                      />
                    ) : (
                      <ChevronRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    )}
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
                          className={`text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 my-4 ${
                            productPanels[activeItem.label] ? "px-5" : "px-4"
                          }`}
                        >
                          {activeItem.dropdown.title}
                        </motion.div>

                        {productPanels[activeItem.label] ? (
                          // `motion.div` sin variants propias: un div comun
                          // cortaria la propagacion del stagger y las cards
                          // no lo heredarian. Cuatro columnas en 2xl aunque
                          // haya menos productos: a 50/50 se estiran.
                          <motion.div className="grid grid-cols-2 2xl:grid-cols-4 gap-4 px-5 pb-4 w-full">
                            {productPanels[activeItem.label].map((card) => (
                              <motion.div
                                key={card.id}
                                variants={panelChildVariants}
                              >
                                <ProductCard
                                  {...card}
                                  // En los cargadores el kW va pegado al
                                  // titulo: es el texto del link, suma para
                                  // SEO y desambigua los dos de 7kW.
                                  fullTitle={
                                    activeItem.label === chargersLabel
                                      ? t("panels.chargers.cardTitle", {
                                          title: card.fullTitle ?? card.title,
                                          power: card.titleAccent ?? "",
                                        })
                                      : card.fullTitle
                                  }
                                  variant={{
                                    base: "horizontal-4",
                                    "2xl": "vertical-3",
                                  }}
                                  onClick={closeDropdown}
                                />
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
          {/* Tercer bloque: en desktop no lleva accion — el CTA de contacto es
              el del cierre de pagina. Aca solo queda el menu mobile. */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Un solo boton abre y cierra, y el header queda arriba del panel:
                el logo y el toggle son los mismos y no se mueven al abrir */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setMobileExpandedItem(null);
              }}
              className="md:hidden px-4 h-10 text-neutral-200 hover:text-white transition-colors flex items-center gap-2"
              aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
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
            /* `z-[90]`, debajo del header (`z-[100]`): el logo y el toggle
               son los del header. `pt-20` es el alto del header (py-5 + h-10) */
            className="fixed inset-0 z-[90] flex flex-col bg-white pt-20 dark:bg-neutral-950 md:hidden"
          >
            {/* `flex-1 min-h-0` en vez de `h-[calc(100vh-240px)]`: el alto
                fijo no coincidia con el header ni con el footer reales, asi que
                el area de scroll terminaba antes de tiempo y debajo quedaba una
                franja del fondo del panel tapando las cards. Con el panel como
                columna flex, esta fila toma exactamente lo que sobra. */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto py-4 sm:py-6">
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
                                        ? "grid grid-cols-2 gap-3 px-4 pt-3 pb-4"
                                        : "space-y-1 px-2 pt-2 pb-3"
                                    }
                                  >
                                    {productPanels[item.label]
                                      ? productPanels[item.label].map(
                                          (card, idx) => (
                                            <motion.div
                                              key={card.id}
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
                                              <ProductCard
                                                {...card}
                                                variant="vertical-1"
                                                onClick={() => {
                                                  setIsMobileMenuOpen(false);
                                                  setMobileExpandedItem(null);
                                                }}
                                              />
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

              {/* `mt-auto`: con el menu corto el contacto baja al pie de la
                  pantalla. Misma regla que la fila de arriba con un acordeon. */}
              {mobileExpandedItem === null && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (navItems.length + 1) * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="mt-auto pt-10"
                >
                  <MobileMenuContact />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavigationScroll;
