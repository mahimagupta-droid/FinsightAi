"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 dark:hidden text-primary" />
      <Moon className="h-5 w-5 hidden dark:block text-primary" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
