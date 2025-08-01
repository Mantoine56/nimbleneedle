"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Star, 
  Phone, 
  MapPin, 
  Clock,
  Users,
  Award,
  Scissors,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Mail,
  Facebook,
  Instagram
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { locations } from '@/lib/data';

const teamValues = [
  {
    value: "Expert Craftsmanship",
    description: "Over 20 years of experience in tailoring and alterations with meticulous attention to detail.",
    icon: Award
  },
  {
    value: "Family Service",
    description: "As a family-run business, we provide personal attention and care that larger shops simply can't match.",
    icon: Heart
  },
  {
    value: "No Appointment Needed",
    description: "We respect your busy schedule. Walk-ins are always welcome at both of our convenient locations.",
    icon: Clock
  },
  {
    value: "Transparent Pricing",
    description: "Fixed, clear pricing with no hidden fees. You'll know exactly what you're paying before we start.",
    icon: Shield
  },
  {
    value: "Quick Turnaround",
    description: "Most alterations completed within 3-5 days, with rush services available when you need them.",
    icon: Sparkles
  },
  {
    value: "Customer Satisfaction",
    description: "Hundreds of satisfied customers trust us with their most important garments and special occasions.",
    icon: Users
  }
];

const milestones = [
  {
    year: "2008",
    title: "Founded in Ottawa",
    description: "Started our journey as a small family tailoring business with a commitment to quality and service."
  },
  {
    year: "2015", 
    title: "Preston Location Established",
    description: "Opened our first dedicated location on Preston Street, serving downtown Ottawa customers."
  },
  {
    year: "2020",
    title: "Expanded Services", 
    description: "Added specialized wedding dress alterations and formal wear services to meet growing demand."
  },
  {
    year: "2023",
    title: "Riverside Location",
    description: "Opened our second location on Riverside Drive to better serve the Ottawa community."
  },
  {
    year: "2025",
    title: "20+ Years Strong",
    description: "Continuing our tradition of excellence with over 5,000 satisfied customers served."
  }
];

const services = [
  "Wedding dress alterations",
  "Suit and formal wear tailoring", 
  "Casual clothing alterations",
  "Zipper repair and replacement",
  "Bridesmaid dress fitting",
  "Custom clothing creation",
  "Vintage clothing restoration",
  "Household textile repairs"
];

