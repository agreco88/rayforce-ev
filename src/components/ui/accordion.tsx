"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { motion } from "motion/react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

/**
 * Si el item esta abierto. Radix no lo expone, pero lo escribe como
 * `data-state` en el DOM: el item lo lee de ahi y lo publica para que
 * `AccordionContentAnimated` sepa hacia que variante animar.
 */
const AccordionItemOpenContext = React.createContext(false)

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const read = () => setIsOpen(node.getAttribute("data-state") === "open")
    read()

    const observer = new MutationObserver(read)
    observer.observe(node, { attributes: true, attributeFilter: ["data-state"] })
    return () => observer.disconnect()
  }, [])

  return (
    <AccordionItemOpenContext.Provider value={isOpen}>
      <AccordionPrimitive.Item
        ref={ref}
        data-slot="accordion-item"
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    </AccordionItemOpenContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

/**
 * Variante animada del contenido, para cuando hace falta `forceMount`: Radix
 * por defecto desmonta lo cerrado, y hay casos — specs de producto — donde el
 * contenido tiene que estar en el DOM aunque no se vea, para que lo indexe el
 * buscador y lo encuentre Ctrl+F.
 *
 * Montado siempre, `hidden` no sirve para ocultarlo (corta la animacion de
 * cierre de golpe), asi que anima de `height: 0` a `auto` y se despinta con
 * blur, que es el patron del ejemplo oficial de Radix + Motion.
 */
function AccordionContentAnimated({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const isOpen = React.useContext(AccordionItemOpenContext)

  return (
    <AccordionPrimitive.Content
      forceMount
      data-slot="accordion-content"
      asChild
      {...props}
    >
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            height: "auto",
            opacity: 1,
            visibility: "visible",
            transition: { type: "spring", bounce: 0.2, visualDuration: 0.35 },
          },
          // El cierre no va con spring: al asentarse asintoticamente los
          // ultimos pixeles se arrastran ~240ms despues de que el bloque ya
          // parece cerrado, y se ve como una desaceleracion rara.
          closed: {
            height: 0,
            opacity: 0,
            visibility: "hidden",
            transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
          },
        }}
        className="overflow-hidden text-sm"
      >
        <motion.div
          variants={{
            open: { filter: "blur(0px)" },
            closed: { filter: "blur(2px)" },
          }}
          className={cn("pt-0 pb-4", className)}
        >
          {children}
        </motion.div>
      </motion.div>
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionContentAnimated,
}
