"use client";

import { useState } from "react";
import { softDeleteBooking, updateBookingStatus, createBooking, deleteReview } from "@/app/actions";

interface SerializedBooking {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
  email?: string | null;
  reason: string;
  symptoms?: string | null;
  mode?: string | null;
  location?: string | null;
  time?: string | null;
  doctor: string | null;
  date: string;
  status?: string | null;
  isDeleted?: boolean;
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
  
  // Filters & Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "tomorrow" | "week">("all");
  const [doctorFilter, setDoctorFilter] = useState<string>("all");
  
  // Modals & Async Loading State
  const [selectedBooking, setSelectedBooking] = useState<SerializedBooking | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Manual Entry Form State
  const [newPatientName, setNewPatientName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDoctor, setNewDoctor] = useState("Dr. Basil AP (Chief Homeopath)");
  const [newReason, setNewReason] = useState("Respiratory Diseases");
  const [newSymptoms, setNewSymptoms] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [newTime, setNewTime] = useState("Morning Slot (10:00 AM - 1:00 PM)");
  const [newStatus, setNewStatus] = useState("Confirmed");
  const [isSubmittingNew, setIsSubmittingNew] = useState(false);

  // Helper: Strip "Reason: " string prefix for clean display
  const cleanReasonText = (text: string) => {
    if (!text) return "";
    return text.replace(/^Reason:\s*/i, "").split("[Mode:")[0].trim();
  };

