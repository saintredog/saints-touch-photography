'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah J.',
    role: 'Wedding Photographer',
    quote:
      'This app has transformed how I protect my work. The automatic metadata embedding saves me hours every week, and I finally have peace of mind knowing my images are protected. Highly recommended!',
    rating: 5,
    initials: 'SJ',
    avatarColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 2,
    name: 'Marcus T.',
    role: 'Commercial Photographer',
    quote:
      'Finally, a simple solution to image copyright protection. I used to dread the process of embedding metadata — now it happens automatically on every upload. The infringement alerts are a game changer.',
    rating: 5,
    initials: 'MT',
    avatarColor: 'from-blue-500 to-cyan-600',
  },
  {
    id: 3,
    name: 'Emma R.',
    role: 'Fine Art Photographer',
    quote:
      'The metadata embedding is flawless. I love this tool. My clients can see the copyright info right in Lightroom when they download proofs, which has basically eliminated the "I didn\'t know it was copyrighted" excuse.',
    rating: 4,
    initials: 'ER',
    avatarColor: 'from-rose-500 to-pink-600',
  },
  {
    id: 4,
    name: 'Daniel K.',
    role: 'Photojournalist',
    quote:
      'As someone whose work gets syndicated across many publications, protecting my images is critical. PixelShield has made that process completely frictionless. Worth every penny.',
    rating: 5,
    initials: 'DK',
    avatarColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 5,
    name: 'Priya M.',
    role: 'Portrait Studio Owner',
    quote:
      'I manage thousands of images a year and PixelShield integrates into my workflow seamlessly. The batch update feature is brilliant — I updated my entire back catalog in minutes.',
    rating: 5,
    initials: 'PM',
    avatarColor: 'from-emerald-500 to-teal-600',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Main card */}
      <div
        key={t.id}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-300"
      >
        {/* Quote mark */}
        <div className="text-6xl leading-none text-indigo-100 font-serif mb-2 select-none">
          &ldquo;
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">{t.quote}</p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}
            >
              {t.initials}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
          <StarRating rating={t.rating} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition shadow-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? 'bg-indigo-600 w-6 h-2'
                  : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center transition shadow-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
