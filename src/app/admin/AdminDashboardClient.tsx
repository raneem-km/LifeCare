"use client";

import { useState } from "react";
import { deleteBooking, deleteReview } from "@/app/actions";

interface SerializedBooking {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
  reason: string;
  doctor: string | null;
  date: string;
  createdAt: string;
}

interface SerializedReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

interface AdminDashboardClientProps {
  initialBookings: SerializedBooking[];
  initialReviews: SerializedReview[];
}

export default function AdminDashboardClient({
  initialBookings = [],
  initialReviews = []
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"bookings" | "reviews">("bookings");
  const [bookings, setBookings] = useState<SerializedBooking[]>(initialBookings);
  const [reviews, setReviews] = useState<SerializedReview[]>(initialReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Are you sure you want to delete this appointment booking?")) return;
    setLoadingId(id);
    const res = await deleteBooking(id);
    if (res.success) {
      setBookings(prev => prev.filter(b => b.id !== id));
    } else {
      alert(res.error || "Failed to delete booking");
    }
    setLoadingId(null);
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setLoadingId(id);
    const res = await deleteReview(id);
    if (res.success) {
      setReviews(prev => prev.filter(r => r.id !== id));
    } else {
      alert(res.error || "Failed to delete review");
    }
    setLoadingId(null);
  };

  const filteredBookings = bookings.filter(b => {
    const fullName = `${b.firstName} ${b.lastName || ""}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    return (
      fullName.includes(query) ||
      b.phone.includes(query) ||
      b.reason.toLowerCase().includes(query) ||
      (b.doctor && b.doctor.toLowerCase().includes(query))
    );
  });

  const filteredReviews = reviews.filter(r => {
    const query = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(query) ||
      r.text.toLowerCase().includes(query)
    );
  });

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-secondary to-primary text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-3 backdrop-blur-md">
            Clinic Control Center
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Patient Management Portal</h1>
          <p className="text-white/80 text-sm mt-1">Real-time view of patient appointment bookings and clinic reviews.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20">
            <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
            <div>
              <p className="font-bold text-sm leading-tight">Database Connected</p>
              <p className="text-xs text-white/70">Neon PostgreSQL Live</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none outline-none"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-3xl">calendar_month</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Appointments</p>
            <p className="text-3xl font-extrabold text-secondary">{bookings.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Patient Reviews</p>
            <p className="text-3xl font-extrabold text-secondary">{reviews.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-3xl">thumb_up</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Rating</p>
            <p className="text-3xl font-extrabold text-secondary">{avgRating} / 5</p>
          </div>
        </div>
      </div>

      {/* Filter and Tab Navigation Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Tab Buttons */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer border-none outline-none ${
              activeTab === "bookings" 
                ? "bg-white text-secondary shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Appointments ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer border-none outline-none ${
              activeTab === "reviews" 
                ? "bg-white text-secondary shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-xl">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === "bookings" ? "patients, phone, doctor..." : "reviews..."}`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary outline-none text-sm text-slate-800 bg-slate-50"
          />
        </div>
      </div>

      {/* Tab 1: Bookings Table */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-secondary text-lg">Patient Appointment Bookings</h2>
            <span className="text-xs text-slate-400 font-medium">Sorted by newest first</span>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <span className="material-symbols-outlined text-5xl">event_busy</span>
              <p className="font-medium text-base">No appointment bookings found.</p>
              <p className="text-xs">When patients submit the booking form on your website, their entries will appear here live.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-4 px-6">Patient Name</th>
                    <th className="py-4 px-6">Contact Number</th>
                    <th className="py-4 px-6">Reason for Visit</th>
                    <th className="py-4 px-6">Assigned Doctor</th>
                    <th className="py-4 px-6">Preferred Date</th>
                    <th className="py-4 px-6">Submitted On</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-bold text-secondary">
                        {b.firstName} {b.lastName || ""}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-600">
                        <a href={`tel:${b.phone}`} className="hover:text-primary transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">call</span>
                          {b.phone}
                        </a>
                      </td>
                      <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                        {b.reason}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                          {b.doctor || "General Consultation"}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-700">
                        {b.date}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        {new Date(b.createdAt).toLocaleDateString()} {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          disabled={loadingId === b.id}
                          onClick={() => handleDeleteBooking(b.id)}
                          className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors cursor-pointer border-none outline-none"
                        >
                          {loadingId === b.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reviews Table */}
      {activeTab === "reviews" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="font-bold text-secondary text-lg">Patient Reviews & Feedback</h2>
            <span className="text-xs text-slate-400 font-medium">Sorted by newest first</span>
          </div>

          {filteredReviews.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <span className="material-symbols-outlined text-5xl">rate_review</span>
              <p className="font-medium text-base">No patient reviews submitted yet.</p>
              <p className="text-xs">Patient reviews submitted via the website form will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {filteredReviews.map((r) => (
                <div key={r.id} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-secondary text-base">{r.name}</p>
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-base" style={{ fontVariationSettings: `'FILL' ${i < r.rating ? 1 : 0}` }}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm italic leading-relaxed">&quot;{r.text}&quot;</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200/60">
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      disabled={loadingId === r.id}
                      onClick={() => handleDeleteReview(r.id)}
                      className="px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors cursor-pointer border-none outline-none"
                    >
                      {loadingId === r.id ? "Deleting..." : "Delete Review"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
