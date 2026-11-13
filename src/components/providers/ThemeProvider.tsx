"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";
export type PagePalette = "paper" | "green" | "gold" | "dark";
const PALETTE_TONE: Record<PagePalette, Theme> = {
  paper: "light",
  green: "dark",
  gold: "light",
  dark: "dark",
};

interface ThemeContextType {
  theme: Theme;
  preferredTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  pagePalette: PagePalette | null;
  setPagePalette: (palette: PagePalette | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "focustv-theme";

const emptySubscribe = () => () => {};

function getClientTheme(): Theme {
  if (typeof window !== "undefined") {
    const currentTheme = document.documentElement.getAttribute("data-theme") as Theme;
    if (currentTheme === "dark" || currentTheme === "light") {
      return currentTheme;
    }
  }
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [preference, setThemeState] = useState<Theme>(getClientTheme);
  const preferenceRef = useRef(preference);
  const [pagePalette, setPaletteState] = useState<PagePalette | null>(null);
  const theme = pagePalette ? PALETTE_TONE[pagePalette] : preference;

  const setTheme = useCallback((newTheme: Theme) => {
    preferenceRef.current = newTheme;
    setPaletteState(null);
    setThemeState(newTheme);
    delete document.documentElement.dataset.pagePalette;
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // localStorage may fail in restricted privacy modes
    }
  }, []);

  // Scroll palettes are temporary: only an explicit toggle changes the saved preference.
  const setPagePalette = useCallback((palette: PagePalette | null) => {
    setPaletteState(palette);
    document.documentElement.dataset.theme = palette
      ? PALETTE_TONE[palette]
      : preferenceRef.current;
    if (palette) document.documentElement.dataset.pagePalette = palette;
    else delete document.documentElement.dataset.pagePalette;
  }, []);

  const toggleTheme = () => {
    const nextTheme = preference === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isMounted ? theme : "light",
        preferredTheme: isMounted ? preference : "light",
        toggleTheme,
        setTheme,
        pagePalette,
        setPagePalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
