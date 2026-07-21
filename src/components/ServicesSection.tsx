"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  timings: string;
  doctor: string;
}

const services: ServiceDetail[] = [
  {
    id: "respiratory-diseases",
    title: "Respiratory Diseases",
    icon: "air",
    image: "/images/services/respiratory.png",
    shortDesc: "Comprehensive treatment for breathing and respiratory conditions",
    longDesc: "Our specialized homeopathic approach to respiratory health focuses on strengthening your natural immunity and addressing root causes. We provide personalized treatment plans that work with your body's healing mechanisms to restore optimal respiratory function.",
    features: [
      "Asthma",
      "Allergic respiratory problems",
      "Bronchitis",
      "Sinusitis",
      "Cough & Cold",
      "Pneumonia",
      "COPD",
      "Respiratory allergies"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Basil AP (Chief Homeopath)"
  },
  {
    id: "digestive-diseases",
    title: "Digestive System Diseases",
    icon: "healing",
    image: "/images/services/digestive.png",
    shortDesc: "Natural healing solutions for digestive health issues",
    longDesc: "We treat the root cause to restore healthy digestion, gut motility, and long-lasting balance. Our constitutional approach provides relief from gastric discomfort without the use of harsh antacids or suppressants.",
    features: [
      "Gastritis",
      "Dyspepsia (Indigestion)",
      "Acidity",
      "Irritable Bowel Syndrome (IBS)",
      "Constipation",
      "Peptic Ulcers",
      "Fatty Liver",
      "Gallbladder issues",
      "Chronic Diarrhea"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Basil AP (Chief Homeopath)"
  },
  {
    id: "fertility-care",
    title: "Fertility Care",
    icon: "favorite",
    image: "/images/services/fertility.png",
    shortDesc: "Holistic approach to reproductive health and fertility",
    longDesc: "We offer safe, constitutional support to naturally balance hormones, regulate cycles, and enhance reproductive wellness. Our non-invasive treatments provide a supportive pathway for couples planning a family.",
    features: [
      "Infertility",
      "Irregular menstruation",
      "Hormonal imbalance",
      "PCOS/PCOD",
      "Endometriosis",
      "Uterine Fibroids",
      "Low sperm count"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Sidrathul Munthaha (Women's Health Specialist)"
  },
  {
    id: "urinary-tract-care",
    title: "Urinary Tract Care",
    icon: "water_drop",
    image: "/images/services/urinary.png",
    shortDesc: "Specialized treatment for urinary system disorders",
    longDesc: "Homeopathy works to naturally flush out toxins, relieve pain, and prevent future recurrences. We provide safe and effective care that supports overall kidney function and urinary health.",
    features: [
      "Urinary tract infections (UTI)",
      "Kidney stones",
      "Prostate enlargement (BPH)",
      "Urinary incontinence",
      "Chronic cystitis",
      "Renal colic",
      "Urethritis"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Basil AP (Chief Homeopath)"
  },
  {
    id: "childrens-diseases",
    title: "Children's Diseases",
    icon: "child_care",
    image: "/images/services/pediatrics.png",
    shortDesc: "Gentle homeopathic care for pediatric health conditions",
    longDesc: "Safe, sweet-tasting medicines that children love. We gently treat common pediatric complaints while naturally boosting your child's developing immune system for healthy, robust growth.",
    features: [
      "Recurrent colds & cough",
      "Tonsillitis",
      "Enlarged adenoids",
      "Pediatric asthma",
      "Allergies",
      "Bedwetting",
      "Teething troubles",
      "Attention issues"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Sidrathul Munthaha (Pediatrics & Gynecology)"
  },
  {
    id: "youth-care",
    title: "Youth Care",
    icon: "face",
    image: "/images/services/youth.png",
    shortDesc: "Targeted solutions for adolescent and young adult health",
    longDesc: "Compassionate care for growing teens. We address the physical, hormonal, and emotional changes of youth through highly individualized natural treatments, helping them navigate this phase confidently.",
    features: [
      "Pimples / Acne",
      "Hair fall & dandruff",
      "Weakness / Fatigue",
      "Hormonal imbalances",
      "Menstrual cramps",
      "Weight management",
      "Exam stress"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Sidrathul Munthaha (Women's Health Specialist)"
  },
  {
    id: "skin-disorders",
    title: "Skin Disorders",
    icon: "spa",
    image: "/images/services/skin.png",
    shortDesc: "Natural treatment for various skin conditions and allergies",
    longDesc: "Homeopathy addresses skin issues from the inside out. Rather than just suppressing surface symptoms with topical creams, we purify the system to provide long-term relief from chronic skin ailments.",
    features: [
      "Allergies",
      "Psoriasis",
      "Eczema",
      "Warts",
      "Fungal infections",
      "Urticaria (Hives)",
      "Vitiligo",
      "Ringworm",
      "Contact Dermatitis"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Sidrathul Munthaha (Women's Health Specialist)"
  },
  {
    id: "lifestyle-diseases",
    title: "Lifestyle Diseases",
    icon: "monitoring",
    image: "/images/services/lifestyle.png",
    shortDesc: "Holistic management of modern lifestyle-related health issues",
    longDesc: "We help you manage and reverse metabolic conditions safely. Combined with positive dietary habits, our homeopathic remedies regulate body functions to prevent long-term complications.",
    features: [
      "Diabetes management",
      "High blood pressure",
      "Cholesterol imbalance",
      "Thyroid disorders",
      "Obesity",
      "Fatty liver disease",
      "Gout"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Basil AP (Chief Homeopath)"
  },
  {
    id: "mental-health",
    title: "Mental Health Issues",
    icon: "psychology",
    image: "/images/services/mental.png",
    shortDesc: "Comprehensive support for mental wellness and neurological conditions",
    longDesc: "Gentle, non-habit-forming remedies that restore emotional balance. We offer a safe space to heal from emotional trauma, calm a racing mind, and improve overall mental clarity and sleep.",
    features: [
      "Anxiety",
      "Stress",
      "Depression",
      "Insomnia",
      "Migraines & Headaches",
      "Panic attacks",
      "Mood swings",
      "OCD",
      "Vertigo"
    ],
    timings: "Mon-Thu & Sat: 10am-1pm, 3:30-5:30pm | Fri: 10am-12pm, 3:30-5:30pm",
    doctor: "Dr. Basil AP (Chief Homeopath)"
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
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
            Our Services
          </span>
          <h2 className="text-headline-md font-bold text-secondary mb-4">Homeopathic Treatment Services</h2>
          <p className="text-slate-500 max-w-4xl mx-auto">
            Comprehensive homeopathic healthcare services at Life Care Homeopathic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => setActiveService(service)}
              className="bg-surface-container-lowest rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-48 bg-slate-100 overflow-hidden cursor-pointer">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-md text-secondary font-bold text-xs px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary">visibility</span> View Details
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col items-start flex-grow w-full">
                <h3 className="text-headline-sm font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors">{service.title}</h3>
                <p className="text-on-surface-variant mb-6 flex-grow">{service.shortDesc}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveService(service);
                  }}
                  className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all cursor-pointer bg-transparent border-none outline-none"
                >
                  Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup overlay */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
          {/* Modal Container */}
          <div 
            className="bg-white text-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-4xl w-11/12 md:w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 relative transition-all duration-300"
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
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary leading-tight">{activeService.title}</h3>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full inline-block mt-1">
                  Services Details
                </span>
              </div>
            </div>

            {/* Modal Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-6">
              {/* Left Column: Image */}
              <div className="md:col-span-5 relative min-h-[250px] md:min-h-full rounded-3xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                <Image 
                  src={activeService.image} 
                  alt={activeService.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover" 
                />
              </div>

              {/* Right Column: Details Content */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-base md:text-lg leading-relaxed text-slate-600 font-normal">{activeService.longDesc}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base uppercase tracking-wider mb-3">Conditions We Treat:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="material-symbols-outlined text-emerald-500 text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">Assigned Clinician</span>
                      <span className="font-semibold text-primary text-sm flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">person</span>
                        {activeService.doctor}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">Standard Timings</span>
                      <span className="font-semibold text-primary text-sm flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {activeService.timings}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
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
          </div>
        </div>
      )}
    </section>
  );
}
