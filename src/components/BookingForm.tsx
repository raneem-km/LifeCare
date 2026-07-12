"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "@/app/actions";

export default function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const date = formData.get("date") as string;
    
    if (firstName && phone && reason && date) {
      const res = await createBooking({
        firstName,
        lastName: lastName || undefined,
        phone,
        reason,
        doctor: doctor ?? undefined,
        date
      });
      
      if (res.success) {
        setIsSubmitted(true);
      } else {
        alert("Booking request failed. Please try again.");
      }
    }
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full bg-surface-container-lowest p-8 rounded-2xl shadow-soft text-center h-full flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h3 className="text-headline-sm font-bold text-primary mb-2">Appointment Requested!</h3>
        <p className="text-on-surface-variant mb-6">Thank you. Our front desk will call you shortly to confirm your exact time slot.</p>
        <Button variant="outline" onClick={() => { setIsSubmitted(false); setReason(null); setDoctor(null); }}>
          Book another visit
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface-container-lowest p-8 rounded-2xl shadow-soft">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md text-on-surface-variant font-medium">First Name</label>
            <Input required name="firstName" placeholder="Enter first name" className="h-12 rounded-xl placeholder:text-slate-400 placeholder:font-normal" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md text-on-surface-variant font-medium">Last Name</label>
            <Input name="lastName" placeholder="Enter last name (optional)" className="h-12 rounded-xl placeholder:text-slate-400 placeholder:font-normal" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-label-md text-on-surface-variant font-medium">Phone Number</label>
          <Input required name="phone" type="tel" placeholder="e.g. +91 98765 43210" className="h-12 rounded-xl placeholder:text-slate-400 placeholder:font-normal" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-label-md text-on-surface-variant font-medium">Reason for Visit</label>
          <Select required onValueChange={setReason} value={reason ?? ""}>
            <SelectTrigger className="h-12 rounded-xl text-base text-left">
              <SelectValue placeholder="Select reason for visit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Consultation">General Consultation</SelectItem>
              <SelectItem value="Vaccination">Vaccination</SelectItem>
              <SelectItem value="Pediatric Checkup">Pediatric Checkup</SelectItem>
              <SelectItem value="Lab Test / Blood Draw">Lab Test / Blood Draw</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-label-md text-on-surface-variant font-medium">Preferred Doctor (Optional)</label>
          <Select onValueChange={setDoctor} value={doctor ?? ""}>
            <SelectTrigger className="h-12 rounded-xl text-base text-left">
              <SelectValue placeholder="Any Doctor (First Available)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any Doctor (First Available)">Any Doctor (First Available)</SelectItem>
              <SelectItem value="Dr. Anjali Sharma (Primary Care)">Dr. Anjali Sharma (Primary Care)</SelectItem>
              <SelectItem value="Dr. Rajesh Varma (Family Medicine)">Dr. Rajesh Varma (Family Medicine)</SelectItem>
              <SelectItem value="Dr. Priya Nair (Pediatrician)">Dr. Priya Nair (Pediatrician)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-label-md text-on-surface-variant font-medium">Date Preferred</label>
          <Input required name="date" type="date" className="h-12 rounded-xl placeholder:text-slate-400" />
        </div>
        <Button type="submit" size="lg" disabled={isLoading} className="w-full mt-4 h-14 rounded-xl text-lg font-bold shadow-lg">
          {isLoading ? "Submitting..." : "Request Appointment"}
        </Button>
      </form>
    </div>
  );
}
