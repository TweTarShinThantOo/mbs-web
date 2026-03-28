"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { supabase } from "../../../lib/supabase";

const categories = [
  { label: "Princess", icon: "👸" },
  { label: "Animals", icon: "🐾" },
  { label: "Superhero", icon: "🦸" },
  { label: "Prince", icon: "🤴" },
  { label: "Others", icon: "✨" },
];

const ITEMS_PER_PAGE = 6;

function loadBookedDates() {
  try { return JSON.parse(localStorage.getItem("cmr_booked_dates") || "{}"); } catch { return {}; }
}
function saveBookedDates(data) {
  try { localStorage.setItem("cmr_booked_dates", JSON.stringify(data)); } catch {}
}

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

function MascotCalendarModal({ mascot, onClose }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [bookedDates, setBookedDates] = useState(() => {
    const all = loadBookedDates();
    return all[String(mascot.id)] || [];
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const toDateStr = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const toggleDate = (d) => {
    const dateStr = toDateStr(d);
    const updated = bookedDates.includes(dateStr) ? bookedDates.filter(x => x !== dateStr) : [...bookedDates, dateStr];
    setBookedDates(updated);
    const all = loadBookedDates();
    all[String(mascot.id)] = updated;
    saveBookedDates(all);
  };

  const isBooked = (d) => bookedDates.includes(toDateStr(d));
  const isToday = (d) => { const t = new Date(); return d === t.getDate() && month === t.getMonth() && year === t.getFullYear(); };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-black font-extrabold text-lg">{mascot.name} — Calendar</h2>
            <p className="text-yellow-800 text-xs mt-0.5">Click dates to mark as booked / available</p>
          </div>
          <button onClick={onClose} className="text-black hover:opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-gray-800 font-bold text-sm">{monthNames[month]} {year}</span>
            <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
              const booked = isBooked(d);
              const today_ = isToday(d);
              return (
                <button key={d} onClick={() => toggleDate(d)}
                  className={`w-full aspect-square flex items-center justify-center text-xs rounded-lg font-medium transition-colors
                    ${booked ? "bg-red-500 text-white hover:bg-red-600" : ""}
                    ${today_ && !booked ? "bg-yellow-400 text-black font-bold hover:bg-yellow-500" : ""}
                    ${!booked && !today_ ? "hover:bg-gray-100 text-gray-700" : ""}
                  `}
                >{d}</button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-4 h-4 rounded bg-red-500" /> Booked</div>
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-4 h-4 rounded bg-gray-100 border border-gray-200" /> Available</div>
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-4 h-4 rounded bg-yellow-400" /> Today</div>
          </div>
          <p className="text-gray-400 text-xs mt-3 text-center">{bookedDates.length} date{bookedDates.length !== 1 ? "s" : ""} marked as booked</p>
        </div>
        <div className="px-5 pb-5">
          <button onClick={onClose} className="w-full py-2.5 bg-black text-white font-bold rounded-xl text-sm hover:bg-gray-800 transition-colors">Done</button>
        </div>
      </div>
    </div>
  );
}

function MascotForm({ form, setForm, formErrors, setFormErrors, imageRef, handleImageChange }) {
  return (
    <div className="space-y-4 px-6 py-5">
      <div className="flex flex-col items-center gap-2">
        <div onClick={() => imageRef.current?.click()} className="w-24 h-24 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 hover:border-yellow-400 flex items-center justify-center cursor-pointer overflow-hidden transition-colors">
          {form.image ? <img src={form.image} alt="preview" className="w-full h-full object-cover" /> : (
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-xs text-gray-400 mt-1">Upload</p>
            </div>
          )}
        </div>
        <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        <p className="text-xs text-gray-400">Click to upload mascot image</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Mascot Name</label>
        <input type="text" value={form.name} onChange={e => { setForm({...form, name: e.target.value}); setFormErrors({...formErrors, name: ""}); }}
          className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${formErrors.name ? "border-red-400" : "border-gray-200"}`}
          placeholder="e.g. Rapunzel" />
        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
        <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          {categories.map(c => <option key={c.label}>{c.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
        <textarea value={form.description} onChange={e => { setForm({...form, description: e.target.value}); setFormErrors({...formErrors, description: ""}); }}
          rows={3}
          className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none ${formErrors.description ? "border-red-400" : "border-gray-200"}`}
          placeholder="Short description..." />
        {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Price ($)</label>
        <input type="text" inputMode="decimal" value={form.price} onChange={e => { setForm({...form, price: e.target.value}); setFormErrors({...formErrors, price: ""}); }}
          className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${formErrors.price ? "border-red-400" : "border-gray-200"}`}
          placeholder="e.g. 35" />
        {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
      </div>
    </div>
  );
}

const emptyForm = { name: "", category: "Princess", description: "", price: "", image: null };

export default function AdminMascots() {
  const { admin } = useAdminAuth();
  const router = useRouter();

  // ✅ Supabase state instead of context
  const [mascots, setMascots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [calendarMascot, setCalendarMascot] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const imageRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => { if (!admin) router.push("/admin/login"); }, [admin]);

  useEffect(() => {
    function handleClick(e) { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ Fetch from Supabase
  useEffect(() => {
    fetchMascots();
  }, []);

  async function fetchMascots() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("mascots").select("*");
      if (error) throw error;
      setMascots((data || []).map(m => ({
        id: m.mascot_id,
        name: m.mascot_name,
        category: m.Category,
        description: m.description || "",
        price: m.price,
        image: m.image || null,
        inclusions: m.inclusions || "",
      })));
    } catch (err) {
      console.error("Failed to fetch mascots:", err);
    } finally {
      setLoading(false);
    }
  }

  const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 2500); };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.description.trim()) errors.description = "Description is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errors.price = "Valid price required";
    return errors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  // ✅ Add to Supabase
  const handleAdd = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    try {
      const { error } = await supabase.from("mascots").insert({
        mascot_name: form.name.trim(),
        Category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        image: form.image || null,
      });
      if (error) throw error;
      await fetchMascots();
      setAddModal(false); setForm(emptyForm); setFormErrors({});
      showSuccess(`${form.name.trim()} added successfully!`);
    } catch (err) {
      console.error("Add failed:", err);
      showSuccess("Failed to add mascot.");
    }
  };

  const handleEditOpen = (mascot) => {
    setForm({ ...mascot, price: String(mascot.price) });
    setFormErrors({});
    setEditModal(mascot.id);
  };

  // ✅ Edit in Supabase
  const handleEditSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    try {
      const { error } = await supabase.from("mascots").update({
        mascot_name: form.name.trim(),
        Category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        image: form.image || null,
      }).eq("mascot_id", editModal);
      if (error) throw error;
      await fetchMascots();
      setEditModal(null); setForm(emptyForm); setFormErrors({});
      showSuccess("Mascot updated successfully!");
    } catch (err) {
      console.error("Edit failed:", err);
      showSuccess("Failed to update mascot.");
    }
  };

  // ✅ Delete from Supabase
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("mascots").delete().eq("mascot_id", id);
      if (error) throw error;
      await fetchMascots();
      setDeleteConfirm(null);
      showSuccess("Mascot deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      showSuccess("Failed to delete mascot.");
    }
  };

  const filtered = mascots.filter(m => {
    const matchCat = filterCategory === "All" || m.category === filterCategory;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (!admin) return null;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <AdminNavbar />
      <div className="px-8 pt-2 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Manage Mascots</span>
      </div>
      <div className="flex flex-1">
        <AdminSidebar active="mascots" />
        <main className="flex-1 p-6 bg-white rounded-tl-xl overflow-auto">

          {successMsg && (
            <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              {successMsg}
            </div>
          )}

          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 w-44">
                <input className="flex-1 text-sm text-gray-700 focus:outline-none" placeholder="Search" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" /></svg>
              </div>
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg border transition-colors ${viewMode === "grid" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-400"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${viewMode === "grid" ? "text-yellow-500" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg border transition-colors ${viewMode === "list" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-400"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${viewMode === "list" ? "text-yellow-500" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <div className="relative" ref={filterRef}>
                <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:border-yellow-400 transition-colors">
                  Filter By Category
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
                </button>
                {filterOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                    <button onClick={() => { setFilterCategory("All"); setFilterOpen(false); setPage(1); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-yellow-50 flex items-center gap-2 ${filterCategory === "All" ? "font-bold text-yellow-600" : "text-gray-700"}`}>All Categories</button>
                    {categories.map(c => (
                      <button key={c.label} onClick={() => { setFilterCategory(c.label); setFilterOpen(false); setPage(1); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-yellow-50 flex items-center gap-2 ${filterCategory === c.label ? "font-bold text-yellow-600" : "text-gray-700"}`}>
                        <span>{c.icon}</span>{c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => { setForm(emptyForm); setFormErrors({}); setAddModal(true); }} className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Add Mascot
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading mascots...
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-20 text-center text-gray-400">No mascots found.</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map(mascot => (
                <div key={mascot.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="w-full h-36 bg-yellow-100 flex items-center justify-center overflow-hidden">
                    {mascot.image ? <img src={mascot.image} alt={mascot.name} className="object-cover w-full h-full" /> : <div className="w-24 h-24 bg-yellow-300 rounded-xl flex items-center justify-center"><span className="text-yellow-700 text-2xl">🎭</span></div>}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-gray-800 font-bold text-sm mb-0.5">{mascot.name}</p>
                    <p className="text-gray-400 text-xs mb-0.5">{mascot.category}</p>
                    <p className="text-gray-500 text-xs mb-2 flex-1 line-clamp-2">{mascot.description}</p>
                    <p className="text-yellow-500 font-bold text-sm mb-3">${mascot.price}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setCalendarMascot(mascot)} className="flex-1 flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-1.5 rounded-lg text-xs transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Calendar
                      </button>
                      <button onClick={() => handleEditOpen(mascot)} className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-yellow-100 text-gray-700 font-semibold py-1.5 rounded-lg text-xs transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(mascot.id)} className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-red-100 text-red-500 font-semibold py-1.5 rounded-lg text-xs transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginated.map(mascot => (
                <div key={mascot.id} className="bg-white border border-gray-200 rounded-xl flex items-center gap-4 p-4 hover:shadow-md transition-shadow">
                  <div className="w-20 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {mascot.image ? <img src={mascot.image} alt={mascot.name} className="object-cover w-full h-full rounded-lg" /> : <span className="text-2xl">🎭</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-bold text-sm">{mascot.name}</p>
                    <p className="text-gray-400 text-xs">{mascot.category} · {mascot.description}</p>
                  </div>
                  <p className="text-yellow-500 font-bold text-sm mr-4">${mascot.price}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setCalendarMascot(mascot)} className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Calendar
                    </button>
                    <button onClick={() => handleEditOpen(mascot)} className="flex items-center gap-1 bg-gray-100 hover:bg-yellow-100 text-gray-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      Edit
                    </button>
                    <button onClick={() => setDeleteConfirm(mascot.id)} className="flex items-center gap-1 bg-gray-100 hover:bg-red-100 text-red-500 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-400 text-xs">Showing page {page} of {totalPages} pages</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${p === page ? "bg-yellow-400 text-black" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </main>
      </div>

      {calendarMascot && <MascotCalendarModal mascot={calendarMascot} onClose={() => setCalendarMascot(null)} />}

      {addModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-screen overflow-y-auto">
            <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-black font-extrabold text-lg">Add New Mascot</h2>
              <button onClick={() => setAddModal(false)} className="text-black hover:opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <MascotForm form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} imageRef={imageRef} handleImageChange={handleImageChange} />
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setAddModal(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="flex-1 py-2.5 bg-yellow-400 text-black font-bold rounded-xl text-sm hover:bg-yellow-500 transition-colors">Add Mascot</button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-screen overflow-y-auto">
            <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between sticky top-0">
              <h2 className="text-black font-extrabold text-lg">Edit Mascot</h2>
              <button onClick={() => setEditModal(null)} className="text-black hover:opacity-60">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <MascotForm form={form} setForm={setForm} formErrors={formErrors} setFormErrors={setFormErrors} imageRef={imageRef} handleImageChange={handleImageChange} />
            <div className="px-6 pb-6 flex gap-3">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-gray-900 font-extrabold text-lg mb-1">Delete Mascot?</h3>
            <p className="text-gray-500 text-sm mb-6">This will remove the mascot from the database and customer site. This cannot be undone.</p>
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
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><radialGradient id="ig4" cx="19%" cy="99%" r="108%"><stop offset="0%" stopColor="#ffd600" /><stop offset="30%" stopColor="#ff6930" /><stop offset="60%" stopColor="#e4318f" /><stop offset="100%" stopColor="#6b3cce" /></radialGradient><circle cx="24" cy="24" r="24" fill="url(#ig4)" /><rect x="13" y="13" width="22" height="22" rx="6" ry="6" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="31" cy="17" r="1.5" fill="white" /></svg></a>
        </div>
      </footer>
    </div>
  );
}
