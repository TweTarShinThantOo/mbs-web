"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

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
        <span className="text-black font-extrabold text-xs text-center leading-tight px-1">
          Cavite<br />Mascot<br />Rentals
        </span>
      </div>
      <div className="flex gap-10 text-base font-semibold tracking-wide">
        <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <Link href="/mascots" className="hover:text-yellow-400 transition-colors">Mascot</Link>
        <Link href="/track" className="text-yellow-400">Track</Link>
        <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
      </div>
      <div className="flex items-center gap-5">
        <Link href="/cart" className="relative hover:text-yellow-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M10 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
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
                <button
                  onClick={() => { logout(); setDropdownOpen(false); router.push("/"); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
                >
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
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="#1877F2" />
            <path d="M29 14h-3c-1.1 0-2 .9-2 2v3h5l-.7 5H24v13h-5V24h-3v-5h3v-3c0-3.3 2.7-6 6-6h4v4z" fill="white" />
          </svg>
        </a>
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="24" fill="black" />
            <path d="M31 14c.5 2.5 2.5 4 5 4v4c-2 0-3.8-.7-5-1.8V29c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.4 0 .7 0 1 .1v4.1c-.3-.1-.7-.1-1-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V14h4z" fill="white" />
          </svg>
        </a>
        <a href="#" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48">
            <radialGradient id="ig" cx="19%" cy="99%" r="108%">
              <stop offset="0%" stopColor="#ffd600" />
              <stop offset="30%" stopColor="#ff6930" />
              <stop offset="60%" stopColor="#e4318f" />
              <stop offset="100%" stopColor="#6b3cce" />
            </radialGradient>
            <circle cx="24" cy="24" r="24" fill="url(#ig)" />
            <rect x="13" y="13" width="22" height="22" rx="6" ry="6" fill="none" stroke="white" strokeWidth="2.5" />
            <circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2.5" />
            <circle cx="31" cy="17" r="1.5" fill="white" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default function TrackPage() {
  const [ticketInput, setTicketInput] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = () => {
    const trimmed = ticketInput.trim().toUpperCase();
    if (!trimmed) return;

    setSearched(true);

    const getAdminStatus = (id) => {
      try {
        const statuses = JSON.parse(localStorage.getItem("cmr_booking_statuses") || "{}");
        return statuses[id] || null;
      } catch { return null; }
    };

    try {
      const stored = sessionStorage.getItem(`booking_${trimmed}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        const adminStatus = getAdminStatus(parsed.id || trimmed);
        const nameParts = (parsed.customer || "").split(" ");
        setResult({
          ticket: trimmed,
          firstName: nameParts[0] || "—",
          lastName: nameParts.slice(1).join(" ") || "—",
          bookingDate: parsed.bookingDate || parsed.date || "—",
          location: parsed.location || parsed.address || "—",
          phone: parsed.phone || "—",
          payment: parsed.payment || "—",
          status: adminStatus || parsed.status || "Pending",
        });
        setNotFound(false);
        return;
      }
    } catch {}

    try {
      const allBookings = JSON.parse(localStorage.getItem("cmr_bookings") || "[]");
      const found = allBookings.find(b => b.id === trimmed);
      if (found) {
        const adminStatus = getAdminStatus(trimmed);
        const nameParts = (found.customer || "").split(" ");
        setResult({
          ticket: trimmed,
          firstName: nameParts[0] || "—",
          lastName: nameParts.slice(1).join(" ") || "—",
          bookingDate: found.date || found.bookingDate || "—",
          location: found.location || found.address || "—",
          phone: found.phone || "—",
          payment: found.payment || "—",
          status: adminStatus || found.status || "Pending",
        });
        setNotFound(false);
        return;
      }
    } catch {}

    setResult(null);
    setNotFound(true);
  };

  const statusColor = (status) => {
    if (status === "Approved") return "bg-green-500 text-white";
    if (status === "Cancelled") return "bg-red-500 text-white";
    return "bg-yellow-400 text-black";
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-800">
      <Navbar />

      <div className="px-8 pt-4 pb-1">
        <span className="text-gray-400 text-sm tracking-widest uppercase">Tracking Page</span>
      </div>

      <main className="flex-1 px-6 pb-8 flex flex-col items-center">

        <div className="w-full max-w-lg bg-yellow-400 rounded-xl px-8 py-8 mb-6">
          <h2 className="text-black font-bold text-lg text-center mb-5">Track Your Booking Status</h2>
          <div className="flex gap-3">
            <input
              className="flex-1 border-2 border-white rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black bg-white"
              placeholder="Type Your Booking ID Here"
              value={ticketInput}
              onChange={(e) => {
                setTicketInput(e.target.value);
                setSearched(false);
                setNotFound(false);
                setResult(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <button
              onClick={handleTrack}
              className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm border-2 border-white"
            >
              Track
            </button>
          </div>
        </div>

        {searched && notFound && (
          <div className="w-full max-w-lg bg-black rounded-xl px-8 py-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-white font-semibold">Booking ID Not Found</span>
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Please check your booking ID and try again.</p>
          </div>
        )}

        {result && (
          <div className="w-full max-w-lg bg-black rounded-xl px-8 py-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-white font-semibold">Booking ID Found</span>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-white rounded-lg px-4 py-2 text-gray-800 font-bold text-sm text-center">
                {result.ticket}
              </div>
              <div className={`px-5 py-2 rounded-lg font-bold text-sm tracking-widest ${statusColor(result.status)}`}>
                {result.status}
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-yellow-400 px-6 py-3 text-center">
                <h3 className="text-black font-bold text-sm">Booking Details</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1">First Name</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800 text-sm font-medium">{result.firstName}</div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Last Name</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800 text-sm font-medium">{result.lastName}</div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Booking Date</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800 text-sm font-medium">{result.bookingDate}</div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Location</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800 text-sm font-medium">{result.location}</div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Phone Number</p>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800 text-sm font-medium">{result.phone}</div>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Payment</p>
                  <div className="bg-green-500 rounded-lg px-3 py-2 text-white text-sm font-bold text-center">{result.payment}</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}