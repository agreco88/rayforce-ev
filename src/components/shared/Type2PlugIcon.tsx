type Type2PlugIconProps = React.SVGProps<SVGSVGElement>;

export function Type2PlugIcon(props: Type2PlugIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* outer plug body */}
      <path d="M7 3h10a2 2 0 0 1 2 2v7a7 7 0 0 1-14 0V5a2 2 0 0 1 2-2Z" />

      {/* Type 2 connector face */}
      <circle cx="12" cy="9" r="4" />

      {/* pins */}
      <circle cx="10" cy="8" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="10.8" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="10.8" r="0.45" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.45" fill="currentColor" stroke="none" />

      {/* cable */}
      <path d="M12 19v3" />
    </svg>
  );
}
