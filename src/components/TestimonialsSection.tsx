"use client";

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import { submitReview } from '@/app/actions';

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  sub: string;
}

interface DbReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  createdAt: Date;
}

interface TestimonialsSectionProps {
  initialDbReviews: DbReview[];
}

const initialTestimonials: Testimonial[] = [
  {
    id: "static-1",
    name: "Mohammed Shafi",
    rating: 5,
    text: "The treatment at Life Care Homeo Clinic has been wonderful. They always take the time to listen to my complete health history during consultations, and I never feel rushed. It feels like true holistic healing here.",
    sub: "Patient since 2021"
  },
  {
    id: "static-2",
    name: "Fathima Nida",
    rating: 5,
    text: "Finding safe, natural medicine for children was hard until we came here. The doctors are gentle, the sweet homeopathic medicines are easy to give, and it makes every visit stress-free for both the kids and us.",
    sub: "Parent of two children"
  },
  {
    id: "static-3",
    name: "Harikrishnan M.",
    rating: 5,
    text: "The doctors here take a very detailed, patient-centric approach. I went in for a chronic issue and their constitutional remedies have made a huge difference in my daily life. A highly reliable and welcoming local clinic.",
    sub: "Patient since 2019"
  },
  {
    id: "static-4",
    name: "Shihabudheen P.",
    rating: 5,
    text: "Excellent service! The practitioners are highly knowledgeable in homeopathy, the staff is friendly, and the clinic is clean and peaceful. Booking an appointment was quick and easy.",
    sub: "7/11/2026 • Verified Patient"
  }
];

export default function TestimonialsSection({ initialDbReviews = [] }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const dbTestimonials = (initialDbReviews || []).map((r) => ({
      id: `db-${r.id}`,
      name: r.name,
      rating: r.rating,
      text: r.text,
      sub: `${new Date(r.createdAt).toLocaleDateString()} • Verified Patient`
    }));
    return [...initialTestimonials, ...dbTestimonials];
  });

  const handleAddReview = async (name: string, rating: number, text: string) => {
    const res = await submitReview({ name, rating, text });
    if (res.success && res.review) {
      const newReview: Testimonial = {
        id: `db-${res.review.id}`,
        name: res.review.name,
        rating: res.review.rating,
        text: res.review.text,
        sub: "Just now • Verified Patient"
      };
      setTestimonials((prev) => [...prev, newReview]);
    } else {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
            Reviews
          </span>
          <h2 className="text-headline-md font-bold mb-4 text-secondary">Patient Success Stories</h2>
          <p className="text-slate-500 max-w-none mx-auto mb-4 whitespace-nowrap text-sm sm:text-base">Real stories from patients who found healing through our natural homeopathic treatments</p>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter items-stretch">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in duration-500"
            >
              <div>
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      className="material-symbols-outlined" 
                      style={{ fontVariationSettings: `'FILL' ${i < t.rating ? 1 : 0}` }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="italic mb-8 text-body-md text-slate-600 leading-relaxed">&quot;{t.text}&quot;</p>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary uppercase text-lg border border-primary/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-secondary text-base">{t.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{t.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReviewForm onAddReview={handleAddReview} />
      </div>
    </section>
  );
}
