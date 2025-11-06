"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="bg-surface flex h-11 w-11 items-center justify-center rounded-xl shadow-sm">
        <Sun className="h-5 w-5 text-gray-400" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group bg-background relative flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-95"
      aria-label="تغییر تم">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isDark
            ? "bg-linear-to-br from-yellow-500/10 to-orange-500/10"
            : "bg-linear-to-br from-blue-500/10 to-indigo-500/10"
        }`}
      />

      {/* Icon container with fade transition */}
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-45" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 dark:text-indigo-400" />
        )}
      </div>

      {/* Ripple effect on click */}
      <span className="absolute inset-0 rounded-xl bg-current opacity-0 transition-opacity group-active:opacity-10" />
    </button>
  );
}
