"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="w-full print:hidden">
      {/* Top Info Bar */}
      <div className="w-full bg-secondary text-white py-2 text-xs md:text-sm border-b border-white/10" id="top-bar">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary">schedule</span>
            <span>Working Hours: Mon-Thu: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm | Sat: 10am-1pm, 3:30-5:30pm</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-1.5 hover:text-primary transition-all" href="mailto:basilhappyhome@gmail.com">
              <span className="material-symbols-outlined text-base text-primary">mail</span>
              basilhappyhome@gmail.com
            </a>
            <a className="flex items-center gap-1.5 hover:text-primary transition-all" href="tel:+917736643050">
              <span className="material-symbols-outlined text-base text-primary">call</span>
              +91 77366 43050
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="w-full relative z-50 bg-white/95 glass-nav border-b border-outline-variant/30 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-7xl mx-auto">
          {/* Brand/Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity group">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white flex items-center justify-center relative">
              <Image src="/images/logo.png" alt="Life Care Logo" fill sizes="48px" className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="font-display-lg text-lg font-extrabold text-secondary tracking-tight leading-tight">
                Life Care
              </span>
              <span className="text-xs text-slate-500 font-medium leading-none">
                Homeopathic Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-semibold" href="/#about">
              About
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-semibold" href="/#services">
              Services
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-semibold" href="/#doctors">
              Doctors
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md font-semibold" href="/#faq">
              FAQ
            </Link>
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="tel:+917736643050" className="hidden sm:inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/95 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-105 transition-all duration-200">
              <span className="material-symbols-outlined text-lg">call</span>
              Book a Call
            </a>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center p-2 rounded-xl text-primary hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-surface-variant/30 flex flex-col p-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-300">
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors font-medium text-lg py-2 border-b border-slate-50"
              href="/#about"
            >
              About
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors font-medium text-lg py-2 border-b border-slate-50"
              href="/#services"
            >
              Services
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors font-medium text-lg py-2 border-b border-slate-50"
              href="/#doctors"
            >
              Doctors
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors font-medium text-lg py-2 border-b border-slate-50"
              href="/#faq"
            >
              FAQ
            </Link>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              href="tel:+917736643050"
              className="sm:hidden bg-primary text-white text-center py-3.5 rounded-xl font-bold text-base shadow-md shadow-primary/25 hover:bg-primary/95 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-200"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              Book a Call
            </a>
          </nav>
        )}
      </header>
    </div>
  );
}
