"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "malabar" | "bandra" | "worli";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "malabar",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("malabar");

  useEffect(() => {
    const stored = localStorage.getItem("sml_theme") as Theme | null;
    if (stored && ["malabar", "bandra", "worli"].includes(stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("sml_theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
