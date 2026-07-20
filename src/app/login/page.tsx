"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid credentials. Authorized personnel only.");
        setLoading(false);
        return;
      }

      // Success - Redirect to Admin Portal
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("Login request error:", err);
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
        {/* Clinic Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto relative mb-2">
            <Image
              src="/images/logo.png"
              alt="Life Care Clinic Logo"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            Staff Portal Access
          </span>
          <h1 className="text-2xl font-extrabold text-secondary tracking-tight">Clinic Admin Login</h1>
          <p className="text-xs text-slate-500">Authorized clinic medical personnel only.</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex items-center gap-3">
            <span className="material-symbols-outlined text-xl text-rose-600 flex-shrink-0">gpp_maybe</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Username
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-lg">
                account_circle
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-secondary outline-none text-sm text-slate-800 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-lg">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-secondary outline-none text-sm text-slate-800 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer border-none outline-none text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                Verifying Access...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">lock_open</span>
                Authenticate & Sign In
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          Protected by HttpOnly JWT & Strict Middleware Protocol
        </div>
      </div>
    </div>
  );
}
