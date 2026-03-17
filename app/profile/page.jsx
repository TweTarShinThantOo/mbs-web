"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <nav className="bg-black text-white flex items-center justify-between px-8 py-3 sticky top-0 z-50">
      <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-300">
        <span className="text-black font-extrabold text-xs text-center leading-tight px-1">
          Cavite<br />Mascot<br />Rentals
        </span>
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
                  Setting
                </Link>
                <div className="border-t border-gray-100" />
                <Link href="/logout" onClick={() => setDropdownOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
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

export default function ProfilePage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(user?.email || "");
  const [gender, setGender] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">You need to log in to view your profile.</p>
          <Link href="/auth" className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg text-sm">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    login({ name: `${firstName} ${lastName}`.trim(), email });
    setSaved(true);
    setErrors({});
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Navbar />

      <div className="px-8 pt-3 pb-1">
        <span className="text-gray-400 text-xs tracking-widest uppercase">Profile Page</span>
      </div>

      <main className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-8">

          {/* Welcome */}
          <h1 className="text-gray-900 font-extrabold text-2xl mb-6">
            Welcome, {user.name} 👋
          </h1>

          <div className="flex gap-8">

            {/* Left — Photo */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-300">
                {photo ? (
                  <img src={photo} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-400 text-xs">Photo</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-sm transition-colors"
              >
                Upload Photo
              </button>
            </div>

            {/* Right — Form */}
            <div className="flex-1 bg-gray-100 rounded-xl p-6">
              <h2 className="text-gray-800 font-bold text-base mb-5">Profile Information</h2>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); setErrors({ ...errors, firstName: "" }); }}
                    className={`w-full border bg-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.firstName ? "border-red-400" : "border-gray-300"}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                    className={`w-full border bg-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${errors.email ? "border-red-400" : "border-gray-300"}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Old Password</label>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

              </div>

              {/* Save */}
              <div className="mt-6 flex items-center justify-end gap-4">
                {saved && (
                  <p className="text-green-600 text-sm font-semibold flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Changes saved!
                  </p>
                )}
                <button
                  onClick={handleSave}
                  className="px-8 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors text-sm"
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}