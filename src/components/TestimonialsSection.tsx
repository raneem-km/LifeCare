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
    name: "Arjun Mehta",
    rating: 5,
    text: "The team at CityHealth is amazing. They always take the time to listen to my concerns during checkups, and I never feel rushed. It feels like family here.",
    sub: "Patient since 2021"
  },
  {
    id: "static-2",
    name: "Kavita Iyer",
    rating: 5,
    text: "Finding a good pediatrician was hard until we met Dr. Priya at the clinic. She's gentle and makes every visit stress-free for both the kids and us.",
    sub: "Parent of two"
  },
  {
    id: "static-3",
    name: "Suresh Kumar",
    rating: 5,
    text: "The front desk staff are incredibly helpful. I went in for a walk-in consultation and the process was smooth with no hidden costs. A reliable local clinic.",
    sub: "Patient since 2019"
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
    <section className="py-12 md:py-2xl bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-xl">
          <h2 className="text-headline-md font-bold mb-4 text-white">What Our Patients Say</h2>
          <div className="w-20 h-1 bg-secondary-container mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-stretch">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-primary-container p-8 rounded-3xl border border-white/10 hover:bg-primary-container/80 transition-all duration-300 flex flex-col justify-between shadow-soft hover:shadow-lg hover:-translate-y-1 animate-in fade-in duration-500"
            >
              <div>
                <div className="flex text-secondary-fixed mb-4">
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
                <p className="italic mb-8 text-body-lg text-primary-fixed leading-relaxed">&quot;{t.text}&quot;</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary-fixed uppercase text-lg border border-secondary/35">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-base">{t.name}</p>
                  <p className="text-xs opacity-70 font-medium">{t.sub}</p>
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
