"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Check, ShieldCheck } from 'lucide-react';

/**
 * Guarantee terms and conditions section — ported from Riber's Suits
 * and adapted to Nimble Needle's pink/gray design system.
 *
 * Uses Intersection Observer for scroll-triggered reveal animations
 * (consistent with the rest of the Nimble Needle homepage pattern).
 */

const guaranteePoints = [
  {
    title: "30-Day Coverage",
    description:
      "Comprehensive coverage for all workmanship for a full 30 days after pickup.",
  },
  {
    title: "Free Correction",
    description:
      "We immediately rectify any errors on our part at absolutely no additional charge.",
  },
  {
    title: "Reimbursement Policy",
    description:
      "If a repair is not possible, we offer full reimbursement upon receipt presentation.",
  },
  {
    title: "Garment Retention",
    description:
      "In the rare instance of a full reimbursement, the garment is retained by us.",
  },
];

export default function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger reveal animation when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-0 bg-white overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Image side */}
        <div
          className={`relative h-[400px] md:h-auto min-h-[550px] bg-gray-100 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}
        >
          <Image
            src="/guarantee.jpg"
            alt="Close-up of sewing machine needle and presser foot"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Subtle tint overlay for visual cohesion */}
          <div className="absolute inset-0 bg-pink-900/10 mix-blend-multiply" />

          {/* Badge in the bottom-left corner */}
          <div className="absolute bottom-6 left-6 z-10">
            <span className="text-white/70 text-xs uppercase tracking-[0.3em] font-light border border-white/20 px-5 py-2 backdrop-blur-sm bg-white/5 font-montserrat">
              Excellence
            </span>
          </div>
        </div>

        {/* Content side */}
        <div
          className={`flex items-center bg-white p-8 md:p-16 lg:p-24 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}
        >
          <div className="max-w-xl">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-pink-500" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 font-montserrat">
                The Promise
              </span>
            </div>

            {/* Heading — League Spartan matches the rest of the site */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight font-league-spartan">
              OUR <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent italic">PERFECT FIT</span> GUARANTEE
            </h2>

            <p className="text-lg text-gray-600 font-light mb-12 leading-relaxed font-montserrat">
              We believe in the power of a perfect fit. That&apos;s why every garment that leaves our studio is backed by our comprehensive commitment to quality.
            </p>

            {/* Guarantee points list */}
            <div className="space-y-8">
              {guaranteePoints.map((point, index) => (
                <div
                  key={index}
                  className={`flex gap-4 group transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  {/* Check icon with hover accent */}
                  <div className="mt-1 min-w-[24px]">
                    <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-pink-500 transition-colors">
                      <Check className="w-3 h-3 text-pink-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-league-spartan text-lg font-semibold text-gray-900 mb-1 group-hover:text-pink-500 transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed font-montserrat">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
