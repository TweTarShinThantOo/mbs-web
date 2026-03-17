"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useAdminAuth();
  const [tab, setTab] = useState("login");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});

  const [signupData, setSignupData] = useState({ fullname: "", email: "", password: "", confirm: "", adminCode: "" });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Hardcoded admin access code for demo
  const ADMIN_CODE = "ADMIN2026";

  const handleLogin = () => {
    const errors = {};
    if (!loginData.email.trim()) errors.email = "Email is required";
    if (!loginData.password.trim()) errors.password = "Password is required";
    if (Object.keys(errors).length > 0) { setLoginErrors(errors); return; }
    adminLogin({ name: loginData.email.split("@")[0], email: loginData.email, role: "admin" });
    router.push("/admin/dashboard");
  };

  const handleSignup = () => {
    const errors = {};
    if (!signupData.fullname.trim()) errors.fullname = "Full name is required";
    if (!signupData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) errors.email = "Enter a valid email";
    if (!signupData.password.trim()) errors.password = "Password is required";
    else if (signupData.password.length < 6) errors.password = "At least 6 characters";
    if (signupData.confirm !== signupData.password) errors.confirm = "Passwords do not match";
    if (!signupData.adminCode.trim()) errors.adminCode = "Admin code is required";
    else if (signupData.adminCode !== ADMIN_CODE) errors.adminCode = "Invalid admin code";
    if (Object.keys(errors).length > 0) { setSignupErrors(errors); return; }
    adminLogin({ name: signupData.fullname, email: signupData.email, role: "admin" });
    setSignupSuccess(true);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-12">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-300">
          <span className="text-black font-extrabold text-xs text-center leading-tight px-1">Cavite<br />Mascot<br />Rentals</span>
        </div>
        <div>
          <h1 className="text-white font-extrabold text-2xl leading-tight">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Cavite Mascot Rentals — Booking System</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* Tab buttons */}
        <div className="grid grid-cols-2">
          <button
            onClick={() => setTab("login")}
            className={`py-4 text-sm font-bold transition-colors ${tab === "login" ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            Admin Log In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`py-4 text-sm font-bold transition-colors ${tab === "signup" ? "bg-yellow-400 text-black" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            Admin Sign Up
          </button>
        </div>

        <div className="px-8 py-8">

          {/* Admin badge */}
          <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-yellow-700 text-xs font-semibold">Restricted Access — Authorized Admins Only</span>
          </div>

          {/* Log In */}
          {tab === "login" && (
            <div>
              <h2 className="text-gray-900 font-extrabold text-xl mb-1">Welcome, Admin</h2>
              <p className="text-gray-500 text-sm mb-6">Log in to manage bookings and mascots.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Admin Email</label>
                  <input
                    type="email"
                    placeholder="admin@email.com"
                    value={loginData.email}
                    onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }); setLoginErrors({ ...loginErrors, email: "" }); }}
                    className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${loginErrors.email ? "border-red-400" : "border-gray-300"}`}
                  />
                  {loginErrors.email && <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }); setLoginErrors({ ...loginErrors, password: "" }); }}
                    className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${loginErrors.password ? "border-red-400" : "border-gray-300"}`}
                  />
                  {loginErrors.password && <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>}
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition-colors text-sm"
                >
                  Log In to Admin Panel
                </button>

                <p className="text-center text-sm text-gray-500">
                  New admin?{" "}
                  <button onClick={() => setTab("signup")} className="text-yellow-600 font-semibold hover:underline">Create Admin Account</button>
                </p>
              </div>
            </div>
          )}

          {/* Sign Up */}
          {tab === "signup" && (
            <div>
              {signupSuccess ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-1">Admin Account Created!</p>
                  <p className="text-gray-500 text-sm mb-6">Redirecting to dashboard...</p>
                  <button
                    onClick={() => router.push("/admin/dashboard")}
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-sm"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-gray-900 font-extrabold text-xl mb-1">Create Admin Account</h2>
                  <p className="text-gray-500 text-sm mb-6">You need a valid admin code to register.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Admin full name"
                        value={signupData.fullname}
                        onChange={(e) => { setSignupData({ ...signupData, fullname: e.target.value }); setSignupErrors({ ...signupErrors, fullname: "" }); }}
                        className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.fullname ? "border-red-400" : "border-gray-300"}`}
                      />
                      {signupErrors.fullname && <p className="text-red-500 text-xs mt-1">{signupErrors.fullname}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Admin Email</label>
                      <input
                        type="email"
                        placeholder="admin@email.com"
                        value={signupData.email}
                        onChange={(e) => { setSignupData({ ...signupData, email: e.target.value }); setSignupErrors({ ...signupErrors, email: "" }); }}
                        className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.email ? "border-red-400" : "border-gray-300"}`}
                      />
                      {signupErrors.email && <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
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
                      <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
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
                      <label className="block text-xs font-medium text-gray-700 mb-1">Admin Access Code</label>
                      <input
                        type="text"
                        placeholder="Enter admin code"
                        value={signupData.adminCode}
                        onChange={(e) => { setSignupData({ ...signupData, adminCode: e.target.value }); setSignupErrors({ ...signupErrors, adminCode: "" }); }}
                        className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${signupErrors.adminCode ? "border-red-400" : "border-gray-300"}`}
                      />
                      {signupErrors.adminCode && <p className="text-red-500 text-xs mt-1">{signupErrors.adminCode}</p>}
                      <p className="text-gray-400 text-xs mt-1">Contact the system owner to get your admin code.</p>
                    </div>

                    <button
                      onClick={handleSignup}
                      className="w-full py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition-colors text-sm"
                    >
                      Create Admin Account
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

      {/* Back to customer site */}
      <div className="mt-6">
        <a href="/" className="text-gray-500 text-sm hover:text-yellow-400 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Customer Site
        </a>
      </div>

    </div>
  );
}