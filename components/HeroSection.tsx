"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, User } from 'lucide-react';
import { heroReviews } from '@/lib/data';

interface HeroSectionProps {
  scrollY: number;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const [currentHeroReview, setCurrentHeroReview] = useState(0);
  const [isHeroCarouselVisible, setIsHeroCarouselVisible] = useState(true);
  const heroCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let heroTimer: NodeJS.Timeout;
    
    if (isHeroCarouselVisible) {
      heroTimer = setInterval(() => {
        setCurrentHeroReview((prev) => (prev + 1) % heroReviews.length);
      }, 3000);
    }
    
    return () => {
      if (heroTimer) clearInterval(heroTimer);
    };
  }, [isHeroCarouselVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroCarouselRef.current) {
            setIsHeroCarouselVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroCarouselRef.current) {
      observer.observe(heroCarouselRef.current);
    }

    return () => {
      if (heroCarouselRef.current) {
        observer.unobserve(heroCarouselRef.current);
      }
    };
  }, []);

  return (
    <section className="hero-section relative min-h-[90vh] flex items-center justify-center overflow-hidden scroll-optimized">
      {/* Background Image with Parallax - GPU Accelerated */}
      <div 
        className="hero-background absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 will-change-transform"
        style={{
          backgroundImage: "url('/image.webp')",
          transform: `translate3d(0, ${Math.round(scrollY * 0.5)}px, 0) scale(1.05)`
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Main Content */}
          <div className="max-w-2xl">
            <div className="mb-8">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                ⭐ 4.9/5 Rating • 500+ Reviews
              </Badge>
            </div>
            
            {/* Critical LCP Element - Optimized */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white font-playfair optimized-animation">
              EXPERT TAILORING &<br />
              CLOTHING ALTERATIONS<br />
              IN OTTAWA<br />
              <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                NIMBLE NEEDLE
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl mb-6 text-white/95 leading-relaxed font-medium font-montserrat">
              Friendly, Expert Tailoring
            </h2>
            <p className="text-base md:text-lg mb-8 text-white/90 leading-relaxed font-light">
              Your one-stop shop for all your tailoring, seamstress, and clothing alteration needs in Ottawa! No appointment needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/contact-us'}
                className="group relative bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 px-8 py-4 text-base font-semibold optimized-animation"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Your Appointment
                  <span className="inline-block">📅</span>
                </span>
              </Button>
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/services'}
                className="group relative bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 px-8 py-4 text-base font-semibold optimized-animation"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Services
                  <span className="inline-block">⚡</span>
                </span>
              </Button>
            </div>
          </div>

          {/* Right Column - Google Reviews Carousel */}
          <div className="flex justify-center lg:justify-end">
            <div ref={heroCarouselRef} className="w-full max-w-sm">
              {/* Google Reviews Header */}
              <div className="bg-white/20 rounded-2xl p-6 mb-4 border border-white/30">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">G</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Google Reviews</h3>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white/80 text-sm ml-2">4.9 • 500+ reviews</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Review Cards - GPU Accelerated */}
              <div className="relative h-64 overflow-hidden">
                {heroReviews.map((review, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 gpu-accelerated ${
                      index === currentHeroReview
                        ? 'translate-y-0 opacity-100'
                        : index < currentHeroReview
                        ? '-translate-y-full opacity-0'
                        : 'translate-y-full opacity-0'
                    }`}
                  >
                    <Card className="bg-white/15 border border-white/30 h-full">
                      <CardContent className="p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/20 flex items-center justify-center">
                              <User className="h-6 w-6 text-white/70" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm">{review.name}</h4>
                              <p className="text-white/60 text-xs">{review.timeAgo}</p>
                            </div>
                          </div>
                          
                          <div className="flex mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          
                          <p className="text-white/90 text-sm leading-relaxed">
                            &ldquo;{review.text}&rdquo;
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <span className="text-white/60 text-xs">Posted on Google</span>
                          <Quote className="h-4 w-4 text-white/40" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Review Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {heroReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroReview(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 optimized-animation ${
                      index === currentHeroReview 
                        ? 'bg-pink-500 w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Optimized Animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 optimized-animation"></div>
        </div>
      </div>
    </section>
  );
} 