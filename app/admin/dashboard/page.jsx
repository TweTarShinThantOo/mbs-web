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
      <div className="flex flex-col px-3 gap-2">
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

function DonutChart({ available, pending, booked }) {
  const total = Math.max(available + pending + booked, 1);
  const r = 60, cx = 80, cy = 80;
  const circumference = 2 * Math.PI * r;
  const availableDash = (available / total) * circumference;
  const pendingDash = (pending / total) * circumference;
  const bookedDash = (booked / total) * circumference;
  return (
    <svg width="140" height="140" viewBox="0 0 160 160">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="24" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22c55e" strokeWidth="24"
        strokeDasharray={`${availableDash} ${circumference}`} strokeDashoffset={0}
        transform={`rotate(-90 ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eab308" strokeWidth="24"
        strokeDasharray={`${pendingDash} ${circumference}`} strokeDashoffset={-availableDash}
        transform={`rotate(-90 ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth="24"
        strokeDasharray={`${bookedDash} ${circumference}`} strokeDashoffset={-(availableDash + pendingDash)}
        transform={`rotate(-90 ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={46} fill="white" />
    </svg>
  );
}

function MiniCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [allBookedDates, setAllBookedDates] = useState([]);

  useEffect(() => {
  async function fetchBookedDates() {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("event_date, status")
        .neq("status", "cancelled");
      if (error) throw error;
      const dates = (data || [])
        .map(b => {
          try {
            const d = new Date(b.event_date);
            if (!isNaN(d)) return d.toISOString().slice(0, 10);
          } catch {}
          return null;
        })
        .filter(Boolean);
      setAllBookedDates([...new Set(dates)]);
      console.log("Booked dates:", dates);
    } catch (err) {
      console.error("Failed to fetch booked dates:", err);
    
    }
  }
  fetchBookedDates();
}, []);

  const years = [2028, 2027, 2026, 2025, 2024];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDay + 6) % 7;
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const toDateStr = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isBooked = (d) => allBookedDates.includes(toDateStr(d));
  const formattedDate = `${currentDate.getDate()} ${monthNames[month]} ${year}`;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-yellow-400 rounded-lg px-4 py-2 text-sm font-bold text-black text-center">{formattedDate}</div>
        <div className="relative">
          <button onClick={() => setShowYearDropdown(!showYearDropdown)} className="border border-yellow-400 rounded-lg px-3 py-2 text-sm font-bold text-black flex items-center gap-1">
            {selectedYear}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showYearDropdown && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-24">
              {years.map((y) => (
                <button key={y} onClick={() => { setSelectedYear(y); setCurrentDate(new Date(y, month, 1)); setShowYearDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${y === selectedYear ? "bg-black text-white font-bold" : "text-gray-700"}`}>{y}</button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-bold text-gray-800">{monthNames[month]} {year}</span>
        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day && (
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer
                ${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? "bg-yellow-400 text-black font-bold" : ""}
                ${isBooked(day) ? "bg-red-500 text-white" : ""}
                ${!isBooked(day) && !(day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) ? "hover:bg-gray-100 text-gray-700" : ""}
              `}>{day}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-3 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-gray-600">Booked</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400" /><span className="text-gray-600">Today</span></div>
      </div>
    </div>
  );
}

const statusStyle = {
  approved: "bg-green-500 text-white",
  pending: "bg-orange-400 text-white",
  cancelled: "bg-red-500 text-white",
  Approved: "bg-green-500 text-white",
  Pending: "bg-orange-400 text-white",
  Cancelled: "bg-red-500 text-white",
};;

export default function AdminDashboard() {
  const { admin, hydrated } = useAdminAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (hydrated && !admin) router.push("/admin/login");
  }, [admin, router, hydrated]);

 useEffect(() => {
  async function fetchBookings() {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("booking_id, booking_ticket_no, event_date, event_type, status, total_price");
      if (error) throw error;
      console.log("Bookings from Supabase:", data); // ✅ add here
      setBookings((data || []).map(b => ({
        id: b.booking_ticket_no || b.booking_id,
        customer: "Customer",
        date: b.event_date,
        status: b.status,
        event: b.event_type || "—",
      })));
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  }
  fetchBookings();
}, []);

  if (!admin) return null;

  const totalBookings = bookings.length;
 const pendingCount = bookings.filter(b => b.status === "pending").length;
const approvedCount = bookings.filter(b => b.status === "approved").length;

  const TOTAL_SLOTS = 100;
  const bookedSlots = approvedCount;
  const pendingSlots = pendingCount;
  const availableSlots = Math.max(TOTAL_SLOTS - bookedSlots - pendingSlots, 0);

  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthCounts = {};
  bookings.forEach(b => {
    if (!b.date) return;
    try {
      const d = new Date(b.date);
      const short = d.toLocaleString("en-US", { month: "short" });
      if (short) monthCounts[short] = (monthCounts[short] || 0) + 1;
    } catch {}
  });
  const last6Months = monthOrder.slice(0, 6);
  const monthlyValues = last6Months.map(m => monthCounts[m] || 0);
  const maxMonthly = Math.max(...monthlyValues, 1);
  const thisMonthShort = new Date().toLocaleString("en-US", { month: "short" });
  const thisMonthCount = monthCounts[thisMonthShort] || 0;
  const estimatedRevenue = (approvedCount * 35).toLocaleString();
  const avgPerDay = totalBookings > 0 ? (totalBookings / 30).toFixed(1) : "0";

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <AdminNavbar />
      <div className="px-8 pt-2 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Admin Dashboard</span>
      </div>
      <div className="flex flex-1">
        <AdminSidebar active="dashboard" />
        <main className="flex-1 p-6 bg-white rounded-tl-xl overflow-auto">

          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="bg-yellow-400 rounded-xl p-5">
              <p className="text-black font-semibold text-sm mb-3">Await Pending Approvals</p>
              <p className="text-black font-extrabold text-4xl mb-2">{pendingCount} {pendingCount === 1 ? "Client" : "Clients"}</p>
              <p className="text-yellow-800 text-xs">{pendingCount} {pendingCount === 1 ? "client is" : "clients are"} waiting for response</p>
            </div>

            {/* Latest Bookings Table */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer hover:border-yellow-400 hover:shadow-md transition-all group col-span-2" onClick={() => router.push("/admin/bookings")}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Latest Bookings</p>
                <span className="text-xs text-yellow-600 font-semibold group-hover:underline">View all →</span>
              </div>
              {bookings.length === 0 ? (
                <p className="text-gray-400 text-xs text-center py-6">No bookings yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left px-3 py-2 font-bold text-gray-600 text-xs">Booking ID</th>
                        <th className="text-left px-3 py-2 font-bold text-gray-600 text-xs">Customer</th>
                        <th className="text-left px-3 py-2 font-bold text-gray-600 text-xs">Date</th>
                        <th className="text-left px-3 py-2 font-bold text-gray-600 text-xs">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, idx) => (
                        <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-3 text-gray-800 font-bold text-xs">{`CMR-${String(bookings.length - idx).padStart(3, "0")}`}</td>
                          <td className="px-3 py-3 text-gray-600 text-xs">{b.customer}</td>
                          <td className="px-3 py-3 text-gray-500 text-xs">{formatDate(b.date)}</td>
                          <td className="px-3 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle[b.status?.toLowerCase()] || "bg-gray-200 text-gray-600"}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="bg-gray-100 rounded-xl p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-800 font-bold text-sm">Monthly Bookings</h3>
                <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full">{thisMonthCount} this month</span>
              </div>
              <div className="flex items-end gap-2 flex-1 mb-2">
                {monthlyValues.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-500 font-medium">{v}</span>
                    <div className="w-full rounded-t-md bg-yellow-400 hover:bg-yellow-500 transition-all" style={{ height: `${(v / maxMonthly) * 80}px`, minHeight: v > 0 ? "4px" : "0" }} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {last6Months.map((m) => (
                  <div key={m} className="flex-1 text-center text-xs text-gray-400">{m}</div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-200">
                {[
                  { label: "Total", value: String(totalBookings) },
                  { label: "Revenue", value: `$${estimatedRevenue}` },
                  { label: "Avg/Day", value: avgPerDay },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-gray-900 font-extrabold text-sm">{s.value}</p>
                    <p className="text-gray-400 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 bg-gray-100 rounded-xl p-5">
              <h3 className="text-gray-800 font-bold text-sm mb-4">Booking Summary</h3>
              <div className="flex items-center gap-4">
                <DonutChart available={availableSlots} pending={pendingSlots} booked={bookedSlots} />
                <div className="space-y-2 flex-1">
                  {[
                    { label: "Available", value: availableSlots, color: "bg-green-500" },
                    { label: "Pending", value: pendingSlots, color: "bg-yellow-400" },
                    { label: "Booked", value: bookedSlots, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <div className="flex items-center gap-1">
                          <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                          <span className="text-gray-600">{item.label}</span>
                        </div>
                        <span className="text-gray-800 font-bold">{item.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${(item.value / TOTAL_SLOTS) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                  <p className="text-gray-400 text-xs pt-1">Total: {TOTAL_SLOTS} mascot slots</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1">
            <MiniCalendar />
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
