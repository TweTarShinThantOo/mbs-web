"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabase";

const defaultInclusions = "Full costume + Performer, 3 hrs";
const defaultService = "Friendly and Energetic Mascot";
const defaultRecommendations = "Popular for all events";
const defaultNote = "Please book at least 3 days in advance";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black text-white flex items-center justify-between px-8 py-3 sticky top-0 z-50">
      <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-300">
        <span className="text-black font-extrabold text-xs text-center leading-tight px-1">Cavite<br />Mascot<br />Rentals</span>
      </div>
      <div className="flex gap-10 text-base font-semibold">
        <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <Link href="/mascots" className="text-yellow-400">Mascot</Link>
        <Link href="/track" className="hover:text-yellow-400 transition-colors">Track</Link>
        <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
      </div>
      <div className="flex items-center gap-5">
        <Link href="/cart" className="relative hover:text-yellow-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
          )}
        </Link>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-black font-bold text-sm">{user.name[0].toUpperCase()}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 bg-yellow-400">
                  <p className="text-black font-bold text-sm">{user.name}</p>
                  <p className="text-yellow-800 text-xs truncate">{user.email}</p>
                </div>
                <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Link>
                <div className="border-t border-gray-100" />
                <button onClick={() => { logout(); setDropdownOpen(false); router.push("/"); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth" className="hover:text-yellow-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-center">
      <p className="text-gray-500 text-sm mb-3">@2026 CMR Cavite Mascot Rentals<br />All Rights Reserved</p>
      <div className="flex justify-center gap-5">
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1877F2" /><path d="M29 14h-3c-1.1 0-2 .9-2 2v3h5l-.7 5H24v13h-5V24h-3v-5h3v-3c0-3.3 2.7-6 6-6h4v4z" fill="white" /></svg>
        </a>
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="black" /><path d="M31 14c.5 2.5 2.5 4 5 4v4c-2 0-3.8-.7-5-1.8V29c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.4 0 .7 0 1 .1v4.1c-.3-.1-.7-.1-1-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V14h4z" fill="white" /></svg>
        </a>
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48">
            <radialGradient id="ig" cx="19%" cy="99%" r="108%"><stop offset="0%" stopColor="#ffd600" /><stop offset="30%" stopColor="#ff6930" /><stop offset="60%" stopColor="#e4318f" /><stop offset="100%" stopColor="#6b3cce" /></radialGradient>
            <circle cx="24" cy="24" r="24" fill="url(#ig)" /><rect x="13" y="13" width="22" height="22" rx="6" ry="6" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="31" cy="17" r="1.5" fill="white" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

function MiniCalendar({ mascotId, selectedDate, onSelectDate }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [booked, setBooked] = useState([]);

 // ✅ Fetch booked dates from Supabase
useEffect(() => {
  async function fetchBookedDates() {
    try {
      // Fetch from bookings table - dates booked by customers
      const { data: bookingData } = await supabase
        .from("bookings")
        .select("event_date, event_type, status")
        .neq("status", "cancelled");

      // Fetch from availability table - dates blocked by admin
      const { data: availData } = await supabase
        .from("availability")
        .select("date, mascot_id")
        .eq("mascot_id", mascotId)
        .eq("availability_status", "booked");

      // Get mascot name to match bookings
      const { data: mascotData } = await supabase
        .from("mascots")
        .select("mascot_name")
        .eq("mascot_id", mascotId)
        .single();

      const mascotName = mascotData?.mascot_name || "";

      // From bookings - match by mascot name in event_type
      const fromBookings = (bookingData || [])
        .filter(b => b.event_type === mascotName)
        .map(b => {
          try {
            const d = new Date(b.event_date);
            if (!isNaN(d)) return d.toISOString().slice(0, 10);
          } catch {}
          return null;
        })
        .filter(Boolean);

      // From availability table
      const fromAvailability = (availData || [])
        .map(a => a.date)
        .filter(Boolean);

      setBooked([...new Set([...fromBookings, ...fromAvailability])]);
    } catch (err) {
      console.error("Failed to fetch booked dates:", err);
    }
  }
  fetchBookedDates();
}, [mascotId]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const toDateStr = (d) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isBooked = (d) => booked.includes(toDateStr(d));
  const isPast = (d) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSelected = (d) => selectedDate === toDateStr(d);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-gray-800 text-sm font-bold">{monthName}</span>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="text-center text-xs text-gray-400 font-semibold py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
          const past = isPast(d);
          const bookedDay = isBooked(d);
          const selected = isSelected(d);
          return (
            <button
              key={d}
              disabled={past || bookedDay}
              onClick={() => onSelectDate(toDateStr(d))}
              className={`w-full aspect-square flex items-center justify-center text-xs rounded-lg font-medium transition-colors
                ${selected ? "bg-yellow-400 text-black font-bold" : ""}
                ${bookedDay ? "bg-red-100 text-red-400 cursor-not-allowed line-through" : ""}
                ${past && !bookedDay ? "text-gray-300 cursor-not-allowed" : ""}
                ${!past && !bookedDay && !selected ? "hover:bg-yellow-100 text-gray-700" : ""}
              `}
            >{d}</button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <p className="text-gray-500 text-xs mb-1">You can check available date in Calendar 📅</p>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-700 text-xs font-medium">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <span className="text-gray-700 text-xs font-medium">Booked</span>
        </div>
      </div>
    </div>
  );
}

export default function MascotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [mascot, setMascot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch single mascot from Supabase by ID
  useEffect(() => {
    async function fetchMascot() {
      try {
        const { data, error } = await supabase
          .from("mascots")
          .select("*")
          .eq("mascot_id", params.id)
          .single();
        if (error) throw error;
        // ✅ Map Supabase columns to UI fields
        setMascot({
          id: data.mascot_id,
          name: data.mascot_name,
          category: data.Category,
          description: data.description || "",
          price: data.price,
          image: data.image || null,
          inclusions: data.inclusions || defaultInclusions,
          service: defaultService,
          recommendations: defaultRecommendations,
          note: defaultNote,
        });
      } catch (err) {
        console.error("Failed to fetch mascot:", err);
        setMascot(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMascot();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-white text-sm">Loading...</p>
      </div>
    </div>
  );

  if (!mascot) return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center">
        <p className="text-white text-xl mb-4">Mascot not found.</p>
        <Link href="/mascots" className="text-yellow-400 underline">Back to Mascots</Link>
      </div>
    </div>
  );

  const inclusions = mascot.inclusions || defaultInclusions;
  const service = mascot.service || defaultService;
  const recommendations = mascot.recommendations || defaultRecommendations;
  const note = mascot.note || defaultNote;

  const handleAddToCart = () => {
    if (!selectedDate) { setError("Please select an event date from the calendar."); return; }
    addToCart({ id: mascot.id, name: mascot.name, details: inclusions, date: selectedDate, price: mascot.price, image: mascot.image });
    setAdded(true);
    setError("");
  };

  const handleBookNow = () => {
    if (!selectedDate) { setError("Please select an event date from the calendar."); return; }
    addToCart({ id: mascot.id, name: mascot.name, details: inclusions, date: selectedDate, price: mascot.price, image: mascot.image });
    router.push("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Navbar />
      <div className="px-8 pt-4 pb-1">
        <span className="text-gray-300 text-sm font-semibold tracking-widest uppercase">Mascot Details</span>
      </div>
      <main className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex gap-6 mb-6">
            <div className="flex-1 bg-gray-200 rounded-xl flex items-center justify-center min-h-48 overflow-hidden">
              {mascot.image ? (
                <img src={mascot.image} alt={mascot.name} className="object-cover w-full h-full rounded-xl" />
              ) : (
                <span className="text-gray-400 text-lg font-medium">Mascot</span>
              )}
            </div>
            <div className="flex-1">
              <MiniCalendar
                mascotId={mascot.id}
                selectedDate={selectedDate}
                onSelectDate={(date) => { setSelectedDate(date); setError(""); setAdded(false); }}
              />
            </div>
          </div>

          <div className="bg-yellow-400 rounded-xl p-5 mb-4">
  <div className="flex items-start gap-2 mb-3">
    <span className="text-red-500 text-sm">❤</span>
    <p className="text-black text-sm font-medium">Service : {service} ⭐ ⭐ ⭐</p>
  </div>
  {/* ✅ Show real description from Supabase */}
  {mascot.description && (
    <div className="flex items-start gap-2 mb-3">
      <span className="text-sm">📝</span>
      <p className="text-black text-sm font-medium">{mascot.description}</p>
    </div>
  )}
  <div className="flex items-start gap-2 mb-3">
    <span className="text-sm">ℹ️</span>
    <p className="text-black text-sm font-medium">Recommendations: {recommendations}</p>
  </div>
  <div className="flex items-start gap-2">
    <span className="text-sm">📌</span>
    <p className="text-black text-sm font-medium">Note: {note}</p>
  </div>
</div>

          {selectedDate && (
            <p className="text-green-600 text-sm font-semibold mb-3">
              ✓ Selected date: {selectedDate} — ${mascot.price}
            </p>
          )}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {added && (
            <p className="text-green-600 text-sm font-semibold mb-3">
              ✓ Added to cart!{" "}
              <Link href="/cart" className="underline text-yellow-600">View Cart</Link>
            </p>
          )}

          <div className="flex gap-3">
            <button onClick={handleAddToCart} className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors text-sm">
              Add to Cart
            </button>
            <button onClick={handleBookNow} className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors text-sm">
              Book Now
            </button>
          </div>

          <Link href="/mascots" className="inline-block mt-4 text-gray-400 text-sm hover:text-gray-600">
            ← Back to Mascots
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
