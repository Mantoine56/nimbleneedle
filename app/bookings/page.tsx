"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle, 
  Users, 
  Award, 
  Scissors,
  Heart,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

// Service categories for booking
const serviceCategories = [
  {
    title: "Wedding & Formal",
    icon: Heart,
    services: ["Wedding Dress Alterations", "Prom Dress Alterations", "Formal Wear Fitting"],
    description: "Perfect fit for your special day",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50"
  },
  {
    title: "Everyday Alterations",
    icon: Scissors,
    services: ["Pants Hemming", "Shirt Tailoring", "Jacket Adjustments"],
    description: "Professional alterations for daily wear",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "Custom Tailoring",
    icon: Award,
    services: ["Custom Suits", "Bespoke Fitting", "Complete Tailoring"],
    description: "Made-to-measure perfection",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50"
  }
];

// Booking process steps
const bookingSteps = [
  {
    step: 1,
    title: "Choose Your Service",
    description: "Select the type of alteration or tailoring service you need",
    icon: Scissors
  },
  {
    step: 2,
    title: "Pick Your Time",
    description: "Choose a convenient appointment time that works for you",
    icon: Calendar
  },
  {
    step: 3,
    title: "Visit Our Shop",
    description: "Come to one of our Ottawa locations for your fitting",
    icon: MapPin
  }
];

// Why book with us benefits
const bookingBenefits = [
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book appointments that fit your busy schedule"
  },
  {
    icon: Users,
    title: "Expert Tailors",
    description: "15+ years of professional tailoring experience"
  },
  {
    icon: Star,
    title: "5-Star Service",
    description: "Join hundreds of satisfied customers"
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "100% satisfaction or your money back"
  }
];

export default function BookingsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isCalVisible, setIsCalVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isStepsVisible, setIsStepsVisible] = useState(false);
  const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);
  const [isCalLoaded, setIsCalLoaded] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const calRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) {
              setIsHeroVisible(true);
            } else if (entry.target === calRef.current) {
              setIsCalVisible(true);
            } else if (entry.target === servicesRef.current) {
              setIsServicesVisible(true);
            } else if (entry.target === stepsRef.current) {
              setIsStepsVisible(true);
            } else if (entry.target === benefitsRef.current) {
              setIsBenefitsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [heroRef, calRef, servicesRef, stepsRef, benefitsRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Load Cal.com script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    script.onload = () => setIsCalLoaded(true);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const breadcrumbItems = [
    { label: 'Book Appointment', current: true }
  ];

  return (
    <div className="min-h-screen bg-white mobile-safe">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative py-20 bg-gradient-to-br from-pink-50 to-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${
              isHeroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
                Book Your Appointment
              </h1>
              
              <div className="space-y-4 text-gray-700 text-lg md:text-xl leading-relaxed font-montserrat mb-8">
                <p className="text-2xl md:text-3xl font-semibold">
                  Schedule your professional tailoring consultation
                </p>
                
                <p className="text-lg text-pink-600 font-medium">
                  Choose from our flexible appointment times • Two convenient Ottawa locations
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-xl font-semibold text-gray-700 ml-2">4.9/5</span>
                <span className="text-gray-500">• 500+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cal.com Booking Widget */}
      <section 
        ref={calRef}
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${
            isCalVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <Card className="shadow-2xl rounded-3xl overflow-hidden border-0 bg-white">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2 font-playfair">
                    Schedule Your Appointment
                  </h2>
                  <p className="text-pink-100 text-lg">
                    Choose your preferred date and time below
                  </p>
                </div>
                
                <div className="p-8 bg-gray-50">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    {/* Cal.com Embedded Widget */}
                    <div 
                      className="cal-inline-embed"
                      data-cal-link="your-cal-username/consultation"
                      data-cal-config='{"layout":"month_view","theme":"light"}'
                      style={{ 
                        width: '100%', 
                        height: '600px',
                        overflow: 'hidden'
                      }}
                    >
                      {!isCalLoaded && (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading appointment calendar...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fallback for Cal.com setup */}
                    <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <p className="text-sm text-pink-800 mb-2">
                        <strong>Note:</strong> To complete the Cal.com integration, you'll need to:
                      </p>
                      <ul className="text-sm text-pink-700 space-y-1">
                        <li>1. Sign up for a Cal.com account</li>
                        <li>2. Replace "your-cal-username" with your actual Cal.com username</li>
                        <li>3. Configure your available time slots and services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isServicesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              What can we help you with?
            </h2>
            <p className="text-xl text-gray-600 font-montserrat">
              Choose from our comprehensive range of tailoring services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isServicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <Card className={`h-full ${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl overflow-hidden`}>
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} mb-6`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 font-montserrat">
                      {category.description}
                    </p>
                    
                    <div className="space-y-2">
                      {category.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-pink-500" />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section 
        ref={stepsRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isStepsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 font-montserrat">
              Simple steps to get your perfect fit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bookingSteps.map((step, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  isStepsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`
                }}
              >
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white mb-6 shadow-lg">
                    <step.icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  {index < bookingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-pink-200 transform -translate-y-1/2"></div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-playfair">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 font-montserrat">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isBenefitsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Why Book With Us?
            </h2>
            <p className="text-xl text-gray-600 font-montserrat">
              Experience the difference of professional tailoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  isBenefitsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-6">
                    <benefit.icon className="h-8 w-8 text-pink-600" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-playfair">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 font-montserrat">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-playfair">
            Need urgent alterations?
          </h2>
          <p className="text-xl text-pink-100 mb-8 font-montserrat">
            Call us directly for rush orders and same-day services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('tel:+13435881300', '_self')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Preston Location
            </Button>
            <Button 
              className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open('tel:+13435883182', '_self')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Riverside Location
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 