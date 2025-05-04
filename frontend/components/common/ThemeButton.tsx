"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeButton() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`relative flex items-center h-6 w-12 rounded-full shadow transition-colors duration-300 ${theme === "dark" ? "bg-green-100" : "bg-green-950"
        }`}
    >
      <span
        className={`absolute left-[2px] top-[2px] h-5 w-5 flex items-center justify-center rounded-full bg-white text-sm transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4 text-green-900" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-300" />
        )}
      </span>
    </button>
  );
}
