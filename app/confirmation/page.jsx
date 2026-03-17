"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const { cart } = useCart();
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
        <Link href="/auth" className="hover:text-yellow-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
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

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const ticket = searchParams.get("ticket") || "";
  const total = searchParams.get("total") || "0";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "—";
  const address = searchParams.get("address") || "—";

  useEffect(() => {
    if (!ticket) return;

    // Only save if booking page hasn't already saved it
    const existing = sessionStorage.getItem(`booking_${ticket}`);
    if (existing) return;

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "—";

    const booking = {
      firstName,
      lastName,
      bookingDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      location: address,
      phone: phone,
      payment: `Total: $${total}`,
      status: "PENDING",
    };

    sessionStorage.setItem(`booking_${ticket}`, JSON.stringify(booking));
  }, [ticket, total, name, phone, address]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-800">
      <Navbar />

      <div className="px-8 pt-4 pb-1">
        <span className="text-gray-400 text-sm tracking-widest uppercase">Confirmation Page</span>
      </div>

      <main className="flex-1 px-6 pb-8 flex items-center justify-center">
        <div className="w-full max-w-lg bg-yellow-400 rounded-xl px-10 py-12 flex flex-col items-center text-center">

          {/* Success icon */}
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-black font-bold text-xl mb-1">Your Booking is Successful !</h1>
          <p className="text-black font-semibold text-base mb-1">Thank You !</p>
          <p className="text-black font-semibold text-base mb-6">Your Booking ID</p>

          <div className="bg-white rounded-lg px-10 py-3 mb-8 shadow">
            <span className="text-gray-900 font-bold text-lg tracking-widest">{ticket}</span>
          </div>

          <p className="text-black text-sm mb-8 opacity-80">
            Use this ID on the <strong>Track</strong> page to check your booking status.
          </p>

          <div className="flex gap-4 w-full">
            <Link
              href="/"
              className="flex-1 bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-lg transition-colors text-sm text-center"
            >
              Back Home
            </Link>
            <Link
              href="/mascots"
              className="flex-1 bg-white hover:bg-gray-100 text-black font-bold py-3 rounded-lg transition-colors text-sm text-center"
            >
              Check More
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}