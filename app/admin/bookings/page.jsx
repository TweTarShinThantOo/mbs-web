"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { supabase } from "../../../lib/supabase";

function AdminSidebar({ active }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`bg-yellow-400 flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"} min-h-screen flex-shrink-0`}>
      {/* Logo */}
      

      {/* Hamburger + Nav together */}
      <div className="flex flex-col px-3 gap-2">
        {/* Hamburger button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center py-3 px-4 hover:bg-yellow-500 rounded-xl transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav links */}
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

const MASCOT_OPTIONS = ["Scarlet Witch", "Cinderella", "Joker", "Spider-Man", "Elsa", "Batman", "Rapunzel", "Iron Man"];

const statusStyle = {
  Approved: "bg-green-500 text-white",
  Pending: "bg-orange-400 text-white",
  Cancelled: "bg-red-500 text-white",
};

// ✅ Single source of truth — reads ALL bookings from Supabase with fallback
async function loadBookingsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*");
    
    if (!error && data) {
      return data.map(b => ({
        id: b.booking_ticket_no || `CMR-${b.booking_id}`,
        booking_id: b.booking_id,
        event: b.event_type || "—",
        customer: "Customer",
        date: b.event_date || "—",
        status: b.status?.charAt(0).toUpperCase() + b.status?.slice(1) || "Pending",
        phone: "",
        location: b.event_address || "",
        payment: `$${b.total_price || 0}`,
      }));
    }
  } catch (err) {
    console.warn("Failed to load from Supabase:", err);
  }
  return [];
}

