type Props = {
  value: string;
  label: string;
  source: string;
};

export function StatCard({ value, label, source }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <span className="text-3xl font-bold text-green-400">{value}</span>

      <span className="text-sm text-neutral-400">{label}</span>

      <a
        href={source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-neutral-600 hover:text-green-400"
      >
        Fuente
      </a>
    </div>
  );
}
