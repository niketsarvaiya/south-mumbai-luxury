"use client";
import { useTheme, Theme } from "@/lib/theme";

const themes: { id: Theme; label: string; dot: string; desc: string }[] = [
  { id: "malabar", label: "Malabar", dot: "#C9A96E", desc: "Classic Gold" },
  { id: "bandra", label: "Bandra", dot: "#C8C8C8", desc: "Platinum" },
  { id: "worli",  label: "Worli",  dot: "#00C896", desc: "Emerald" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1.5">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={`${t.label} — ${t.desc}`}
          className="group relative flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200 hover:scale-110"
        >
          <span
            className="w-3 h-3 rounded-full block transition-all duration-200"
            style={{
              backgroundColor: t.dot,
              boxShadow: theme === t.id ? `0 0 0 2px ${t.dot}40, 0 0 8px ${t.dot}60` : "none",
              opacity: theme === t.id ? 1 : 0.45,
              transform: theme === t.id ? "scale(1.25)" : "scale(1)",
            }}
          />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-sans tracking-widest uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-warm-grey-300 pointer-events-none">
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
