"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

// Simple service list for the left column
const services = [
  "Wedding Dress Alterations",
  "Suit & Jacket Tailoring", 
  "Pants & Skirt Hemming",
  "Shirt Alterations",
  "Zipper Repairs",
  "Custom Tailoring"
];

// Simple features list
const features = [
  "15+ years of experience",
  "Two Ottawa locations",
  "Free consultations",
  "Same-day service available"
];

export default function BookingsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalLoaded, setIsCalLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Simple intersection observer for main content
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mainRef.current) {
      observer.observe(mainRef.current);
    }

    return () => {
      if (mainRef.current) {
        observer.unobserve(mainRef.current);
      }
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

      {/* Main Content - Two Column Layout */}
      <section 
        ref={mainRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-league-spartan">
                  Book Your Appointment
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed font-montserrat">
                  Schedule your professional tailoring consultation. Our expert tailors will ensure the perfect fit for your clothing.
                </p>
                
                {/* Star Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">4.9/5</span>
                  <span className="text-gray-500">• 500+ customers</span>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 font-league-spartan">
                  Our Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700 font-montserrat">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 font-league-spartan">
                  Why Choose Us
                </h2>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700 font-montserrat">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 font-league-spartan">
                  Our Locations
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700 font-montserrat">Downtown Preston St, Ottawa</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700 font-montserrat">Riverside Dr, Ottawa</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4">
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                  onClick={() => document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:pl-8">
              <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white">
                <CardContent className="p-0">
                  <div className="bg-gray-900 text-white p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                    <h2 className="text-2xl font-bold mb-2 font-league-spartan">
                      Schedule Appointment
                    </h2>
                    <p className="text-gray-300">
                      Choose your preferred date and time
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gray-50">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                      {/* Cal.com Embedded Widget */}
                      <div 
                        id="booking-widget"
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
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-4"></div>
                              <p className="text-gray-600">Loading calendar...</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Setup Note */}
                      <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Setup Note:</strong> Cal.com integration required:
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Create Cal.com account</li>
                          <li>• Replace username in data-cal-link</li>
                          <li>• Configure available time slots</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-league-spartan">
              Need urgent alterations?
            </h2>
            <p className="text-xl text-gray-600 font-montserrat">
              Call us directly for rush orders and same-day service
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                onClick={() => window.open('tel:+16138001234', '_self')}
              >
                <span>Call Preston Location</span>
                <ExternalLink className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                onClick={() => window.open('tel:+16138001234', '_self')}
              >
                <span>Call Riverside Location</span>
                <ExternalLink className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 