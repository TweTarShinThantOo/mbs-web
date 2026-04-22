"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Check if user is already logged in on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from("users").select("full_name, email, phone")
          .eq("user_id", session.user.id).single()
          .then(({ data: profile }) => {
            setUser({
              id: session.user.id,
              name: profile?.full_name || session.user.email.split("@")[0],
              email: session.user.email,
              phone: profile?.phone || "",
            });
          });
      }
    });

    // ✅ Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
