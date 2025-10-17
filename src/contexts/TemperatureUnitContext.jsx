import { createContext, useContext, useState } from "react";

const TemperatureUnitContext = createContext();

export function TemperatureUnitProvider({ children }) {
  const [unit, setUnit] = useState("C"); 

  const toggleUnit = () => {
    setUnit((prev) => (prev === "C" ? "f" : "C"));
  };

  return (
    <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);
  if (!context) {
    throw new Error(
      "useTemperatureUnit debe usarse dentro de un TemperatureUnitProvider"
    );
  }
  return context;
}
