"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 full-width print:hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white flex items-center justify-center relative">
              <Image src="/images/logo.png" alt="Life Care Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-display-lg text-lg font-extrabold text-secondary tracking-tight leading-tight">
                Life Care
              </span>
              <span className="text-xs text-slate-500 font-medium leading-none">
                Homeopathic Clinic
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            Providing natural healing solutions through homeopathy for over 15 years. Your health is our priority.
          </p>
          
          <div className="text-slate-500 text-sm space-y-2.5 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-sm text-secondary">call</span>
              <a href="tel:+917736643050" className="hover:text-primary transition-colors font-medium">+91 77366 43050</a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-sm text-secondary">mail</span>
              <a href="mailto:basilhappyhome@gmail.com" className="hover:text-primary transition-colors font-medium">basilhappyhome@gmail.com</a>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-secondary mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link className="text-slate-500 hover:text-primary text-sm transition-colors" href="/#about">About Us</Link></li>
            <li><Link className="text-slate-500 hover:text-primary text-sm transition-colors" href="/#services">Our Services</Link></li>
            <li><Link className="text-slate-500 hover:text-primary text-sm transition-colors" href="/#doctors">Our Doctors</Link></li>
            <li><Link className="text-slate-500 hover:text-primary text-sm transition-colors" href="/#booking">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-secondary mb-6">Support & Timings</h4>
          <ul className="space-y-3 text-slate-500 text-sm">
            <li><Link className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="/terms-of-service">Terms of Service</Link></li>
            <li className="pt-2 font-semibold text-secondary">Working Hours:</li>
            <li className="text-xs">
              Mon-Thu: 10am-1pm, 3:30-5:30pm<br/>
              Fri: 10am-12pm, 3:30-5:30pm<br/>
              Sat: 10am-1pm, 3:30-5:30pm<br/>
              Sun: Closed
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-secondary mb-6">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-4">Stay updated with the latest health tips from our doctors.</p>
          
          {subscribed ? (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl border border-emerald-100 text-sm font-bold animate-in fade-in duration-300">
              Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white p-3 rounded-xl border border-slate-200 focus:border-primary outline-none placeholder:text-slate-400 placeholder:font-normal text-slate-800 text-sm" 
                placeholder="Email Address" 
                type="email" 
              />
              <button type="submit" className="absolute right-2 top-2 bg-secondary text-white p-1 rounded-lg flex items-center justify-center h-8 w-8 hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none outline-none">
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs">© 2026 Life Care Homeopathic Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}
