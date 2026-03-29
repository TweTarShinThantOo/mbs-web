"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";

function AdminSidebar({ active }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`bg-yellow-400 flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"} min-h-screen flex-shrink-0`}>
      <div className="flex flex-col px-3 gap-2 pt-3">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center justify-center py-3 px-4 hover:bg-yellow-500 rounded-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${active === "dashboard" ? "bg-black text-white" : "hover:bg-yellow-500 text-black"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {!collapsed && "Dashboard"}
        </Link>
        <Link href="/admin/mascots" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${active === "mascots" ? "bg-black text-white" : "hover:bg-yellow-500 text-black"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {!collapsed && "Manage Mascots"}
        </Link>
        <Link href="/admin/bookings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${active === "bookings" ? "bg-black text-white" : "hover:bg-yellow-500 text-black"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          {!collapsed && "Bookings"}
        </Link>
      </div>
    </div>
  );
}

function AdminNavbar() {
  const { admin, adminLogout } = useAdminAuth();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const notifications = [
    { id: 1, text: "New booking from Maria Santos", time: "2 mins ago", unread: true },
    { id: 2, text: "CMR-2026-0012 is pending approval", time: "15 mins ago", unread: true },
    { id: 3, text: "Rapunzel booking confirmed", time: "1 hr ago", unread: false },
  ];
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="bg-black text-white flex items-center justify-between px-8 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-300 flex-shrink-0">
          <span className="text-black font-extrabold text-xs text-center leading-tight px-1">CMR</span>
        </div>
        <h1 className="text-white font-extrabold text-xl">Welcome to Admin Panel !</h1>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative" ref={notifRef}>
          <button onClick={() => router.push("/admin/notifications")} className="relative hover:text-yellow-400 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
</button>
          {notifOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 bg-yellow-400"><p className="text-black font-bold text-sm">Notifications</p></div>
              {notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-gray-100 flex items-start gap-3 ${n.unread ? "bg-yellow-50" : "bg-white"}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.unread ? "bg-yellow-500" : "bg-gray-300"}`} />
                  <div>
                    <p className="text-gray-800 text-xs font-medium">{n.text}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative" ref={profileRef}>
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-black font-bold text-sm">{admin?.name?.[0]?.toUpperCase() || "A"}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 bg-yellow-400">
                <p className="text-black font-bold text-sm">{admin?.name}</p>
                <p className="text-yellow-800 text-xs truncate">{admin?.email}</p>
              </div>
              <Link href="/admin/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              <Link href="/admin/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
              <div className="border-t border-gray-100" />
              <button onClick={() => { setProfileOpen(false); router.push("/admin/logout"); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function AdminProfile() {
  const { admin, adminLogin, hydrated } = useAdminAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated && !admin) router.push("/admin/login");
  }, [admin, hydrated]);

  if (!admin) return null;

  const handleSave = () => {
    adminLogin({ ...admin, name, email });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <AdminNavbar />
      <div className="px-8 pt-2 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Admin Profile</span>
      </div>
      <div className="flex flex-1">
        <AdminSidebar active="profile" />
        <main className="flex-1 p-6 bg-white rounded-tl-xl overflow-auto">
          <div className="max-w-lg mx-auto">
            <h2 className="text-gray-900 font-extrabold text-xl mb-6">Admin Profile</h2>

            {saved && (
              <div className="mb-4 px-4 py-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                ✓ Profile updated successfully!
              </div>
            )}

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center border-4 border-yellow-300">
                <span className="text-black font-extrabold text-3xl">{admin?.name?.[0]?.toUpperCase() || "A"}</span>
              </div>
              <div>
                <p className="text-gray-900 font-bold text-lg">{admin?.name}</p>
                <p className="text-gray-500 text-sm">{admin?.email}</p>
                <span className="inline-block mt-1 px-3 py-0.5 bg-yellow-400 text-black text-xs font-bold rounded-full">Administrator</span>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-gray-800 font-bold text-sm">Account Information</h3>
                {!editing && (
                  <button onClick={() => setEditing(true)} className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-sm transition-colors">
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Full Name</label>
                  {editing ? (
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">{admin?.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email</label>
                  {editing ? (
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">{admin?.email}</div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Role</label>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">Administrator</div>
                </div>
              </div>

              {editing && (
                <div className="flex gap-3 mt-6">
                  <button onClick={handleSave} className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-sm transition-colors">
                    Save Changes
                  </button>
                  <button onClick={() => { setEditing(false); setName(admin?.name || ""); setEmail(admin?.email || ""); }} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg text-sm transition-colors">
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Quick links */}
            <div className="mt-6 flex gap-3">
              <Link href="/admin/settings" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg text-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Go to Settings
              </Link>
              <Link href="/admin/dashboard" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-sm transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}