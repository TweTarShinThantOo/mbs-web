"use client";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function AdminLogout() {
  const { adminLogout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-gray-900 font-extrabold text-2xl mb-2">Log Out?</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Are you sure you want to log out of the Admin Panel?<br />
          You will need to log in again to access the dashboard.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors text-sm"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
}