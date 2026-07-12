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
    <footer className="bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant full-width">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-lg max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white flex items-center justify-center">
              <Image src="/images/logo.png" alt="CityHealth Logo" width={40} height={40} className="object-cover scale-110" />
            </div>
            <span className="font-display-lg text-headline-sm font-extrabold text-primary tracking-tight">
              City<span className="text-secondary">Health</span>
            </span>
          </div>
          <p className="text-on-surface-variant text-sm">Providing exceptional, local care to our community. Your neighborhood health partner.</p>
          
          <div className="text-on-surface-variant text-sm space-y-2.5 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-sm text-secondary">call</span>
              <a href="tel:+918040002546" className="hover:text-secondary transition-colors font-medium">+91 (80) 4000-CLINIC</a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-sm text-secondary">mail</span>
              <a href="mailto:hello@cityhealthclinic.in" className="hover:text-secondary transition-colors font-medium">hello@cityhealthclinic.in</a>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link className="text-on-surface-variant hover:text-secondary transition-colors" href="/#services">Services</Link></li>
            <li><Link className="text-on-surface-variant hover:text-secondary transition-colors" href="/#doctors">Our Doctors</Link></li>
            <li><Link className="text-on-surface-variant hover:text-secondary transition-colors" href="/#booking">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-6">Support</h4>
          <ul className="space-y-3">
            <li><Link className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</Link></li>
            <li><Link className="text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</Link></li>
            <li><Link className="text-on-surface-variant hover:text-secondary transition-colors" href="/#contact">Contact Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-6">Newsletter</h4>
          <p className="text-on-surface-variant text-sm mb-4">Stay updated with the latest health tips from our doctors.</p>
          
          {subscribed ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-sm font-bold animate-in fade-in duration-300">
              Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface p-3 rounded-xl border border-surface-variant/50 focus:border-secondary outline-none placeholder:text-slate-400 placeholder:font-normal text-slate-800" 
                placeholder="Email Address" 
                type="email" 
              />
              <button type="submit" className="absolute right-2 top-2 bg-secondary text-on-secondary p-1 rounded-lg flex items-center justify-center h-8 w-8 hover:scale-105 active:scale-95 transition-transform cursor-pointer border-none outline-none">
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-on-surface-variant text-sm">© 2024 CityHealth Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}
