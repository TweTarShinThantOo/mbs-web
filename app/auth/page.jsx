"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
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
        <Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
              <span className="text-black font-bold text-xs">{user.name[0].toUpperCase()}</span>
            </div>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-red-400 transition-colors">Log out</button>
          </div>
        ) : (
          <Link href="/auth" className="text-yellow-400 transition-colors">
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

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [tab, setTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupData, setSignupData] = useState({ fullname: "", email: "", password: "", confirm: "", phone: "" });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async () => {
    const errors = {};
    if (!loginData.email.trim()) errors.email = "Email is required";
    if (!loginData.password.trim()) errors.password = "Password is required";
    if (Object.keys(errors).length > 0) { setLoginErrors(errors); return; }

    setLoginLoading(true);
    try {
      // ✅ Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email.trim(),
        password: loginData.password,
      });

      if (error) {
        setLoginErrors({ email: error.message });
        return;
      }

      // ✅ Fetch user profile from users table
     const { data: profile } = await supabase
  .from("users")
  .select("full_name, email, phone")
  .eq("user_id", data.user.id)
  .single();

      login({
        id: data.user.id,
        name: profile?.full_name  || loginData.email.split("@")[0],
        email: data.user.email,
        phone: profile?.phone || "",
      });

      router.push("/");
    } catch (err) {
      setLoginErrors({ email: "Login failed. Please try again." });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async () => {
    const errors = {};
    if (!signupData.fullname.trim()) errors.fullname = "Full name is required";
    if (!signupData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) errors.email = "Enter a valid email";
    if (!signupData.password.trim()) errors.password = "Password is required";
    else if (signupData.password.length < 6) errors.password = "At least 6 characters";
    if (signupData.confirm !== signupData.password) errors.confirm = "Passwords do not match";
    if (Object.keys(errors).length > 0) { setSignupErrors(errors); return; }

    setSignupLoading(true);
    try {
      // ✅ Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email.trim(),
        password: signupData.password,
      });

      if (error) {
        setSignupErrors({ email: error.message });
        return;
      }

      // ✅ Save user profile to users table
      // ✅ Correct column name
await supabase.from("users").insert({
  user_id: data.user.id,
  full_name: signupData.fullname.trim(),
  email: signupData.email.trim(),
  role: "Customer",
  phone: signupData.phone.trim(), // ✅ add this
});

      login({
        id: data.user.id,
        name: signupData.fullname.trim(),
        email: signupData.email.trim(),
      });

      setSignupSuccess(true);
      setSignupErrors({});
    } catch (err) {
      setSignupErrors({ email: "Signup failed. Please try again." });
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Navbar />

      <main className="flex-1 px-6 py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="grid grid-cols-2">
            <button onClick={() => setTab("login")} className={`py-4 text-sm font-bold transition-colors ${tab === "login" ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
              Log In
            </button>
            <button onClick={() => setTab("signup")} className={`py-4 text-sm font-bold transition-colors ${tab === "signup" ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
              Sign Up
            </button>
          </div>

          <div className="px-8 pt-5 pb-0 text-center">
            <a href="/admin/login" className="text-xs text-gray-400 hover:text-yellow-600 transition-colors inline-flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Are you an Admin? Log in here
            </a>
          </div>

          <div className="px-8 py-8">
            {tab === "login" && (
              <div>
                <h2 className="text-gray-900 font-extrabold text-xl mb-1">Welcome Back</h2>
                <p className="text-gray-500 text-sm mb-6">Log in to your account to continue booking.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={loginData.email}
                      onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }); setLoginErrors({ ...loginErrors, email: "" }); }}
                      className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${loginErrors.email ? "border-red-400" : "border-gray-300"}`}
                    />
                    {loginErrors.email && <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }); setLoginErrors({ ...loginErrors, password: "" }); }}
                      className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${loginErrors.password ? "border-red-400" : "border-gray-300"}`}
                    />
                    {loginErrors.password && <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>}
                  </div>
                  <div className="text-right">
                    <button className="text-xs text-yellow-600 hover:underline">Forgot Password?</button>
                  </div>
                  <button
                    onClick={handleLogin}
                    disabled={loginLoading}
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    {loginLoading ? "Logging in..." : "Log In"}
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Do not have an account?{" "}
                    <button onClick={() => setTab("signup")} className="text-yellow-600 font-semibold hover:underline">Sign Up</button>
                  </p>
                </div>
              </div>
            )}

            {tab === "signup" && (
              <div>
                {signupSuccess ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-900 font-bold text-lg mb-1">Account Created!</p>
                    <p className="text-gray-500 text-sm mb-6">You are now logged in.</p>
                    <button onClick={() => router.push("/")} className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors text-sm">
                      Go to Home
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-gray-900 font-extrabold text-xl mb-1">Create Account</h2>
                    <p className="text-gray-500 text-sm mb-6">Register to start booking your mascots.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={signupData.fullname}
                          onChange={(e) => { setSignupData({ ...signupData, fullname: e.target.value }); setSignupErrors({ ...signupErrors, fullname: "" }); }}
                          className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.fullname ? "border-red-400" : "border-gray-300"}`}
                        />
                        {signupErrors.fullname && <p className="text-red-500 text-xs mt-1">{signupErrors.fullname}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={signupData.email}
                          onChange={(e) => { setSignupData({ ...signupData, email: e.target.value }); setSignupErrors({ ...signupErrors, email: "" }); }}
                          className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.email ? "border-red-400" : "border-gray-300"}`}
                        />
                        {signupErrors.email && <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          placeholder="Min. 6 characters"
                          value={signupData.password}
                          onChange={(e) => { setSignupData({ ...signupData, password: e.target.value }); setSignupErrors({ ...signupErrors, password: "" }); }}
                          className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.password ? "border-red-400" : "border-gray-300"}`}
                        />
                        {signupErrors.password && <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="Re-enter password"
                          value={signupData.confirm}
                          onChange={(e) => { setSignupData({ ...signupData, confirm: e.target.value }); setSignupErrors({ ...signupErrors, confirm: "" }); }}
                          className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.confirm ? "border-red-400" : "border-gray-300"}`}
                        />
                        {signupErrors.confirm && <p className="text-red-500 text-xs mt-1">{signupErrors.confirm}</p>}
                      </div>
                      <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
  <input
    type="text"
    placeholder="0XX-XXX-XXXX"
    value={signupData.phone}
    onChange={(e) => { setSignupData({ ...signupData, phone: e.target.value }); }}
    className="w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 border-gray-300"
  />
</div>
                      <button
                        onClick={handleSignup}
                        disabled={signupLoading}
                        className="w-full py-3 bg-black hover:bg-gray-800 disabled:opacity-50 text-white font-bold rounded-lg transition-colors text-sm"
                      >
                        {signupLoading ? "Creating account..." : "Create Account"}
                      </button>
                      <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <button onClick={() => setTab("login")} className="text-yellow-600 font-semibold hover:underline">Log In</button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
