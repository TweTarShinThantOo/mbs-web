"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  // ✅ Initialize from localStorage so refresh doesn't log admin out
  const [admin, setAdmin] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("cmr_admin");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const adminLogin = (data) => {
    setAdmin(data);
    // ✅ Persist to localStorage so page refresh keeps admin logged in
    localStorage.setItem("cmr_admin", JSON.stringify(data));
  };

  const adminLogout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
    localStorage.removeItem("cmr_admin");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
