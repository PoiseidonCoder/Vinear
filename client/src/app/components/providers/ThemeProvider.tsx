"use client";

import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="backdrop-blur-md bg-black/10 dark:bg-white/10 rounded-full p-1">
          <button
            onClick={toggleTheme}
            className={`w-20 h-10 rounded-full p-1 flex items-center transition-colors duration-300 ${
              theme === "dark" ? "bg-black" : "bg-white"
            }`}
          >
            <div
              className={`w-7 h-7 text-base rounded-full flex items-center justify-center transition-transform duration-300 ${
                theme === "dark"
                  ? "translate-x-10 text-white bg-zinc-800"
                  : "translate-x-0 text-black bg-gray-200"
              }`}
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </div>
          </button>
        </div>
      </div>

      {children}
    </>
  );
}
