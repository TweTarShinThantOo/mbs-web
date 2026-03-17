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

function EditModal({ item, onSave, onClose }) {
  const [details, setDetails] = useState(item.details);
  const [date, setDate] = useState(item.date);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-5 text-gray-800">Edit Booking — {item.name}</h2>
        <label className="block text-sm font-medium text-gray-600 mb-1">Details</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-600 mb-1">Event Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button onClick={() => onSave({ ...item, details, date })} className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
            Save
          </button>
        </div>
      </div>
    </div>
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

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateItem, total } = useCart();
  const [editingItem, setEditingItem] = useState(null);

  const handleSaveEdit = (updated) => {
    updateItem(updated);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Navbar />

      <div className="px-8 pt-4 pb-1">
        <span className="text-gray-400 text-sm tracking-widest uppercase">Shopping Cart Page</span>
      </div>

      <main className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="grid grid-cols-[180px_1fr_1fr_120px_100px] gap-4 px-8 py-4 border-b border-gray-200 bg-gray-50">
            <span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">Mascot</span>
            <span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">Name</span>
            <span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">Details</span>
            <span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">Total</span>
            <span></span>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-lg">
              Your cart is empty.{" "}
              <Link href="/mascots" className="text-yellow-500 underline hover:text-yellow-600">
                Browse mascots
              </Link>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.cartKey}
                className={`grid grid-cols-[180px_1fr_1fr_120px_100px] gap-4 items-center px-8 py-6 ${idx < cart.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
              >
                <div className="w-40 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gray-400 text-sm">Image</span>
                  )}
                </div>
                <span className="text-gray-800 font-semibold text-base">{item.name}</span>
                <div className="text-gray-500 text-sm">
                  <p>{item.details}</p>
                  <p className="mt-1 text-gray-400">📅 {item.date}</p>
                </div>
                <span className="text-gray-800 font-bold text-base">${item.price}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors border border-gray-300"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <div className="w-px h-6 bg-gray-300" />
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-yellow-100 hover:text-yellow-700 transition-colors border border-gray-300"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.5-6.5a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-semibold text-base">Subtotal</span>
                <span className="text-gray-900 font-bold text-xl">${total}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/booking")}
                  disabled={cart.length === 0}
                  className="px-7 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors text-sm tracking-wide"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => router.push("/mascots")}
                  className="px-7 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition-colors text-sm tracking-wide"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {editingItem && (
        <EditModal item={editingItem} onSave={handleSaveEdit} onClose={() => setEditingItem(null)} />
      )}
    </div>
  );
}