"use client";
import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  const adminLogin = (data) => setAdmin(data);
  const adminLogout = () => setAdmin(null);

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}