"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Restore admin session from Supabase on page load
  useEffect(() => {
    try {
      // Check if admin is stored in localStorage (for quick restore)
      const stored = localStorage.getItem("cmr_admin_session");
      if (stored) {
        const adminData = JSON.parse(stored);
        setAdmin(adminData);
      }
    } catch (err) {
      console.warn("Failed to restore admin session:", err);
    }
    setHydrated(true);
  }, []);

  const adminLogin = async (data) => {
    try {
      // Save to Supabase admin_users table
      const { data: existingAdmin, error: checkError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", data.email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        console.warn("Error checking admin:", checkError);
      }

      let adminId = existingAdmin?.admin_id;

      if (!adminId) {
        // Create new admin user
        const { data: newAdmin, error: insertError } = await supabase
          .from("admin_users")
          .insert([
            {
              name: data.name,
              email: data.email,
              role: data.role || "admin",
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.warn("Failed to create admin in Supabase:", insertError);
        } else {
          adminId = newAdmin?.admin_id;
        }
      }

      const adminData = {
        admin_id: adminId,
        name: data.name,
        email: data.email,
        role: data.role || "admin",
      };

      setAdmin(adminData);

      // Store session locally for quick access
      try {
        localStorage.setItem("cmr_admin_session", JSON.stringify(adminData));
      } catch {}
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    // Clear session from localStorage
    try {
      localStorage.removeItem("cmr_admin_session");
    } catch (err) {
      console.warn("Failed to clear admin session:", err);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout, hydrated }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}