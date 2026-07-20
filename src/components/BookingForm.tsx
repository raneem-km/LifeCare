"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBooking } from "@/app/actions";

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState("");
  const [mode, setMode] = useState("");
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Validation Error States
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Handle Phone Change (Numbers Only & 10 Digits Max)
  const handlePhoneChange = (val: string) => {
    const numericOnly = val.replace(/\D/g, "").slice(0, 10);
    setPhone(numericOnly);
    if (numericOnly.length > 0 && numericOnly.length < 10) {
      setPhoneError("Mobile number must be exactly 10 digits.");
    } else {
      setPhoneError(null);
    }
  };

  // Handle Email Change
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (val.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!fullName.trim()) {
        alert("Please enter your full name.");
        return;
      }
      if (phone.length !== 10) {
        setPhoneError("Mobile number must be exactly 10 digits.");
        return;
      }
      if (email.trim() && emailError) {
        return;
      }
    }
    if (step === 2 && (!doctor || !mode || !location || !reason)) {
      alert("Please select doctor, mode, location, and reason for visit.");
      return;
    }
    if (step === 3 && (!date || !time)) {
      alert("Please select appointment date and preferred time slot.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setPhoneError("Mobile number must be exactly 10 digits.");
      setStep(1);
      return;
    }

    if (email.trim() && emailError) {
      setStep(1);
      return;
    }

    setIsLoading(true);

    const res = await createBooking({
      firstName: fullName,
      phone: phone,
      email: email.trim() || undefined,
      reason: reason,
      symptoms: symptoms.trim() || undefined,
      doctor: doctor,
      mode: mode,
      location: location,
      time: time,
      date: date,
    });

    if (res.success) {
      setIsSubmitted(true);
    } else {
      alert(res.error || "Booking request failed. Please check your inputs.");
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setDoctor("");
    setMode("");
    setLocation("");
    setReason("");
    setSymptoms("");
    setDate("");
    setTime("");
    setPhoneError(null);
    setEmailError(null);
    setStep(1);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xl text-center h-full flex flex-col justify-center items-center space-y-4">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h3 className="text-xl font-extrabold text-secondary">Appointment Requested!</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you! Our front desk will contact you shortly via WhatsApp or phone call to confirm your final appointment slot.
        </p>
        <Button variant="outline" className="rounded-xl px-6 py-2.5 text-xs font-bold" onClick={resetForm}>
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-xl">
      {/* Progress Indicators */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                step >= num ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
              }`}
            >
              {num}
            </div>
            {num < 4 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  step > num ? "bg-primary" : "bg-slate-100"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
              <span>Step 1:</span> Personal Information
            </h4>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>👤</span> Full Name *
              </label>
              <Input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="h-12 rounded-xl border border-slate-200 focus:border-primary px-4 placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Phone Number with 10-Digit Numeric Validation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>📱</span> Mobile Number (10 Digits) *
              </label>
              <Input
                required
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="10-digit mobile number (numbers only)"
                className={`h-12 rounded-xl border px-4 placeholder:text-slate-400 font-medium ${
                  phoneError ? "border-rose-500 bg-rose-50/30" : "border-slate-200 focus:border-primary"
                }`}
              />
              {phoneError && (
                <p className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {phoneError}
                </p>
              )}
            </div>

            {/* Email Address with Regex Validation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>📧</span> Email Address (Optional)
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="your.email@example.com"
                className={`h-12 rounded-xl border px-4 placeholder:text-slate-400 font-medium ${
                  emailError ? "border-rose-500 bg-rose-50/30" : "border-slate-200 focus:border-primary"
                }`}
              />
              {emailError && (
                <p className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {emailError}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Consultation Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
              <span>Step 2:</span> Consultation Details
            </h4>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>👨‍⚕️</span> Select Doctor *
              </label>
              <select
                required
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary px-4 bg-white text-slate-800 text-sm font-medium outline-none"
              >
                <option value="">Choose your doctor</option>
                <option value="Dr. Basil AP (Chief Homeopath)">Dr. Basil AP (Chief Homeopath)</option>
                <option value="Dr. Sidrathul Munthaha (Women's Health Specialist)">Dr. Sidrathul Munthaha (Women's Health Specialist)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>💻</span> Consultation Mode *
              </label>
              <select
                required
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary px-4 bg-white text-slate-800 text-sm font-medium outline-none"
              >
                <option value="">Select mode</option>
                <option value="In-Clinic Consultation">In-Clinic Consultation</option>
                <option value="Online Video Consultation">Online Video Consultation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>📍</span> Clinic Location *
              </label>
              <select
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary px-4 bg-white text-slate-800 text-sm font-medium outline-none"
              >
                <option value="">Choose location</option>
                <option value="Main Clinic (JSS Shopping Mall, Manjeri)">Main Clinic (JSS Shopping Mall, Manjeri)</option>
                <option value="Karaparambu Branch">Karaparambu Branch</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>🩺</span> Primary Specialty / Category *
              </label>
              <select
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary px-4 bg-white text-slate-800 text-sm font-medium outline-none"
              >
                <option value="">Select specialty category</option>
                <option value="Respiratory Diseases">Respiratory Diseases</option>
                <option value="Digestive System Diseases">Digestive System Diseases</option>
                <option value="Fertility Care">Fertility Care</option>
                <option value="Urinary Tract Care">Urinary Tract Care</option>
                <option value="Children's Diseases">Children's Diseases</option>
                <option value="Youth Care">Youth Care</option>
                <option value="Skin Disorders">Skin Disorders</option>
                <option value="Lifestyle Diseases">Lifestyle Diseases</option>
                <option value="Mental Health Issues">Mental Health Issues</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: Appointment Scheduling */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
              <span>Step 3:</span> Appointment Scheduling
            </h4>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>📅</span> Preferred Date *
              </label>
              <Input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 rounded-xl border border-slate-200 focus:border-primary px-4 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>⏰</span> Preferred Time Slot *
              </label>
              <select
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary px-4 bg-white text-slate-800 text-sm font-medium outline-none"
              >
                <option value="">Select time slot</option>
                <option value="Morning Slot (10:00 AM - 1:00 PM)">Morning Slot (10:00 AM - 1:00 PM)</option>
                <option value="Afternoon Slot (3:30 PM - 5:30 PM)">Afternoon Slot (3:30 PM - 5:30 PM)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: Symptoms & Additional Information */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
              <span>Step 4:</span> Reason for Visit / Symptoms
            </h4>

            <div className="flex flex-col gap-4">
              {/* Broad Category Dropdown */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                  What kind of care do you need?
                </label>
                <select 
                  id="category"
                  name="category"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select specialty category</option>
                  <option value="Respiratory Diseases">Respiratory Diseases</option>
                  <option value="Digestive System Diseases">Digestive System Diseases</option>
                  <option value="Fertility Care">Fertility Care</option>
                  <option value="Urinary Tract Care">Urinary Tract Care</option>
                  <option value="Children's Diseases">Children's Diseases</option>
                  <option value="Youth Care">Youth Care</option>
                  <option value="Skin Disorders">Skin Disorders</option>
                  <option value="Lifestyle Diseases">Lifestyle Diseases</option>
                  <option value="Mental Health Issues">Mental Health Issues</option>
                  <option value="Other">Other / Not Sure</option>
                </select>
              </div>

              {/* Custom Typed Issue (Text Area) */}
              <div>
                <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-700 mb-1">
                  Please describe your specific issue <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows={3}
                  required
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Type your symptoms, duration of illness, or reason for visit here..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 pt-4 border-t border-slate-100 justify-between items-center">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="rounded-xl px-6 h-12 font-bold"
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-secondary text-white rounded-xl px-8 h-12 font-bold hover:bg-secondary/90 transition-all hover:scale-[1.02]"
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white rounded-xl px-8 h-12 font-bold hover:bg-primary/95 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              {isLoading ? "Submitting..." : "Confirm & Request Visit"}
              <span>→</span>
            </Button>
          )}
        </div>
        
        {step === 4 && (
          <p className="text-[11px] text-slate-400 text-center leading-normal mt-2">
            By submitting this form, your request will be reviewed by clinic staff for slot confirmation.
          </p>
        )}
      </form>
    </div>
  );
}
