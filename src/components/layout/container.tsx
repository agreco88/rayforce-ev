import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  padding?: "default" | "wide" | "none";
};

export default function Container({
  children,
  className,
  padding = "default",
}: ContainerProps) {
  const paddingClasses =
    padding === "none"
      ? "px-0"
      : padding === "wide"
      ? "px-6 sm:px-8 lg:px-12"
      : "px-4 sm:px-6 lg:px-8";

  return (
    <div className={clsx("mx-auto w-full", paddingClasses, className)}>
      {children}
    </div>
  );
}
