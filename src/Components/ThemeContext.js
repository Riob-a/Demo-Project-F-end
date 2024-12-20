import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Retrieve the theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply theme class to the body element
    document.body.className = theme;
    localStorage.setItem("theme", theme); // Persist theme in localStorage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
