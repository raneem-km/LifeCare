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
    <header className="docked full-width top-0 sticky z-50 bg-surface/80 glass-nav border-b border-surface-variant/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-7xl mx-auto">
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white flex items-center justify-center">
            <Image src="/images/logo.png" alt="CityHealth Logo" width={40} height={40} className="object-cover scale-110" />
          </div>
          <span className="font-display-lg text-headline-sm font-extrabold text-primary tracking-tight">
            City<span className="text-secondary">Health</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#services">
            Services
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#doctors">
            Doctors
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#about">
            About
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#contact">
            Contact
          </Link>
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/#booking" className="hidden sm:inline-flex bg-primary text-on-primary px-6 py-3 rounded-full font-button hover:scale-95 transition-transform duration-200">
            Book Appointment
          </Link>
          
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
            href="/#about"
          >
            About
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors font-medium text-lg py-2 border-b border-slate-50"
            href="/#contact"
          >
            Contact
          </Link>
          <Link
            onClick={() => setIsMobileMenuOpen(false)}
            href="/#booking"
            className="sm:hidden bg-primary text-on-primary text-center py-3.5 rounded-full font-button font-bold text-base hover:scale-95 transition-transform duration-200"
          >
            Book Appointment
          </Link>
        </nav>
      )}
    </header>
  );
}