export default function AboutPage() {
  const [visibleMilestones, setVisibleMilestones] = useState<boolean[]>(new Array(milestones.length).fill(false));
  const [isTimelineEndVisible, setIsTimelineEndVisible] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineEndRef = useRef<HTMLDivElement>(null);
  const locationPopupRef = useRef<HTMLDivElement>(null);
  const callPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = milestoneRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleMilestones(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            } else if (entry.target === timelineEndRef.current) {
              setIsTimelineEndVisible(true);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    milestoneRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    if (timelineEndRef.current) {
      observer.observe(timelineEndRef.current);
    }

    return () => {
      milestoneRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      if (timelineEndRef.current) {
        observer.unobserve(timelineEndRef.current);
      }
    };
  }, []);

  // Handle click outside for popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationPopupRef.current && !locationPopupRef.current.contains(event.target as Node)) {
        setIsLocationPopupOpen(false);
      }
      if (callPopupRef.current && !callPopupRef.current.contains(event.target as Node)) {
        setIsCallPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const breadcrumbItems = [
    { label: 'About', current: true }
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Company Information */}
            <div className="order-2 lg:order-1">
              <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-4 py-2 text-sm font-medium mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Family-Run Business Since 2008
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-league-spartan">
                ABOUT<br />
                <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  NIMBLE NEEDLE
                </span><br />
                TAILORING
              </h1>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-montserrat mb-8">
                <p>
                  Nimble Needle Tailoring is a family-run business serving customers in Ottawa 
                  and surrounding areas. We provide high-quality clothing alteration and tailoring 
                  services for all fabrics and clothing styles.
                </p>
                
                <p>
                  Our goal is to provide our customers the results they are looking for efficiently, 
                  affordably, and worry-free. We are very proud to have so many satisfied customers!
                </p>
                
                <p className="font-semibold text-pink-600">
                  Serving customers in English, Arabic, and Kurdish.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">20+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">5000+</div>
                  <div className="text-sm text-gray-600">Customers Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-1">2</div>
                  <div className="text-sm text-gray-600">Ottawa Locations</div>
                </div>
              </div>

              {/* Simplified Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 relative">
                {/* Call Us Popup Button */}
                <div className="relative z-10">
                  <Button 
                    onClick={() => {
                      console.log('Call button clicked, current state:', isCallPopupOpen);
                      setIsCallPopupOpen(!isCallPopupOpen);
                      setIsLocationPopupOpen(false);
                    }}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Us
                  </Button>
                </div>

                {/* Visit Locations Popup Button */}
                <div className="relative z-10">
                  <Button 
                    onClick={() => {
                      console.log('Location button clicked, current state:', isLocationPopupOpen);
                      setIsLocationPopupOpen(!isLocationPopupOpen);
                      setIsCallPopupOpen(false);
                    }}
                    variant="outline" 
                    className="border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg font-semibold rounded-full"
                  >
                                      <MapPin className="h-5 w-5 mr-2" />
                  Our Locations
                  </Button>
                </div>
              </div>

              {/* Call Popup - Fixed positioning */}
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

              {/* Location Popup - Fixed positioning */}
              {isLocationPopupOpen && (
                <div 
                  ref={locationPopupRef}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                    <h3 className="text-white font-semibold font-league-spartan text-lg">Our Locations</h3>
                    <p className="text-white/80 text-sm">Get directions to our locations</p>
                  </div>
                  <div className="p-4 space-y-4">
                    {locations.map((location, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                        <h4 className="font-semibold text-gray-900 font-montserrat">{location.name}</h4>
                        <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {location.address}
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" />
                          {location.phone}
                        </p>
                        <div className="text-gray-600 text-sm flex items-start gap-1 mt-1">
                          <Clock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p>Tue-Sat: 9am-9pm</p>
                            <p>Sun-Mon: 10am-7pm</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => {
                              // Use the business name in the search to get to the actual business page
                              const businessSearch = location.name.includes('Preston') 
                                ? 'https://www.google.com/maps/search/Nimble+Needle+Tailoring+141+Preston+St+Ottawa'
                                : 'https://www.google.com/maps/search/Nimble+Needle+Tailoring+3681+Riverside+Dr+Ottawa';
                              window.open(businessSearch, '_blank');
                              setIsLocationPopupOpen(false);
                            }}
                            size="sm"
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs"
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            Directions
                          </Button>
                          <Button
                            onClick={() => {
                              window.open(`tel:${location.phone.replace(/[^\d]/g, '')}`);
                              setIsLocationPopupOpen(false);
                            }}
                            size="sm"
                            variant="outline"
                            className="flex-1 border-gray-300 hover:bg-gray-100 text-gray-700 text-xs"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backdrop for popups */}
              {(isCallPopupOpen || isLocationPopupOpen) && (
                <div 
                  className="fixed inset-0 bg-black/50 z-[9998]"
                  onClick={() => {
                    setIsCallPopupOpen(false);
                    setIsLocationPopupOpen(false);
                  }}
                />
              )}
            </div>

            {/* Parliament Hill Image */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="relative inline-block">
                <Image
                  src="/parliament-hill.jpg"
                  alt="Parliament Hill Ottawa - Home of Canada's Capital where Nimble Needle Tailoring serves the community"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-pink-500 rounded-2xl p-4 shadow-xl">
                  <Scissors className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviewsSection 
        title="WHAT OUR CUSTOMERS ARE SAYING"
        subtitle="CUSTOMER REVIEWS"
        className="bg-gray-50"
        ctaText="Contact Us Today"
        ctaLink="/contact-us"
      />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Company Branding */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-2">
                    <Image
                      src="/logo.png"
                      alt="Nimble Needle Tailoring - Ottawa's premier clothing alterations and tailoring service logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-2xl font-bold font-league-spartan">Nimble Needle Tailoring</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed font-montserrat">
                  Your one-stop shop for all your tailoring and clothing alteration needs in Ottawa!
                </p>
                
                {/* Social Media */}
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2" 
                    onClick={() => window.open('https://www.facebook.com/NimbleNeedleTailoring', '_blank')}
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-2" 
                    onClick={() => window.open('https://www.instagram.com/nimble.needle.tailoring', '_blank')}
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preston Location */}
              <div>
                <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">Downtown Ottawa - Preston</h3>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">141 Preston St</p>
                      <p>Ottawa, ON K1R 7P4</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-pink-400 flex-shrink-0" />
                    <a href="tel:3435881300" className="hover:text-pink-400 transition-colors font-medium">
                      (343) 588-1300
                    </a>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Tue-Sat: 9am-9pm</p>
                      <p>Sun-Mon: 10am-7pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Riverside Location */}
              <div>
                <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">New Location - Riverside</h3>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">3681 Riverside Dr</p>
                      <p>Ottawa, ON K1V 1H7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-pink-400 flex-shrink-0" />
                    <a href="tel:3435883182" className="hover:text-pink-400 transition-colors font-medium">
                      (343) 588-3182
                    </a>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Tue-Sat: 9am-9pm</p>
                      <p>Sun-Mon: 10am-7pm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services & Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">Services</h3>
                <ul className="space-y-3 text-gray-300 font-montserrat mb-6">
                  <li><a href="/clothing-alterations" className="hover:text-pink-400 transition-colors">Alterations & Repairs</a></li>
                  <li><a href="/services" className="hover:text-pink-400 transition-colors">Custom & Retail Suits</a></li>
                  <li><a href="/zipper-repair" className="hover:text-pink-400 transition-colors">Zipper Repair</a></li>
                  <li><a href="/wedding-dress-alterations" className="hover:text-pink-400 transition-colors">Wedding Dress Alterations</a></li>
                  <li><a href="/services" className="hover:text-pink-400 transition-colors">All Services</a></li>
                </ul>

                {/* Email Contact */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="h-5 w-5 text-pink-400" />
                    <span className="font-semibold text-pink-400">Email Us</span>
                  </div>
                  <a 
                    href="mailto:info@nimbleneedle.ca" 
                    className="text-gray-300 hover:text-pink-400 transition-colors whitespace-nowrap block text-sm"
                  >
                    info@nimbleneedle.ca
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm font-montserrat">
                Copyright © 2025 - Nimble Needle Tailoring
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400 font-montserrat">
                <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-xs font-semibold">
                  Walk-ins Welcome
                </span>
                <a href="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="hover:text-pink-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}