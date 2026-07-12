"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  timings: string;
  doctor: string;
}

const services: ServiceDetail[] = [
  {
    id: "general-consultation",
    title: "General Consultation",
    icon: "medical_services",
    shortDesc: "Expert primary care for fevers, infections, and common illnesses for patients of all ages.",
    longDesc: "Our general consultation service covers diagnosis, treatment, and preventive care for a wide range of common medical conditions. We provide thorough assessments, coordinate with specialists when needed, and focus on long-term wellness.",
    features: [
      "Acute sickness care (fevers, coughs, infections)",
      "Chronic disease management (hypertension, diabetes)",
      "General health counseling & prescriptions",
      "Reference to specialists"
    ],
    timings: "Monday - Saturday: 9:00 AM - 6:00 PM",
    doctor: "Dr. Ramesh Kumar (General Physician)"
  },
  {
    id: "preventative-care",
    title: "Preventative Care",
    icon: "health_and_safety",
    shortDesc: "Routine health checkups, blood pressure monitoring, and wellness plans to keep you healthy.",
    longDesc: "Staying healthy is easier than getting healthy. Our preventative care services include regular health screenings, lifestyle assessments, and early disease detection programs designed to help you stay ahead of potential issues.",
    features: [
      "Annual physical checkups",
      "Blood pressure & cholesterol monitoring",
      "Lifestyle, diet, and nutrition plans",
      "Cancer & metabolic screenings"
    ],
    timings: "Monday - Friday: 8:00 AM - 4:00 PM",
    doctor: "Dr. Anjali Sen (Preventative Medicine Expert)"
  },
  {
    id: "vaccinations",
    title: "Vaccinations",
    icon: "vaccines",
    shortDesc: "Standard immunizations for children and adults, including flu shots and travel vaccines.",
    longDesc: "We offer comprehensive immunization services to protect individuals and the community from vaccine-preventable diseases. Our clinic carries all recommended childhood vaccines, seasonal vaccines, and booster shots.",
    features: [
      "Standard childhood vaccination plans",
      "Annual Influenza (flu) & COVID boosters",
      "Travel vaccinations & advice",
      "Tetanus and adult booster shots"
    ],
    timings: "Monday - Saturday: 10:00 AM - 5:00 PM",
    doctor: "Dr. Priya Nair (Pediatrician & Immunization Lead)"
  },
  {
    id: "diagnostic-lab-tests",
    title: "Diagnostic Lab Tests",
    icon: "science",
    shortDesc: "On-site sample collection for blood work, sugar levels, and other essential diagnostic tests.",
    longDesc: "Fast and reliable diagnostics are key to correct medical action. Our clinic offers on-site sample collection for a variety of tests, ensuring quick turnaround times and direct sync with your doctor's prescriptions.",
    features: [
      "Routine blood tests (CBC, lipid profile)",
      "Blood sugar (HbA1c) & diabetic monitoring",
      "Thyroid function & hormone tests",
      "Urine & basic chemistry screens"
    ],
    timings: "Monday - Saturday: 7:30 AM - 3:00 PM",
    doctor: "Mr. Sandeep Sharma (Senior Lab Technician)"
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    icon: "child_care",
    shortDesc: "Gentle and specialized medical care for infants, children, and adolescents in a warm environment.",
    longDesc: "Children are not just miniature adults—they require special care. Our pediatric clinic provides a warm, friendly, and stress-free environment to look after your child's growth, development, and medical needs.",
    features: [
      "Newborn care and development milestones",
      "Childhood illness diagnosis & care",
      "Growth and nutrition tracking",
      "Pediatric behavioral guidance"
    ],
    timings: "Monday - Saturday: 9:00 AM - 1:00 PM & 4:00 PM - 7:00 PM",
    doctor: "Dr. Priya Nair (Pediatrician)"
  },
  {
    id: "minor-procedures",
    title: "Minor Procedures",
    icon: "healing",
    shortDesc: "Wound care, minor suturing, dressing changes, and other in-clinic outpatient procedures.",
    longDesc: "For medical needs that require swift physical treatment, our minor procedure room is fully equipped for safe, sterile, outpatient services. Save hours by avoiding emergency room visits for minor injuries.",
    features: [
      "Wound care, cleaning, and sanitization",
      "Minor suturing (stitches) & stitch removal",
      "Burn dressing and bandaging changes",
      "Removal of ingrown nails & small cysts"
    ],
    timings: "Monday - Saturday: 9:00 AM - 7:00 PM",
    doctor: "Dr. Ramesh Kumar (General Surgeon / Physician)"
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeService]);

  return (
    <section className="py-2xl bg-surface-bright" id="services">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-md font-bold uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-headline-md font-bold text-primary mb-4">Our Clinic Services</h2>
          <p className="text-on-surface-variant max-w-4xl mx-auto">
            Comprehensive healthcare solutions tailored for your everyday needs.
            <br className="hidden lg:block" /> From routine checkups to minor procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start"
            >
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">
                  {service.icon}
                </span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">{service.shortDesc}</p>
              <button
                onClick={() => setActiveService(service)}
                className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all cursor-pointer bg-transparent border-none outline-none"
              >
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup overlay */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          {/* Modal Container */}
          <div 
            className="bg-white text-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer border-none outline-none"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pt-2">
              <div className="bg-secondary/15 w-16 h-16 rounded-2xl flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-4xl">{activeService.icon}</span>
              </div>
              <div>
                <h3 className="text-headline-sm font-extrabold text-primary">{activeService.title}</h3>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                  Services Details
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-slate-700">
              <div>
                <p className="text-lg leading-relaxed font-medium text-slate-600">{activeService.longDesc}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base uppercase tracking-wider mb-3">Key Medical Offerings:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600">
                      <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">Assigned Clinician</span>
                  <span className="font-semibold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">person</span>
                    {activeService.doctor}
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">Standard Timings</span>
                  <span className="font-semibold text-primary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    {activeService.timings}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
              <button
                onClick={() => setActiveService(null)}
                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer border-none outline-none bg-transparent"
              >
                Close
              </button>
              <Link
                href="#booking"
                onClick={() => setActiveService(null)}
                className="bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold text-base hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Book this Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
