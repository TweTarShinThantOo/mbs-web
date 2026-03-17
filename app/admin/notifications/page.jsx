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
  const { admin } = useAdminAuth();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
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
        <button onClick={() => router.push("/admin/notifications")} className="relative hover:text-yellow-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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

function NotifIcon({ type }) {
  if (type === "booking") return (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </div>
  );
  if (type === "cancel") return (
    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
  if (type === "approved") return (
    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
  if (type === "pending") return (
    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
  return (
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
}

// Generate notifications from real bookings
function buildNotificationsFromBookings(bookings) {
  const notifs = [];
  bookings.forEach((b) => {
    if (b.status === "Pending") {
      notifs.push({
        id: `pending-${b.id}`,
        type: "pending",
        title: "New Booking Request",
        desc: `${b.customer} requested booking for ${b.event} on ${b.date}.`,
        time: b.date || "—",
        read: false,
        bookingId: b.id,
      });
    } else if (b.status === "Approved") {
      notifs.push({
        id: `approved-${b.id}`,
        type: "approved",
        title: "Booking Approved",
        desc: `${b.customer}'s booking for ${b.event} has been approved.`,
        time: b.date || "—",
        read: true,
        bookingId: b.id,
      });
    } else if (b.status === "Cancelled") {
      notifs.push({
        id: `cancel-${b.id}`,
        type: "cancel",
        title: "Booking Cancelled",
        desc: `${b.customer} cancelled their booking for ${b.event}.`,
        time: b.date || "—",
        read: false,
        bookingId: b.id,
      });
    }
  });
  return notifs.reverse();
}

export default function AdminNotifications() {
  const { admin } = useAdminAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    if (!admin) router.push("/admin/login");
  }, [admin]);

  // Load notifications from real bookings + persisted read/deleted state
  useEffect(() => {
    try {
      const bookings = JSON.parse(localStorage.getItem("cmr_bookings") || "[]");
      const storedDeleted = JSON.parse(localStorage.getItem("cmr_notif_deleted") || "[]");
      const storedRead = JSON.parse(localStorage.getItem("cmr_notif_read") || "[]");
      setDeletedIds(storedDeleted);
      setReadIds(storedRead);
      const built = buildNotificationsFromBookings(bookings);
      setNotifications(built);
    } catch {}
  }, []);

  if (!admin) return null;

  const markAllRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadIds(allIds);
    try { localStorage.setItem("cmr_notif_read", JSON.stringify(allIds)); } catch {}
  };

  const markRead = (id) => {
    const updated = [...new Set([...readIds, id])];
    setReadIds(updated);
    try { localStorage.setItem("cmr_notif_read", JSON.stringify(updated)); } catch {}
    setOpenMenu(null);
  };

  const deleteNotif = (id) => {
    const updated = [...deletedIds, id];
    setDeletedIds(updated);
    try { localStorage.setItem("cmr_notif_deleted", JSON.stringify(updated)); } catch {}
    setOpenMenu(null);
  };

  // Merge read/deleted state into notifications
  const merged = notifications
    .filter(n => !deletedIds.includes(n.id))
    .map(n => ({ ...n, read: readIds.includes(n.id) || n.read }));

  const filtered = merged.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.desc.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || (filter === "Unread" && !n.read) || (filter === "Updated" && n.read);
    return matchSearch && matchFilter;
  });

  const unreadCount = merged.filter(n => !n.read).length;

  useEffect(() => {
    function handleClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
      setOpenMenu(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <AdminNavbar />

      <div className="px-8 pt-2 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Notification Page</span>
      </div>

      <div className="flex flex-1">
        <AdminSidebar active="notifications" />

        <main className="flex-1 p-6 bg-white rounded-tl-xl overflow-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-gray-900 font-extrabold text-xl">Notifications</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{unreadCount} unread</span>
              )}
            </div>
          </div>

          {/* Search + Filter + Mark all read */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <input
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Search notifications...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl text-sm transition-colors"
              >
                {filter}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {["All", "Unread", "Updated"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setFilter(opt); setFilterOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${filter === opt ? "bg-yellow-400 text-black font-bold" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={markAllRead}
              className="px-4 py-2 border-2 border-gray-300 hover:border-yellow-400 text-gray-700 font-bold rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              Mark all as Read
            </button>
          </div>

          {/* Notification list */}
          <div className="space-y-3">
            {filtered.length === 0 && merged.length > 0 && (
              <div className="flex flex-col items-center justify-center py-12 rounded-xl bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                </svg>
                <p className="text-gray-400 text-sm">No notifications match your search.</p>
              </div>
            )}

            {filtered.map((n) => (
              <div
                key={n.id}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-colors ${n.read ? "bg-gray-100 border-gray-200" : "bg-white border-yellow-300 shadow-sm"}`}
              >
                <NotifIcon type={n.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-bold ${n.read ? "text-gray-500" : "text-gray-900"}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{n.desc}</p>
                  {n.bookingId && (
                    <button
                      onClick={() => router.push("/admin/bookings")}
                      className="text-yellow-600 text-xs font-semibold hover:underline mt-1 inline-block"
                    >
                      View booking →
                    </button>
                  )}
                </div>
                <span className="text-gray-400 text-xs whitespace-nowrap flex-shrink-0">{n.time}</span>

                <div className="relative flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === n.id ? null : n.id); }}
                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
                    </svg>
                  </button>
                  {openMenu === n.id && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                          Mark as Read
                        </button>
                      )}
                      <button onClick={() => router.push("/admin/bookings")} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium">
                        View Booking
                      </button>
                      <button onClick={() => deleteNotif(n.id)} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Empty state — no bookings at all */}
            {merged.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400 text-sm font-medium">No new notifications yet.</p>
                <p className="text-gray-300 text-xs mt-1">All bookings are up to date.</p>
              </div>
            )}
          </div>

        </main>
      </div>

      <footer className="bg-white border-t border-gray-200 py-5 text-center">
        <p className="text-gray-500 text-sm mb-3">@2026 CMR Cavite Mascot Rentals<br />All Rights Reserved</p>
        <div className="flex justify-center gap-5">
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1877F2" /><path d="M29 14h-3c-1.1 0-2 .9-2 2v3h5l-.7 5H24v13h-5V24h-3v-5h3v-3c0-3.3 2.7-6 6-6h4v4z" fill="white" /></svg></a>
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="black" /><path d="M31 14c.5 2.5 2.5 4 5 4v4c-2 0-3.8-.7-5-1.8V29c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.4 0 .7 0 1 .1v4.1c-.3-.1-.7-.1-1-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V14h4z" fill="white" /></svg></a>
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><radialGradient id="ig2" cx="19%" cy="99%" r="108%"><stop offset="0%" stopColor="#ffd600" /><stop offset="30%" stopColor="#ff6930" /><stop offset="60%" stopColor="#e4318f" /><stop offset="100%" stopColor="#6b3cce" /></radialGradient><circle cx="24" cy="24" r="24" fill="url(#ig2)" /><rect x="13" y="13" width="22" height="22" rx="6" ry="6" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="31" cy="17" r="1.5" fill="white" /></svg></a>
        </div>
      </footer>
    </div>
  );
}