"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  const [mascots, setMascots] = useState(defaultMascots);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load mascots from Supabase on mount
  useEffect(() => {
    const loadMascots = async () => {
      try {
        const { data, error } = await supabase
          .from("mascots")
          .select("*");

        if (!error && data && data.length > 0) {
          const mapped = data.map(m => ({
            id: m.mascot_id,
            name: m.mascot_name,
            category: m.Category,
            description: m.description || "",
            price: m.price,
            image: m.image || null,
          }));
          setMascots(mapped);
          console.log("✅ Mascots loaded from Supabase");
        } else {
          // Fallback: seed default mascots to Supabase
          console.warn("No mascots in Supabase, falling back to defaults");
        }
      } catch (err) {
        console.warn("Failed to load from Supabase, using defaults:", err);
      }
      setHydrated(true);
    };

    loadMascots();
  }, []);

  const updateMascots = async (updated) => {
    setMascots(updated);
    // Try to sync to Supabase
    try {
      for (const mascot of updated) {
        if (mascot.id && mascot.id > 0) {
          // Update existing
          await supabase
            .from("mascots")
            .update({
              mascot_name: mascot.name,
              Category: mascot.category,
              description: mascot.description,
              price: mascot.price,
              image: mascot.image,
            })
            .eq("mascot_id", mascot.id);
        }
      }
    } catch (err) {
      console.warn("Failed to sync mascots to Supabase:", err);
    }
  };

  return (
    <MascotContext.Provider value={{ mascots, updateMascots, hydrated }}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascots() { return useContext(MascotContext); }