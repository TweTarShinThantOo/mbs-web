"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Profile
                </Link>
               
                <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 text-sm font-medium bg-yellow-50 border-l-4 border-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Setting
                </Link>
                <div className="border-t border-gray-100" />
                <Link href="/logout" onClick={() => setDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </Link>
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
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1877F2" /><path d="M29 14h-3c-1.1 0-2 .9-2 2v3h5l-.7 5H24v13h-5V24h-3v-5h3v-3c0-3.3 2.7-6 6-6h4v4z" fill="white" /></svg></a>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="black" /><path d="M31 14c.5 2.5 2.5 4 5 4v4c-2 0-3.8-.7-5-1.8V29c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.4 0 .7 0 1 .1v4.1c-.3-.1-.7-.1-1-.1-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V14h4z" fill="white" /></svg></a>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 48 48"><radialGradient id="ig" cx="19%" cy="99%" r="108%"><stop offset="0%" stopColor="#ffd600" /><stop offset="30%" stopColor="#ff6930" /><stop offset="60%" stopColor="#e4318f" /><stop offset="100%" stopColor="#6b3cce" /></radialGradient><circle cx="24" cy="24" r="24" fill="url(#ig)" /><rect x="13" y="13" width="22" height="22" rx="6" ry="6" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2.5" /><circle cx="31" cy="17" r="1.5" fill="white" /></svg></a>
      </div>
    </footer>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();

  // Day/Night mode
  const [nightMode, setNightMode] = useState(false);

  // 2FA
  const [twoFA, setTwoFA] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verified, setVerified] = useState(false);

  // Apply night mode to body
  useEffect(() => {
    if (nightMode) {
      document.body.style.backgroundColor = "#111";
      document.body.style.filter = "brightness(0.85)";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.filter = "";
    }
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.filter = "";
    };
  }, [nightMode]);

  const handleVerify = () => {
    if (code.length !== 6 || isNaN(code)) {
      setCodeError("Please enter a valid 6-digit code.");
      return;
    }
    setCodeError("");
    setVerified(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">You need to log in to access settings.</p>
          <Link href="/auth" className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg text-sm">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Navbar />

      <div className="px-8 pt-3 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Setting Page</span>
      </div>

      <main className="flex-1 px-6 pb-8">
        <div className="bg-yellow-400 rounded-xl shadow-lg p-8 min-h-96">

          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <h1 className="text-black font-extrabold text-2xl">Security Setting</h1>
            </div>

            {/* Day / Night toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNightMode(false)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${!nightMode ? "bg-white text-gray-800 shadow-md" : "bg-transparent text-black"}`}
              >
                <span>☀️</span> DAY MODE
              </button>
              <button
                onClick={() => setNightMode(true)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${nightMode ? "bg-gray-900 text-white shadow-md" : "bg-transparent text-black"}`}
              >
                NIGHT MODE <span>🌙</span>
              </button>
            </div>
          </div>

          {/* 2FA Card */}
          <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">

            {/* 2FA Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 font-bold text-lg">Two-Factor Authentication</h2>
              {/* Toggle */}
              <button
                onClick={() => { setTwoFA(!twoFA); setVerified(false); setCode(""); setCodeError(""); }}
                className={`relative inline-flex items-center w-14 h-7 rounded-full transition-colors ${twoFA ? "bg-gray-800" : "bg-gray-300"}`}
              >
                <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transition-transform ${twoFA ? "translate-x-8" : "translate-x-1"}`} />
                <span className={`absolute text-xs font-bold transition-all ${twoFA ? "left-2 text-white" : "right-1 text-gray-500"}`}>
                  {twoFA ? "ON" : "OFF"}
                </span>
              </button>
            </div>

            {/* Description box */}
            <div className="border border-gray-200 rounded-lg px-4 py-3 mb-5 bg-gray-50">
              <p className="text-gray-600 text-sm leading-relaxed">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
            </div>

            {/* 2FA content — only when ON */}
            {twoFA && (
              <div>
                {verified ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-900 font-bold text-base">Two-Factor Authentication Enabled!</p>
                    <p className="text-gray-500 text-sm mt-1">Your account is now more secure.</p>
                  </div>
                ) : (
                  <div className="flex gap-8 items-start">

                    {/* Left — QR + steps */}
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                        <p className="text-gray-700 text-sm">Scan the QR code below with your authentication app.</p>
                      </div>
                      <div className="flex items-start gap-2 mb-4">
                        <span className="w-6 h-6 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                        <p className="text-gray-700 text-sm">Enter the 6-digit code generated by the app.</p>
                      </div>

                      {/* QR Code (simulated) */}
                      <div className="w-28 h-28 bg-white border-2 border-gray-800 rounded-lg p-1 mb-3">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          {/* Simulated QR pattern */}
                          <rect width="100" height="100" fill="white"/>
                          {/* Corner squares */}
                          <rect x="5" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="4"/>
                          <rect x="10" y="10" width="15" height="15" fill="black"/>
                          <rect x="70" y="5" width="25" height="25" fill="none" stroke="black" strokeWidth="4"/>
                          <rect x="75" y="10" width="15" height="15" fill="black"/>
                          <rect x="5" y="70" width="25" height="25" fill="none" stroke="black" strokeWidth="4"/>
                          <rect x="10" y="75" width="15" height="15" fill="black"/>
                          {/* Data dots */}
                          {[35,40,45,50,55,60,65].map(x =>
                            [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90].map(y =>
                              Math.random() > 0.5 ? <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="black"/> : null
                            )
                          )}
                        </svg>
                      </div>

                      <p className="text-gray-400 text-xs">
                        Can't scan QR code?{" "}
                        <button className="text-yellow-600 hover:underline font-medium">Enter setup key</button>
                      </p>
                    </div>

                    {/* Right — Code input */}
                    <div className="flex-1 pt-8">
                      <div className="mb-1">
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="6-Digit Code"
                          value={code}
                          onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setCodeError(""); }}
                          className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <p className="text-gray-400 text-xs mt-1 ml-1">Enter the 6_digit code</p>
                      </div>

                      {codeError && <p className="text-red-500 text-xs mb-2">{codeError}</p>}

                      <button
                        onClick={handleVerify}
                        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors text-sm mt-2"
                      >
                        Verify Code
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* When 2FA is OFF */}
            {!twoFA && (
              <p className="text-gray-400 text-sm text-center py-4">
                Two-factor authentication is currently <span className="font-semibold text-gray-600">disabled</span>. Toggle ON to enable it.
              </p>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}