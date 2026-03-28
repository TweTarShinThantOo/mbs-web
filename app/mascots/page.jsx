"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

const categories = [
  { label: "Princess", icon: "👸" },
  { label: "Animals", icon: "🐾" },
  { label: "Superhero", icon: "🦸" },
  { label: "Prince", icon: "🤴" },
  { label: "Others", icon: "✨" },
];

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

function GridIcon({ active }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${active ? "text-yellow-500" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ListIcon({ active }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${active ? "text-yellow-500" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function MascotsPage() {
  // ✅ Fetch directly from Supabase — maps Supabase column names to UI field names
  const [mascots, setMascots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
  async function fetchMascots() {
    try {
      const { data, error } = await supabase.from("mascots").select("*");
      if (error) throw error;
      const mapped = (data || []).map(m => ({
  id: m.mascot_id,
  name: m.mascot_name,
  category: m.Category,  // ✅ capital C
  description: m.description || "",
  price: m.price,
  image: m.image || null,  // ✅ also changed from image_url to image
}));
      console.log("Mapped mascots:", mapped); // ✅ here
      setMascots(mapped);
    } catch (err) {
      console.error("Failed to fetch mascots:", err);
    } finally {
      setLoading(false);
    }
  }
  fetchMascots();
}, []);
 

  const filtered = mascots.filter((m) => {
    const matchCategory = selectedCategory === "All" || m.category === selectedCategory;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Navbar />
      <div className="px-8 pt-4 pb-1">
        <span className="text-gray-300 text-sm font-semibold tracking-widest uppercase">Mascot Lists</span>
      </div>
      <main className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${showFilter ? "bg-yellow-400 border-yellow-400 text-black" : "bg-white border-gray-300 text-gray-600 hover:border-yellow-400"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filter by Mascot Category
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showFilter ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg border transition-colors ${viewMode === "grid" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-400"}`}>
                <GridIcon active={viewMode === "grid"} />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg border transition-colors ${viewMode === "list" ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-400"}`}>
                <ListIcon active={viewMode === "list"} />
              </button>
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-2 w-48">
              <input className="flex-1 text-sm text-gray-700 focus:outline-none" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading mascots...
            </div>
          ) : (
            <div className="flex gap-6">
              {showFilter && (
                <div className="w-40 flex-shrink-0 bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <button onClick={() => setSelectedCategory("All")} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold mb-1 transition-colors ${selectedCategory === "All" ? "bg-yellow-400 text-black" : "text-gray-600 hover:bg-yellow-50"}`}>
                    All
                  </button>
                  {categories.map((cat) => (
                    <button key={cat.label} onClick={() => setSelectedCategory(cat.label)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-colors ${selectedCategory === cat.label ? "bg-yellow-400 text-black font-semibold" : "text-gray-600 hover:bg-yellow-50"}`}>
                      <span>{cat.icon}</span>{cat.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex-1">
                {filtered.length === 0 ? (
                  <div className="py-20 text-center text-gray-400">No mascots found.</div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((mascot) => (
                      <div key={mascot.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="w-full h-36 bg-yellow-100 flex items-center justify-center overflow-hidden">
                          {mascot.image ? (
                            <img src={mascot.image} alt={mascot.name} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-20 h-20 bg-yellow-300 rounded-xl flex items-center justify-center">
                              <span className="text-yellow-700 text-3xl">🎭</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                          <p className="text-gray-800 font-semibold text-sm mb-1">{mascot.name}</p>
                          <p className="text-gray-400 text-xs mb-1 flex-1">{mascot.category}</p>
                          <p className="text-yellow-500 font-bold text-sm mb-3">${mascot.price}</p>
                          <Link href={`/mascots/${mascot.id}`} className="block text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg transition-colors text-xs">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filtered.map((mascot) => (
                      <div key={mascot.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 p-4">
                        <div className="w-20 h-16 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {mascot.image ? (
                            <img src={mascot.image} alt={mascot.name} className="object-cover w-full h-full rounded-lg" />
                          ) : (
                            <span className="text-2xl">🎭</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-semibold text-sm">{mascot.name}</p>
                          <p className="text-gray-400 text-xs">{mascot.category} · {mascot.description}</p>
                        </div>
                        <p className="text-yellow-500 font-bold text-sm mr-4">${mascot.price}</p>
                        <Link href={`/mascots/${mascot.id}`} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-5 rounded-lg transition-colors text-xs flex-shrink-0">
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
