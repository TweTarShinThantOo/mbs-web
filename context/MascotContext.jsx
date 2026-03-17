"use client";
import { createContext, useContext, useState, useEffect } from "react";

const defaultMascots = [
  { id: 1, name: "Rapunzel", category: "Princess", description: "Princess mascot perfect for birthday parties", price: 20, image: null },
  { id: 2, name: "Cinderella", category: "Princess", description: "Classic princess for magical events", price: 25, image: null },
  { id: 3, name: "Simba", category: "Animals", description: "Lion King mascot loved by kids", price: 30, image: null },
  { id: 4, name: "Dumbo", category: "Animals", description: "Adorable elephant for fun events", price: 28, image: null },
  { id: 5, name: "Doctor Strange", category: "Superhero", description: "Marvel superhero for all events", price: 60, image: null },
  { id: 6, name: "Spider-Man", category: "Superhero", description: "Friendly neighborhood hero", price: 55, image: null },
  { id: 7, name: "Elsa", category: "Prince", description: "Frozen queen loved by kids", price: 50, image: null },
  { id: 8, name: "Mickey Mouse", category: "Others", description: "Classic Disney mascot for all ages", price: 45, image: null },
];

const MascotContext = createContext();

export function MascotProvider({ children }) {
  // Always start with defaultMascots so server and client render the same thing
  const [mascots, setMascots] = useState(defaultMascots);
  const [hydrated, setHydrated] = useState(false);

  // Only load from localStorage after hydration on the client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cmr_mascots");
      if (stored) setMascots(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  const updateMascots = (updated) => {
    setMascots(updated);
    try { localStorage.setItem("cmr_mascots", JSON.stringify(updated)); } catch {}
  };

  return (
    <MascotContext.Provider value={{ mascots, updateMascots, hydrated }}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascots() { return useContext(MascotContext); }