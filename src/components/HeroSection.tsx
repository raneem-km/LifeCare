"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: "/images/dr-sidrathul.jpg",
      name: "Dr. Sidrathul Munthaha",
      years: "12+",
      role: "Women's Health Specialist"
    },
    {
      image: "/images/dr-basil.jpg",
      name: "Dr. Basil AP",
      years: "15+",
      role: "Chief Homeopath & Founder"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <header className="relative w-full min-h-[90vh] lg:min-h-[85vh] flex items-center bg-white overflow-hidden py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-1">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              ))}
            </div>
            <span className="font-label-md text-secondary font-bold ml-1.5">5.0 (980 Reviews)</span>
          </div>
          <h1 
            data-aos="fade-up" 
            data-aos-duration="1200" 
            data-aos-easing="ease-out-cubic"
            className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-secondary leading-[1.1] tracking-tight font-extrabold"
          >
            Trusted <span className="text-primary">Homeopathic Clinic</span> 
            <br className="hidden md:block" /> in Malappuram
          </h1>
          <p className="text-body-lg text-slate-500 max-w-3xl leading-relaxed">
            Life Care Homeopathic Clinic in JSS Shopping Mall, Manjeri, Kerala provides 15+ years of trusted homeopathic treatment for migraine, piles, women's health, and child immunity. Online consultations available across Kerala.
          </p>
          <div className="flex flex-wrap gap-4 items-center pt-4">
            <Link className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-200" href="#booking">
              Book Homeopathy Consultation
            </Link>
            <Link href="#doctors" className="flex items-center gap-2 font-semibold text-secondary hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-slate-50">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary group-hover:scale-115 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
              </div>
              Meet Doctors
            </Link>
          </div>
          <div className="pt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-600">AM</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-600">KI</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400 overflow-hidden relative flex items-center justify-center font-bold text-xs text-slate-600">SK</div>
            </div>
            <div>
              <p className="font-bold text-secondary leading-none mb-1">50,000+ Appointments</p>
              <p className="text-xs text-slate-400 leading-none">Patients booked already</p>
            </div>
          </div>
        </div>

        {/* Right Slideshow */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full aspect-[4/5] md:aspect-square bg-slate-50 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={index === 0}
                />
                {/* Floating Info Overlay inside Slide */}
                <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-100 shadow-md">
                  <p className="font-bold text-secondary text-sm leading-tight">{slide.name}</p>
                  <p className="text-xs text-primary font-semibold">{slide.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Badges */}
          <div className="absolute -top-4 -right-4 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 text-center min-w-[120px] hover:-translate-y-1 transition-transform">
            <p className="text-secondary font-extrabold text-2xl leading-none">{slides[activeSlide].years}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Years Experience</p>
          </div>
          
          <div className="absolute -bottom-4 -left-4 z-20 bg-white px-4 py-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 hover:-translate-y-1 transition-transform">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined text-base font-bold">check</span>
            </div>
            <div>
              <p className="font-bold text-secondary text-xs leading-tight">Available Now</p>
              <p className="text-[10px] text-slate-400 leading-tight">Online & In-Clinic</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