export default function AdminBookings() {
  const { admin, hydrated } = useAdminAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const sortRef = useRef(null);

  useEffect(() => {
    if (hydrated && !admin) router.push("/admin/login");
  }, [admin, hydrated]);

  useEffect(() => {
    function handleClick(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ On load: fetch bookings from Supabase
  useEffect(() => {
    const loadBookings = async () => {
      const bookingData = await loadBookingsFromSupabase();
      setBookings(bookingData);
    };
    loadBookings();
  }, []);

  if (!admin) return null;

  const saveBookings = async (updated) => {
    setBookings(updated);
    // Sync to Supabase
    try {
      for (const booking of updated) {
        await supabase
          .from("bookings")
          .update({
            event_type: booking.event,
            event_address: booking.location,
            status: booking.status.toLowerCase(),
          })
          .eq("booking_ticket_no", booking.id);
      }
    } catch (err) {
      console.warn("Failed to sync bookings to Supabase:", err);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
    setSortOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await supabase
        .from("bookings")
        .delete()
        .eq("booking_ticket_no", id);
    } catch (err) {
      console.warn("Failed to delete from Supabase:", err);
    }
    saveBookings(bookings.filter(b => b.id !== id));
    setDeleteConfirm(null);
    showSuccess("Booking deleted successfully.");
  };

  const handleEditOpen = (booking) => {
    setEditForm({ ...booking });
    setEditModal(booking.id);
  };

  const handleEditSave = async () => {
    const updated = bookings.map(b => b.id === editModal ? { ...editForm } : b);
    
    // Update in Supabase
    try {
      await supabase
        .from("bookings")
        .update({
          event_type: editForm.event,
          event_address: editForm.location,
          status: editForm.status.toLowerCase(),
        })
        .eq("booking_ticket_no", editModal);
    } catch (err) {
      console.warn("Failed to update in Supabase:", err);
    }
    
    saveBookings(updated);
    setEditModal(null);
    showSuccess("Booking updated successfully.");
  };

  const handleStatusChange = async (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    
    // Update in Supabase
    try {
      await supabase
        .from("bookings")
        .update({ status: newStatus.toLowerCase() })
        .eq("booking_ticket_no", id);
    } catch (err) {
      console.warn("Failed to update status in Supabase:", err);
    }
    
    saveBookings(updated);
    showSuccess(`Status updated to ${newStatus}.`);
  };

  let filtered = bookings.filter(b => {
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    const matchSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      (b.event || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (sortField) {
    filtered = [...filtered].sort((a, b) => {
      const av = a[sortField]?.toLowerCase?.() || a[sortField] || "";
      const bv = b[sortField]?.toLowerCase?.() || b[sortField] || "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <AdminNavbar />

      <div className="px-8 pt-2 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Booking Management</span>
      </div>

      <div className="flex flex-1">
        <AdminSidebar active="bookings" />

        <main className="flex-1 p-6 bg-white rounded-tl-xl overflow-auto">

          {successMsg && (
            <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              {successMsg}
            </div>
          )}

          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-56" />
              </div>
              {["All", "Pending", "Approved", "Cancelled"].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterStatus === s ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="relative" ref={sortRef}>
              <button onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                Sort by
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {[
                    { label: "Booking ID", field: "id" },
                    { label: "Customer Name", field: "customer" },
                    { label: "Event", field: "event" },
                    { label: "Date", field: "date" },
                    { label: "Status", field: "status" },
                  ].map(opt => (
                    <button key={opt.field} onClick={() => handleSort(opt.field)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-yellow-50 flex items-center justify-between ${sortField === opt.field ? "font-bold text-yellow-600" : "text-gray-700"}`}>
                      {opt.label}
                      {sortField === opt.field && <span className="text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 text-gray-600 font-bold">Booking ID</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-bold">Event</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-bold">Customer Name</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-bold">Booking Date</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-bold">Status</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No bookings found.</td></tr>
                ) : filtered.map((b, i) => (
                  <tr key={b.id} className={`border-b border-gray-50 hover:bg-yellow-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="px-5 py-4 font-semibold text-gray-800">{b.id}</td>
                    <td className="px-5 py-4 text-gray-700">{b.event}</td>
                    <td className="px-5 py-4 text-gray-700">{b.customer}</td>
                    <td className="px-5 py-4 text-gray-500">{b.date}</td>
                    <td className="px-5 py-4">
                      <select value={b.status} onChange={e => handleStatusChange(b.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${statusStyle[b.status]}`}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setViewModal(b)} className="p-2 bg-gray-100 hover:bg-yellow-100 rounded-lg transition-colors" title="View">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button onClick={() => handleEditOpen(b)} className="p-2 bg-gray-100 hover:bg-yellow-100 rounded-lg transition-colors" title="Edit">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(b.id)} className="p-2 bg-gray-100 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 text-xs mt-3">{filtered.length} booking{filtered.length !== 1 ? "s" : ""} found</p>

        </main>
      </div>

      {viewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between">
              <h2 className="text-black font-extrabold text-lg">Booking Details</h2>
              <button onClick={() => setViewModal(null)} className="text-black hover:opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                { label: "Booking ID", value: viewModal.id },
                { label: "Event / Mascot", value: viewModal.event },
                { label: "Customer Name", value: viewModal.customer },
                { label: "Booking Date", value: viewModal.date },
                { label: "Phone", value: viewModal.phone || "—" },
                { label: "Location", value: viewModal.location || "—" },
                { label: "Payment Method", value: viewModal.payment || "—" },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">{row.label}</span>
                  <span className="text-gray-800 font-semibold">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-1">
                <span className="text-gray-500 font-medium">Status</span>
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${statusStyle[viewModal.status]}`}>{viewModal.status}</span>
              </div>
            </div>
            <div className="px-6 pb-5">
              <button onClick={() => setViewModal(null)} className="w-full py-2.5 bg-black text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between">
              <h2 className="text-black font-extrabold text-lg">Edit Booking</h2>
              <button onClick={() => setEditModal(null)} className="text-black hover:opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event / Mascot</label>
                <select value={editForm.event} onChange={e => setEditForm({...editForm, event: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  {MASCOT_OPTIONS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
                <input type="text" value={editForm.customer} onChange={e => setEditForm({...editForm, customer: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Booking Date</label>
                <input type="text" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
                <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={() => setEditModal(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleEditSave} className="flex-1 py-2.5 bg-yellow-400 text-black font-bold rounded-xl text-sm hover:bg-yellow-500 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-extrabold text-lg mb-1">Delete Booking?</h3>
            <p className="text-gray-500 text-sm mb-6">This will permanently remove booking <span className="font-bold text-gray-800">{deleteConfirm}</span>. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white font-bold rounded-xl text-sm hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 py-5 text-center">
        <p className="text-gray-500 text-sm mb-3">@2026 CMR Cavite Mascot Rentals<br />All Rights Reserved</p>
        <div className="flex justify-center gap-5">
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1877F2" /><path d="M29 14h-3c-1.1 0-2 .9-2 2v3h5l-.7 5H24v13h-5V24h-3v-5h3v-3c0-3.3 2.7-6 6-6h4v4z" fill="white" /></svg></a>
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="black" /><path d="M31 14c.5 2.5 2.5 4 5 4v4c-2 0-3.8-.7-5-1.8V29c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.4 0 .7 0 1 .1v4.1c-.3-.1-.7-.1-1-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V14h4z" fill="white" /></svg></a>
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><radialGradient id="ig3" cx="19%" cy="99%" r="108%"><stop offset="0%" stopColor="#ffd600" /><stop offset="30%" stopColor="#ff6930" /><stop offset="60%" stopColor="#e4318f" /><stop offset="100%" stopColor="#6b3cce" /></radialGradient><circle cx="24" cy="24" r="24" fill="url(#ig3)" /><rect x="13" y="13" width="22" height="22" rx="6" ry="6" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="31" cy="17" r="1.5" fill="white" /></svg></a>
        </div>
      </footer>
    </div>
  );
}