type Props = {
  theme: "dark" | "light";
  onToggle: () => void;
};

function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 border border-border bg-surface text-text-dim text-[11px] tracking-[0.15em] uppercase px-3 py-1.5 hover:text-text hover:border-border-dim transition-colors cursor-pointer font-mono"
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

export default ThemeToggle;
