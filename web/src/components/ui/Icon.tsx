/** Thin wrapper over Google's Material Symbols (loaded via <link> in the layout). */
export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined${className ? ` ${className}` : ""}`} aria-hidden="true">
      {name}
    </span>
  );
}
