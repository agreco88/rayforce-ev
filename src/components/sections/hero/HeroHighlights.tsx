export function HeroHighlights() {
  return (
    <div className="grid grid-cols-4 gap-12 mt-20 justify-around">
      <HeroHighlight
        title="Ahorro inteligente."
        description="Optimizá el consumo energético y reducí costos frente a combustibles tradicionales."
      />

      <HeroHighlight
        title="Control total desde tu celular"
        description="Mayor velocidad de carga con control desde app para monitorear consumo, horarios y potencia."
      />

      <HeroHighlight
        title="Energía sustentable"
        description="Impulsá la movilidad eléctrica reduciendo emisiones y apostando a un futuro más limpio."
      />
      <HeroHighlight
        title="Regulación de potencia"
        description="La potencia de carga se puede regular para adaptarse a tu instalación eléctrica y evitar sobrecargas."
      />
    </div>
  );
}

function HeroHighlight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <h3
        className="
          text-lg font-medium 
          text-neutral-100
        "
      >
        {title}
      </h3>

      <p className="mt-2 text-sm max-w-sm text-pretty leading-relaxed tracking-tight text-neutral-400">
        {description}
      </p>
    </div>
  );
}
