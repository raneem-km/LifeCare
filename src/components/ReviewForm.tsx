"use client";

import { useState } from 'react';

interface ReviewFormProps {
  onAddReview: (name: string, rating: number, text: string) => void;
}

export default function ReviewForm({ onAddReview }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const review = formData.get("review") as string;
    
    if (name && review) {
      setIsSubmitting(true);
      try {
        await onAddReview(name, rating, review);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
          setRating(5);
        }, 3000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 bg-slate-800 text-white p-14 md:p-20 rounded-[2.5rem] text-center shadow-2xl border border-slate-700 animate-in fade-in zoom-in duration-500">
        <span className="material-symbols-outlined text-emerald-400 text-8xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        <h3 className="text-display-lg font-extrabold text-white mb-6">Thank You!</h3>
        <p className="text-slate-300 text-2xl font-medium">Your review has been submitted successfully.<br/>We appreciate your feedback.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 text-center">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/95 transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <span className="material-symbols-outlined">edit_square</span>
          Write a Review
        </button>
      ) : (
        <div className="w-full max-w-4xl mx-auto bg-slate-800 text-white p-10 md:p-14 rounded-[2.5rem] text-left shadow-2xl border border-slate-700 animate-in fade-in duration-300">
          <h3 className="text-headline-md font-extrabold text-white mb-10 text-center">Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-slate-300 mb-3 font-bold text-base uppercase tracking-wider">Rating</label>
              <div className="flex gap-4 text-amber-400 text-5xl cursor-pointer justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((star) => {
                  const currentRating = hoverRating !== null ? hoverRating : rating;
                  return (
                    <span 
                      key={star} 
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="material-symbols-outlined transition-all hover:scale-125" 
                      style={{ fontVariationSettings: `'FILL' ${star <= currentRating ? 1 : 0}` }}
                    >
                      star
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-slate-300 mb-3 font-bold text-base uppercase tracking-wider">Your Name</label>
              <input 
                required 
                type="text" 
                name="name"
                id="name" 
                className="w-full bg-slate-900 text-white px-6 py-5 text-xl rounded-2xl border border-slate-700 focus:bg-slate-950 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-505 font-medium shadow-sm" 
                placeholder="Enter your name" 
              />
            </div>
            <div>
              <label htmlFor="review" className="block text-slate-300 mb-3 font-bold text-base uppercase tracking-wider">Your Review</label>
              <textarea 
                required 
                name="review"
                id="review" 
                rows={6} 
                className="w-full bg-slate-900 text-white px-6 py-5 text-xl rounded-2xl border border-slate-700 focus:bg-slate-950 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-505 font-medium resize-none shadow-sm" 
                placeholder="Write your review details here..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-6 pt-8 border-t border-slate-700">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-8 py-4 rounded-2xl font-bold text-slate-400 text-lg hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-primary/95 transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