  // Status Change Handler
  const handleStatusChange = async (id: number, status: string) => {
    setLoadingId(id);
    const res = await updateBookingStatus(id, status);
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } else {
      alert(res.error || "Failed to update status");
    }
    setLoadingId(null);
  };

  // Soft Delete Handler (Updates is_deleted = true in PostgreSQL)
  const handleSoftDeleteBooking = async (id: number) => {
    if (!confirm("Are you sure you want to delete this appointment? (It will be hidden from the table but securely retained in PostgreSQL)")) return;
    setLoadingId(id);
    const res = await softDeleteBooking(id);
    if (res.success) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      if (selectedBooking?.id === id) setSelectedBooking(null);
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
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert(res.error || "Failed to delete review");
    }
    setLoadingId(null);
  };

  // Manual Entry Submission Handler
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPhone.replace(/\D/g, "").length !== 10) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }
    setIsSubmittingNew(true);

    const res = await createBooking({
      firstName: newPatientName,
      phone: newPhone,
      email: newEmail || undefined,
      doctor: newDoctor,
      reason: newReason,
      symptoms: newSymptoms || undefined,
      date: newDate,
      time: newTime,
      status: newStatus,
    });

    if (res.success && res.booking) {
      const created: SerializedBooking = {
        ...res.booking,
        createdAt: res.booking.createdAt.toISOString(),
      };
      setBookings((prev) => [created, ...prev]);
      setIsAddModalOpen(false);
      // Reset form
      setNewPatientName("");
      setNewPhone("");
      setNewEmail("");
      setNewSymptoms("");
    } else {
      alert(res.error || "Failed to add manual appointment.");
    }
    setIsSubmittingNew(false);
  };

  // Export to CSV Functionality
  const exportToCSV = () => {
    if (filteredBookings.length === 0) {
      alert("No appointments to export.");
      return;
    }
    const headers = ["ID", "Patient Name", "Phone", "Email", "Doctor", "Reason", "Symptoms", "Date", "Status", "Submitted On"];
    const rows = filteredBookings.map((b) => [
      b.id,
      `"${b.firstName} ${b.lastName || ""}"`,
      `"${b.phone}"`,
      `"${b.email || ""}"`,
      `"${b.doctor || ""}"`,
      `"${cleanReasonText(b.reason)}"`,
      `"${(b.symptoms || "").replace(/"/g, '""')}"`,
      `"${b.date}"`,
      `"${b.status || "Pending"}"`,
      `"${new Date(b.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LifeCare_Appointments_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Schedule Functionality
  const printSchedule = () => {
    window.print();
  };

  // Filter Logic
  const filteredBookings = bookings.filter((b) => {
    const fullName = `${b.firstName} ${b.lastName || ""}`.toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      fullName.includes(query) ||
      b.phone.includes(query) ||
      cleanReasonText(b.reason).toLowerCase().includes(query) ||
      (b.symptoms && b.symptoms.toLowerCase().includes(query)) ||
      (b.doctor && b.doctor.toLowerCase().includes(query));

    // Doctor Filter
    const matchesDoctor =
      doctorFilter === "all" ||
      (b.doctor && b.doctor.toLowerCase().includes(doctorFilter.toLowerCase()));

    // Date Filter Logic
    const bookingDateStr = b.date; // e.g. "2026-07-20"
    const todayStr = new Date().toISOString().split("T")[0];
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekEndStr = weekEnd.toISOString().split("T")[0];

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = bookingDateStr === todayStr;
    } else if (dateFilter === "tomorrow") {
      matchesDate = bookingDateStr === tomorrowStr;
    } else if (dateFilter === "week") {
      matchesDate = bookingDateStr >= todayStr && bookingDateStr <= weekEndStr;
    }

    return matchesSearch && matchesDoctor && matchesDate;
  });

  const filteredReviews = reviews.filter((r) => {
    const query = searchTerm.toLowerCase();
    return r.name.toLowerCase().includes(query) || r.text.toLowerCase().includes(query);
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="space-y-8 print:p-0">
      {/* Header Banner (Hidden on print) */}
      <div className="bg-gradient-to-r from-secondary to-primary text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full inline-block mb-3 backdrop-blur-md">
            Clinic Control Center
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Patient Management Portal</h1>
          <p className="text-white/80 text-sm mt-1">Real-time view of patient appointment bookings and clinic reviews.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none outline-none"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            + Add Appointment
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none outline-none"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards (Hidden on print) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 print:hidden">
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

      {/* Filter, Search, Export & Tab Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 print:hidden">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          {/* Tab Buttons */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border-none outline-none ${
                activeTab === "bookings" ? "bg-white text-secondary shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Appointments ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border-none outline-none ${
                activeTab === "reviews" ? "bg-white text-secondary shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>

          {/* Action Buttons: Export CSV & Print Schedule */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border-none"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Export to CSV
            </button>
            <button
              onClick={printSchedule}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border-none"
            >
              <span className="material-symbols-outlined text-base">print</span>
              Print Schedule
            </button>
          </div>
        </div>

        {/* Dropdown Filters & Search */}
        {activeTab === "bookings" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search patient, phone, symptoms..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none text-xs text-slate-800 bg-slate-50"
              />
            </div>

            {/* Date Filter Dropdown */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 outline-none focus:border-primary"
              >
                <option value="all">📅 All Dates</option>
                <option value="today">Today&apos;s Appointments</option>
                <option value="tomorrow">Tomorrow&apos;s Appointments</option>
                <option value="week">Next 7 Days (This Week)</option>
              </select>
            </div>

            {/* Doctor Filter Dropdown */}
            <div className="relative">
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 outline-none focus:border-primary"
              >
                <option value="all">👨‍⚕️ All Doctors</option>
                <option value="Dr. Basil">Dr. Basil AP</option>
                <option value="Dr. Sidrathul">Dr. Sidrathul Munthaha</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Printable Header */}
      <div className="hidden print:block mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Life Care Homeopathic Clinic</h1>
        <p className="text-sm text-slate-600">Patient Appointment Schedule — Printed on {new Date().toLocaleDateString()}</p>
      </div>

      {/* Tab 1: Bookings Table */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden print:shadow-none print:border-none">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center print:hidden">
            <h2 className="font-bold text-secondary text-lg">Patient Appointment Bookings ({filteredBookings.length})</h2>
            <span className="text-xs text-slate-400 font-medium">Sorted by newest first</span>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <span className="material-symbols-outlined text-5xl">event_busy</span>
              <p className="font-medium text-base">No matching appointment bookings found.</p>
              <p className="text-xs">Adjust your search term or date/doctor dropdown filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-400 tracking-wider">
                    <th className="py-4 px-5">Patient Name</th>
                    <th className="py-4 px-5">Contact</th>
                    <th className="py-4 px-5">Doctor</th>
                    <th className="py-4 px-5">Reason / Symptoms</th>
                    <th className="py-4 px-5">Preferred Date</th>
                    <th className="py-4 px-5">Status</th>
                    <th className="py-4 px-5 text-right print:hidden">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-5 font-bold text-secondary">
                        {b.firstName} {b.lastName || ""}
                      </td>
                      <td className="py-4 px-5 font-medium text-slate-600">
                        <a href={`tel:${b.phone}`} className="hover:text-primary transition-colors flex items-center gap-1 text-xs">
                          <span className="material-symbols-outlined text-sm">call</span>
                          {b.phone}
                        </a>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-[11px] font-semibold">
                          {b.doctor || "General Consultation"}
                        </span>
                      </td>
                      {/* Cleaned Text Display without "Reason: " string */}
                      <td className="py-4 px-5 text-slate-600 max-w-xs">
                        <p className="font-semibold text-xs text-slate-800">{cleanReasonText(b.reason)}</p>
                        {b.symptoms && (
                          <p className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5" title={b.symptoms}>
                            {b.symptoms}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-5 font-semibold text-slate-700 text-xs">
                        {b.date}
                      </td>
                      {/* Status Dropdown Selector */}
                      <td className="py-4 px-5">
                        <select
                          disabled={loadingId === b.id}
                          value={b.status || "Pending"}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${
                            (b.status || "Pending") === "Confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : (b.status || "Pending") === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : (b.status || "Pending") === "Cancelled"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      {/* Action Buttons: View Details Modal & Soft Delete */}
                      <td className="py-4 px-5 text-right print:hidden">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold text-xs transition-colors cursor-pointer border-none"
                          >
                            View
                          </button>
                          <button
                            disabled={loadingId === b.id}
                            onClick={() => handleSoftDeleteBooking(b.id)}
                            className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors cursor-pointer border-none"
                          >
                            {loadingId === b.id ? "..." : "Delete"}
                          </button>
                        </div>
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
                      className="px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold text-xs transition-colors cursor-pointer border-none"
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

      {/* MODAL 1: View Patient Details Popup */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 relative border border-slate-100">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center border-none cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                Patient History & Details
              </span>
              <h3 className="text-2xl font-bold text-secondary">
                {selectedBooking.firstName} {selectedBooking.lastName || ""}
              </h3>
              <p className="text-xs text-slate-400">Booking ID: #{selectedBooking.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <p className="text-slate-400 font-bold uppercase">Phone Number</p>
                <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedBooking.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase">Email Address</p>
                <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedBooking.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase">Assigned Doctor</p>
                <p className="font-semibold text-secondary text-sm mt-0.5">{selectedBooking.doctor || "General"}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase">Preferred Date</p>
                <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedBooking.date}</p>
              </div>
              {selectedBooking.time && (
                <div>
                  <p className="text-slate-400 font-bold uppercase">Time Slot</p>
                  <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedBooking.time}</p>
                </div>
              )}
              {selectedBooking.mode && (
                <div>
                  <p className="text-slate-400 font-bold uppercase">Mode</p>
                  <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedBooking.mode}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Reason for Visit / Category</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-sm font-semibold text-slate-800">
                {cleanReasonText(selectedBooking.reason)}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Specific Symptoms & Notes</p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                {selectedBooking.symptoms || "No specific symptom details provided by patient."}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Submitted on {new Date(selectedBooking.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 bg-secondary text-white font-bold rounded-xl text-xs cursor-pointer border-none"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Manual Entry Appointment Popup */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl space-y-6 relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center border-none cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                Receptionist Manual Entry
              </span>
              <h3 className="text-2xl font-bold text-secondary">Add New Appointment</h3>
              <p className="text-xs text-slate-400">Enter details for walk-in or phone call booking.</p>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-600">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Mobile (10 Digits) *</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="9876543210"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Doctor *</label>
                  <select
                    value={newDoctor}
                    onChange={(e) => setNewDoctor(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs bg-white"
                  >
                    <option value="Dr. Basil AP (Chief Homeopath)">Dr. Basil AP</option>
                    <option value="Dr. Sidrathul Munthaha (Women's Health Specialist)">Dr. Sidrathul Munthaha</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs bg-white"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Appointment Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Time Slot *</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs bg-white"
                  >
                    <option value="Morning Slot (10:00 AM - 1:00 PM)">Morning Slot (10am-1pm)</option>
                    <option value="Afternoon Slot (3:30 PM - 5:30 PM)">Afternoon Slot (3:30pm-5:30pm)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-600">Reason / Symptoms Description</label>
                <textarea
                  rows={3}
                  value={newSymptoms}
                  onChange={(e) => setNewSymptoms(e.target.value)}
                  placeholder="Enter patient symptoms or reason for visit..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs cursor-pointer border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNew}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer border-none disabled:opacity-50"
                >
                  {isSubmittingNew ? "Saving..." : "Save Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
