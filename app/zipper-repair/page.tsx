"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Phone, MapPin, Star, Mail, Calendar, Award, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { locations } from '@/lib/data';

const serviceFeatures = [
  "Quick and efficient zipper repair services",
  "Walk-in service - no appointment needed", 
  "Professional technicians with years of experience",
  "Wide range of zipper types and sizes available",
  "Competitive pricing with quality guarantee",
  "Same-day service for most repairs"
];

const zipperSigns = [
  "The zipper separates after closing",
  "The pull tab is loose, stuck, or missing",
  "The zipper gets caught in the fabric",
  "Teeth are broken, misaligned, or missing",
  "Difficulty closing or opening the zipper smoothly"
];

const repairableItems = [
  "Dresses and skirts",
  "Pants, jeans, and trousers", 
  "Jackets, coats, and outerwear",
  "Uniforms and coveralls",
  "Jumpsuits and formalwear",
  "Bags and fabric pouches"
];

const professionalReasons = [
  "Proper consultation that matches the garment's original design",
  "Careful removal and stitching without damaging the fabric",
  "Access to durable replacement zippers for the long term",
  "Repairs completed using both industrial machines and hand-finishing methods"
];

const serviceOptions = [
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Every zipper repair comes with our satisfaction guarantee and quality workmanship."
  },
  {
    icon: Clock, 
    title: "Fast Turnaround",
    description: "Most zipper repairs completed same-day. Walk-ins welcome for immediate service."
  },
  {
    icon: Award,
    title: "Expert Craftsmanship", 
    description: "Professional repair techniques ensure your zippers work smoothly for years to come."
  }
];

export default function ZipperRepairPage() {
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
    { label: 'Zipper Repair', current: true }
  ];

  return (
    <div className="min-h-screen bg-white">
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
              ZIPPER REPAIR
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
                Walk-in Zipper Repair Services in Ottawa on Preston St. and Riverside Dr.
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                At <span className="text-pink-600 font-semibold">Nimble Needle Tailoring</span>, we provide prompt and timely zipper repair in Ottawa from our two walk-in locations: Preston Street and our new store on Riverside Drive. We handle zippers on a wide range of garments and accessories, using appropriate techniques to restore functionality without compromising quality or appearance. Our experienced professionals work efficiently.
              </p>

              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                Customers are welcome to walk in during business hours. No appointment or prior consultation is required.
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
                  src="/services/zipper.webp"
                  alt="Professional zipper repair services for all types of garments"
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

      {/* Signs That Indicate Zipper Repair Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-league-spartan">
              Signs That Indicate Zipper Repair Is Needed
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Zippers can wear out or malfunction with regular use. Common signs that your zipper may need professional attention include:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
            {zipperSigns.map((sign, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-pink-600" />
                  </div>
                </div>
                <p className="text-gray-700 font-montserrat">{sign}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            Ignoring these issues can damage the surrounding fabric or render clothing/items unusable. They'll repair and replace damaged zipper components properly, and it's likely to get your garment's zipper repaired in Ottawa.
          </p>
        </div>
      </section>

      {/* Garments and Items Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-league-spartan">
              Garments and Items with Repairable Zippers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team works with a variety of clothing and accessories that require zipper servicing, including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairableItems.map((item, index) => (
              <div key={index} className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-pink-600" />
                  <span className="text-gray-800 font-semibold font-montserrat">{item}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            We stay up-to-date with tech carefully to determine whether repair or complete zipper replacement is required.
          </p>
        </div>
      </section>

      {/* Why Choose Professional Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-league-spartan">
              Why Choose a Professional for Zipper Repair?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fixing a trained zipper ensures that the garment is repaired with care and technical skill. At <span className="text-pink-600 font-semibold">Nimble Needle Tailoring</span>, we strive to provide:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {professionalReasons.map((reason, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 font-montserrat">{reason}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            Our team puts return garments in functional condition, paying attention to clean stitching and structural support. <span className="text-pink-600 font-semibold">Contact us</span> today to learn more about our services, including alterations to enhance the fit of your garments.
          </p>
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