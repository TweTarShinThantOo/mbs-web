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
        <Link href="/track" className="hover:text-yellow-400 transition-colors">Track</Link>
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

function generateTicket() {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CMR-${dateStr}-${rand}`;
}

export default function BookingPage() {
  const router = useRouter();
  const { cart, total: cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [additionalFees, setAdditionalFees] = useState({ extraStaff: false, photoVideo: false });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const extraStaffFee = additionalFees.extraStaff ? 10 : 0;
  const photoVideoFee = additionalFees.photoVideo ? 15 : 0;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + tax + extraStaffFee + photoVideoFee;

  const handleConfirm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const ticket = generateTicket();

    const booking = {
      id: ticket,
      customer: name.trim(),
      phone: phone,
      event: cart.map(item => item.name).join(", "),
      bookingDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      location: address,
      address: address,
      payment: `${paymentMethod} — $${total}`,
      total: total,
      status: "Pending",
      addOns: [
        ...(additionalFees.extraStaff ? ["Extra Staff"] : []),
        ...(additionalFees.photoVideo ? ["Photo & Video"] : []),
      ],
    };

    // Save to sessionStorage for track page
    sessionStorage.setItem(`booking_${ticket}`, JSON.stringify(booking));

    // Mark each mascot's booked date as unavailable
    try {
      const bookedDates = JSON.parse(localStorage.getItem("cmr_booked_dates") || "{}");
      cart.forEach(item => {
        if (item.date && item.id) {
          const mascotId = String(item.id);
          if (!bookedDates[mascotId]) bookedDates[mascotId] = [];
          if (!bookedDates[mascotId].includes(item.date)) {
            bookedDates[mascotId].push(item.date);
          }
        }
      });
      localStorage.setItem("cmr_booked_dates", JSON.stringify(bookedDates));
    } catch {}

    // Also save directly to localStorage so admin sees it immediately
    try {
      const existing = JSON.parse(localStorage.getItem("cmr_bookings") || "[]");
      const deletedIds = JSON.parse(localStorage.getItem("cmr_deleted_bookings") || "[]");
      if (!existing.find(b => b.id === booking.id) && !deletedIds.includes(booking.id)) {
        const adminBooking = {
          id: booking.id,
          event: booking.event,
          customer: booking.customer,
          date: booking.bookingDate,
          status: booking.status,
          phone: booking.phone,
          location: booking.address,
          payment: booking.payment,
        };
        localStorage.setItem("cmr_bookings", JSON.stringify([...existing, adminBooking]));
      }
    } catch {}

    clearCart();
    router.push(
      `/confirmation?ticket=${ticket}&total=${total}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-800">
      <Navbar />

      <div className="px-8 pt-4 pb-1">
        <span className="text-gray-400 text-sm tracking-widest uppercase">Checkout Page</span>
      </div>

      <main className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Cart Summary */}
          <div className="px-8 py-5 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-700 mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="py-6 text-center text-gray-400">
                No items in cart.{" "}
                <Link href="/mascots" className="text-yellow-500 underline">Browse mascots</Link>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={item.id} className={`flex items-center gap-6 py-4 ${idx < cart.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? <img src={item.image} alt={item.name} className="object-cover w-full h-full" /> : <span className="text-gray-400 text-xs">Image</span>}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.details}</p>
                    {item.date && <p className="text-gray-400 text-xs mt-1">📅 {item.date}</p>}
                  </div>
                  <span className="text-gray-800 font-bold text-sm">${item.price}</span>
                </div>
              ))
            )}
          </div>

          {/* User Information */}
          <div className="px-8 py-5 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-800 mb-4">User Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                  className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.name ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="0XX-XXX-XXXX"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                  className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.phone ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Event address"
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: "" })); }}
                  className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.address ? "border-red-400" : "border-gray-300"}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method & Additional Fees */}
          <div className="px-8 py-5 border-b border-gray-200">
            <div className="flex items-center gap-6 mb-4">
              <span className="text-sm font-medium text-gray-700 w-36 flex-shrink-0">Payment Method:</span>
              <div className="flex items-center gap-6 flex-wrap">
                {["Banking", "Credit Card", "E-Wallet"].map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <div
                      onClick={() => setPaymentMethod(method)}
                      className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center transition-colors ${paymentMethod === method ? "bg-yellow-400 border-yellow-400" : "border-gray-400 bg-white"}`}
                    >
                      {paymentMethod === method && (
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {method}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-700 w-36 flex-shrink-0">Additional Fees:</span>
              <div className="flex items-center gap-6 flex-wrap">
                {[{ key: "extraStaff", label: "Extra Staff ( 10$ )" }, { key: "photoVideo", label: "Photo and Video Session ( 15$ )" }].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <div
                      onClick={() => setAdditionalFees((prev) => ({ ...prev, [key]: !prev[key] }))}
                      className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center transition-colors ${additionalFees[key] ? "bg-yellow-400 border-yellow-400" : "border-gray-400 bg-white"}`}
                    >
                      {additionalFees[key] && (
                        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Total + Actions */}
          <div className="px-8 py-5 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Total ( Tax Included ): </span>
              <span className="text-gray-900 font-bold text-base">${total}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={cart.length === 0}
                className="px-7 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors text-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="px-7 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}