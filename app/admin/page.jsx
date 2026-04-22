"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminIndex() {
  const { admin } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (admin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [admin]);

  return null;
}
