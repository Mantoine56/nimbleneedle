"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, User } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
  heroReviews?: any[];
  businessInfo?: any;
  reviewsLoading?: boolean;
}

export default function HeroSection({ scrollY, heroReviews = [], businessInfo = null, reviewsLoading = false }: HeroSectionProps) {
  const [currentHeroReview, setCurrentHeroReview] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const heroCarouselRef = useRef<HTMLDivElement>(null);

  // Auto-advance reviews
  useEffect(() => {
    if (!isAutoPlay || heroReviews.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentHeroReview((prev) => (prev + 1) % heroReviews.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [heroReviews.length, isAutoPlay]);

  // Pause auto-play when user interacts
  const handleUserInteraction = () => {
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000); // Resume after 5 seconds
  };

  return (
    <section className="hero-section relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image with Parallax - LCP Optimized */}
      <div 
        className="absolute inset-0 scale-105"
        style={{
          transform: `translate3d(0, ${Math.round(scrollY * 0.5)}px, 0) scale(1.05)`
        }}
      >
        <Image
          src="/NimbleHomeHero.jpg"
          alt="Nimble Needle Tailoring Workshop - Expert clothing alterations and tailoring services in Ottawa"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Main Content */}
          <div className="max-w-2xl">
            <div className="mb-8">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                {businessInfo ? (
                  `⭐ ${businessInfo.rating}/5 Rating • ${businessInfo.totalReviews}+ Reviews`
                ) : (
                  reviewsLoading ? '⭐ Loading Reviews...' : '⭐ 4.9/5 Rating • 500+ Reviews'
                )}
              </Badge>
            </div>
            
            {/* Critical LCP Element - Optimized */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white font-league-spartan">
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
                onClick={() => window.location.href = '/bookings'}
                className="group relative bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 px-8 py-4 text-base font-semibold"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Your Appointment
                  <span className="inline-block">📅</span>
                </span>
              </Button>
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/services'}
                className="group relative bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 px-8 py-4 text-base font-semibold"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Services
                  <span className="inline-block">⚡</span>
                </span>
              </Button>
            </div>
          </div>

          {/* Right Column - Google Reviews */}
          <div className="flex justify-center lg:justify-center lg:pr-16">
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
                      {businessInfo ? (
                        <span className="text-white/80 text-sm ml-2">
                          {businessInfo.rating} • {businessInfo.totalReviews}+ reviews
                        </span>
                      ) : (
                        <span className="text-white/80 text-sm ml-2">
                          {reviewsLoading ? 'Loading...' : '4.9 • 500+ reviews'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Display Area */}
              <div className="h-64">
                {reviewsLoading ? (
                  <Card className="bg-white/15 border border-white/30 h-full w-full">
                    <CardContent className="p-6 h-full flex flex-col justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/60 mb-4"></div>
                      <p className="text-white/80 text-sm">Loading reviews...</p>
                    </CardContent>
                  </Card>
                ) : heroReviews.length > 0 ? (
                  <Card className="bg-white/15 border border-white/30 h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                       {/* Review Header */}
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center space-x-3">
                           <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/20 flex items-center justify-center">
                             <User className="h-6 w-6 text-white/70" />
                           </div>
                           <div>
                             <h4 className="text-white font-semibold text-sm">
                               {heroReviews[currentHeroReview]?.name || 'Customer'}
                             </h4>
                             <p className="text-white/60 text-xs">
                               {heroReviews[currentHeroReview]?.timeAgo || 'Recent'}
                             </p>
                           </div>
                         </div>
                         
                         {/* Rating Stars - Moved to the right */}
                         <div className="flex">
                           {[...Array(heroReviews[currentHeroReview]?.rating || 5)].map((_, i) => (
                             <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                           ))}
                         </div>
                       </div>
                       
                       {/* Scrollable Review Text */}
                       <div className="flex-1 min-h-0 mb-4">
                         <div 
                           className="h-32 overflow-y-auto pr-2 scrollable-review-text bg-white/5 rounded-lg p-3"
                           onMouseEnter={handleUserInteraction}
                           onTouchStart={handleUserInteraction}
                         >
                           <p className="text-white/90 text-sm leading-relaxed">
                             {heroReviews[currentHeroReview]?.text || 'Great service!'}
                           </p>
                         </div>
                       </div>
                      
                      {/* Review Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-white/60 text-xs">Posted on Google</span>
                        <Quote className="h-4 w-4 text-white/40" />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/15 border border-white/30 h-full w-full">
                    <CardContent className="p-6 h-full flex flex-col justify-center items-center">
                      <Star className="h-8 w-8 text-yellow-400 mb-4" />
                      <p className="text-white/80 text-sm text-center">
                        Reviews coming soon!<br />
                        <span className="text-white/60 text-xs">Check back later for customer feedback</span>
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Review Indicators */}
              {heroReviews.length > 1 && (
                <div className="flex justify-center space-x-1 mt-4">
                  {heroReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentHeroReview(index);
                        handleUserInteraction();
                      }}
                      className="p-3 rounded-full transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-transparent"
                      aria-label={`Go to review ${index + 1} of ${heroReviews.length}`}
                      aria-pressed={index === currentHeroReview}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentHeroReview 
                            ? 'bg-pink-500 w-6' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
} 