"use client";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const [theme, setTheme] = useState("light");

  // On mount, check the user's localStorage for theme preference
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
      className={`rounded-full flex items-center px-1 py-[2px] shadow ${theme == "dark" ? "bg-green-100" : "bg-green-950"} w-12`}
      onClick={toggleTheme}
    >
      {
        theme == "light" ? (
          <span className="border rounded-full bg-green-200">🌞</span>
        ) : (
          <span className="border rounded-full translate-x-5 bg-black">🌙</span>
        )
      }
    </button>
  );
}

