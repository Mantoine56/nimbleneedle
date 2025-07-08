"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone, MapPin, Clock, Scissors, Shirt, Users, Award, ChevronLeft, ChevronRight, Quote, Heart, Shield, MessageCircle, Mail, Facebook, Instagram, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import HeroSection from '@/components/HeroSection';
import { testimonials, services, features, locations, detailedReviews } from '@/lib/data';
import { getAllBlogPosts } from '@/lib/blog-data';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const servicesRef = useRef<HTMLElement>(null);
  const promiseRef = useRef<HTMLElement>(null);
  const craftsmanRef = useRef<HTMLElement>(null);
  const blogPosts = getAllBlogPosts().slice(0, 3); // Get latest 3 posts

  const locationRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isPromiseVisible, setIsPromiseVisible] = useState(false);
  const [isCraftsmanVisible, setIsCraftsmanVisible] = useState(false);

  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [isBlogVisible, setIsBlogVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isCarouselVisible) {
      timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCarouselVisible]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === servicesRef.current) {
              setIsServicesVisible(true);
            } else if (entry.target === promiseRef.current) {
              setIsPromiseVisible(true);
            } else if (entry.target === craftsmanRef.current) {
              setIsCraftsmanVisible(true);
            } else if (entry.target === locationRef.current) {
              setIsLocationVisible(true);
            } else if (entry.target === reviewsRef.current) {
              setIsReviewsVisible(true);
              setIsCarouselVisible(true);
            } else if (entry.target === blogRef.current) {
              setIsBlogVisible(true);
            }
          } else {
            if (entry.target === reviewsRef.current) {
              setIsCarouselVisible(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [servicesRef.current, promiseRef.current, craftsmanRef.current, locationRef.current, reviewsRef.current, blogRef.current];
    refs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white mobile-safe">
      <Navigation />
      <SocialSidebar />

      {/* Optimized Hero Section Component */}
      <HeroSection scrollY={scrollY} />

      {/* Enhanced Services Section */}
      <section 
        ref={servicesRef}
        className="relative py-16 md:py-20 bg-white overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isServicesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase">
                SERVICES
              </span>
              <div className="w-16 h-0.5 bg-pink-500 mx-auto mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-league-spartan">
              EXPERIENCE OUR HASSLE-<br />
              FREE CLOTHING SERVICES
            </h2>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              We handle all fabrics and styles
            </p>
          </div>
          
          {/* Service Cards Grid - Completely Rebuilt */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${
                  isServicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${service.delay}ms`
                }}
              >
                {/* Modern Service Card Design */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 group h-full border border-gray-100">
                  
                  {/* Top Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} - Professional tailoring services at Nimble Needle Ottawa`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Floating Number Badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                      <span className="text-lg font-bold font-league-spartan text-gray-800 group-hover:text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 relative">
                    {/* Service Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight font-league-spartan group-hover:text-gray-800 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="text-gray-600 leading-relaxed text-sm mb-6 font-montserrat line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                      {service.subtitle}
                    </p>

                    {/* Action Area */}
                    <div className="flex items-center justify-between">
                      {/* Learn More Link */}
                      <button 
                        onClick={() => {
                          const serviceLinks = ['/clothing-alterations', '/services', '/zipper-repair'];
                          window.location.href = serviceLinks[index] || '/services';
                        }}
                        className="group/btn inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold text-sm transition-all duration-300 transform group-hover:translate-x-1">
                        <span className="font-montserrat">Learn More</span>
                        <svg 
                          className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Decorative Dot Pattern */}
                      <div className="flex space-x-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                      </div>
                    </div>

                    {/* Subtle Bottom Border Accent */}
                    <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500/5 via-transparent to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-1000 delay-600 ${
            isServicesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/services'}
            >
              VIEW ALL SERVICES
            </Button>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section 
        ref={promiseRef}
        className="relative py-16 md:py-20 bg-gray-50 overflow-hidden"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image Column */}
            <div className={`relative transition-all duration-1000 ${
              isPromiseVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/promise-image.webp"
                  alt="Professional tailor working on clothing alterations at Nimble Needle Ottawa tailoring shop"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-3xl shadow-2xl"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
              </div>
            </div>

            {/* Content Column */}
            <div className={`transition-all duration-1000 delay-300 ${
              isPromiseVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}>
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight font-league-spartan">
                  OUR<br />
                  PROMISE
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-montserrat">
                  We are proud to be an Ottawa company that delivers top-quality services to our clients. Our family-run business can meet your needs for clothing alterations, repairs and custom sewing for clothing and other textiles. With high-quality work, quick turnaround times, and friendly service, we&apos;ve earned the trust of hundreds of highly satisfied customers.
                </p>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = '/about'}
                >
                  LEARN MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Craftsman Ship Section */}
      <section 
        ref={craftsmanRef}
        className="relative py-16 md:py-20 bg-white overflow-hidden"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Content Column */}
            <div className={`order-2 lg:order-1 transition-all duration-1000 ${
              isCraftsmanVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}>
              <div className="max-w-xl">
                <div className="mb-6">
                  <span className="text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase font-montserrat">
                    CRAFT
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight font-league-spartan">
                  THE<br />
                  CRAFTSMAN<br />
                  SHIP
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed font-montserrat">
                  At our tailoring studio, we pride ourselves on delivering high-quality craftsmanship with quick turnaround times, all while providing friendly, personalized service. No appointment needed - we offer fixed, clear pricing and handle all fabrics and styles. Our commitment to excellence has earned us the trust and satisfaction of countless happy customers.
                </p>
                <Button 
                  onClick={() => window.location.href = '/about'}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105">
                  LEARN MORE
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${
              isCraftsmanVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/craftsmanship-image.webp"
                  alt="Master craftsman demonstrating expert tailoring techniques at Nimble Needle Ottawa"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-3xl shadow-2xl"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Rebuilt Clean */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase font-montserrat">
                WHY CHOOSE US
              </span>
              <div className="w-16 h-0.5 bg-pink-500 mx-auto mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 font-league-spartan">
              EXPERIENCE THE<br />
              NIMBLE NEEDLE<br />
              DIFFERENCE
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-montserrat">
              Discover what makes our tailoring services exceptional
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-3xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-pink-200">
                    <CardContent className="p-0">
                      {/* Icon */}
                      <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300 transform group-hover:scale-110">
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-league-spartan">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-base font-montserrat">
                        {feature.description}
                      </p>
                      
                      {/* Decorative Element */}
                      <div className="mt-6 w-12 h-0.5 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section 
        ref={locationRef}
        className="relative py-16 md:py-20 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isLocationVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase">
                LOCATIONS
              </span>
              <div className="w-16 h-0.5 bg-pink-500 mx-auto mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              VISIT US AT OUR<br />
              TWO CONVENIENT<br />
              OTTAWA LOCATIONS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                We&apos;re here to serve you better with two locations across Ottawa
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isLocationVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${location.delay}ms`
                }}
              >
                <Card className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Map Embed */}
                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                      <iframe
                        src={location.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      ></iframe>
                      {/* Overlay for styling */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                    
                    {/* Location Details */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        {location.name}
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-700 font-medium">{location.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Phone className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-700 font-medium">{location.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-pink-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-700 font-medium">{location.hours.weekdays}</p>
                            <p className="text-gray-700">{location.hours.saturday}</p>
                            <p className="text-gray-700">{location.hours.sunday}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-3">
                        <Button 
                          onClick={() => {
                            const address = encodeURIComponent(location.address);
                            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                          }}
                          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white flex-1">
                          Get Directions
                        </Button>
                        <Button 
                          onClick={() => window.location.href = `tel:${location.phone.replace(/[^0-9]/g, '')}`}
                          variant="outline" 
                          className="border-pink-500 text-pink-600 hover:bg-pink-50 flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section 
        ref={reviewsRef}
        className="relative py-16 md:py-20 bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isReviewsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase">
                TESTIMONIALS
              </span>
              <div className="w-16 h-0.5 bg-pink-500 mx-auto mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              WHAT OUR CLIENTS<br />
              SAY ABOUT US
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-700 ml-2">4.9/5</span>
              <span className="text-gray-500">• 500+ Reviews</span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {detailedReviews.map((review, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isReviewsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 rounded-2xl">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Review Text */}
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow italic">
                      &quot;{review.text}&quot;
                    </p>
                    
                    {/* Service Badge */}
                    <div className="mb-4">
                      <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-3 py-1">
                        {review.service}
                      </Badge>
                    </div>
                    
                    {/* Reviewer Info */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-1000 delay-600 ${
            isReviewsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-lg text-gray-600 mb-6">
              Ready to experience our exceptional service?
            </p>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/bookings'}
            >
              Book Your Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isBlogVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold font-league-spartan text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tips, insights, and expert advice on tailoring and garment care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/blog'}
            >
              View All Blog Posts
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}