"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  Star,
  HelpCircle,
  Diamond,
  Zap,
  Award
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { locations } from '@/lib/data';

const serviceFeatures = [
  "Custom Tailoring",
  "Retail Suit Adjustments", 
  "Perfect Fit Guaranteed",
  "Quality Fabrics",
  "Proudly Serving Ottawa"
];

const serviceOptions = [
  {
    icon: HelpCircle,
    title: "I have questions",
    description: "Not sure about sizing or style? Our experienced tailors can guide you through the process and recommend the best options!"
  },
  {
    icon: Diamond,
    title: "I need it done right",
    description: "We specialize in both custom suits and retail suit adjustments. Professional results with attention to every detail."
  },
  {
    icon: Zap,
    title: "I have an urgent need",
    description: "Need a suit for a special event? We offer rush services to meet your deadline!"
  }
];

export default function CustomSuitsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const callPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) {
              setIsHeroVisible(true);
            } else if (entry.target === servicesRef.current) {
              setIsServicesVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
    };
  }, []);

  // Handle click outside for popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (callPopupRef.current && !callPopupRef.current.contains(event.target as Node)) {
        setIsCallPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Custom Suits and Retail Suits', current: true }
  ];

  return (
    <div className="min-h-screen bg-white mobile-safe">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-league-spartan">
              CUSTOM SUITS &<br />RETAIL SUITS
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        ref={heroRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className={`transition-all duration-1000 ${
              isHeroVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-league-spartan">
                Looking for a custom made or retail suit that fits perfectly?
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                We have a selection of retail suits or we can create a custom one for you. 
                Our experienced tailors ensure the perfect fit for your special occasion or everyday wear.
              </p>

              {/* Service Features */}
              <div className="space-y-4 mb-8">
                {serviceFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-1000 ${
                      isHeroVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    <CheckCircle className="h-5 w-5 text-pink-500" />
                    <span className="text-gray-700 font-montserrat">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 relative">
                <Button
                  onClick={() => window.location.href = '/bookings'}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Book an Appointment
                </Button>
                <Button 
                  onClick={() => setIsCallPopupOpen(!isCallPopupOpen)}
                  variant="outline" 
                  className="border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg font-semibold rounded-full"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us
                </Button>
              </div>

              {/* Call Popup */}
              {isCallPopupOpen && (
                <div 
                  ref={callPopupRef}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                    <h3 className="text-white font-semibold font-league-spartan text-lg">Call Nimble Needle</h3>
                    <p className="text-white/80 text-sm">Choose your preferred location</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {locations.map((location, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                        <h4 className="font-semibold text-gray-900 font-montserrat mb-2">{location.name}</h4>
                        <Button
                          onClick={() => {
                            window.open(`tel:${location.phone.replace(/[^\d]/g, '')}`);
                            setIsCallPopupOpen(false);
                          }}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {location.phone}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backdrop for popup */}
              {isCallPopupOpen && (
                <div 
                  className="fixed inset-0 bg-black/50 z-[9998]"
                  onClick={() => setIsCallPopupOpen(false)}
                />
              )}

              <p className="text-sm text-gray-500 mt-4 font-montserrat">
                Call to get your questions answered or visit our shop. No appointment necessary. Walk-ins welcome!
              </p>
            </div>

            {/* Right Side - Image */}
            <div className={`transition-all duration-1000 delay-300 ${
              isHeroVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <Image
                  src="/services/customsuit.avif"
                  alt="Professional custom suit tailoring and retail suit adjustments"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-pink-500 rounded-2xl p-4 shadow-xl">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-lg font-semibold text-gray-900">EXCELLENT</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">819 reviews</span>
              <Image
                src="/logo.png"
                alt="Google Reviews"
                width={60}
                height={20}
                className="opacity-60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section 
        ref={servicesRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {serviceOptions.map((option, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  isServicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <option.icon className="h-8 w-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 font-montserrat">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviewsSection 
        ctaText="Book an Appointment"
        ctaLink="/bookings"
      />

      <Footer />
    </div>
  );
} 