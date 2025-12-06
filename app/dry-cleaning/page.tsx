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
  Award,
  Calendar,
  Shirt,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { locations } from '@/lib/data';

const mainFeatures = [
  "Safe and gentle cleaning for all fabric types",
  "No appointment necessary — walk in anytime", 
  "Experienced team familiar with delicate and designer items",
  "Full garment inspection and pre-spotting included",
  "On-time service with a quality satisfaction guarantee",
  "Competitive pricing and eco-friendly solvents"
];

const cleaningSigns = [
  {
    title: "Persistent stains that don't wash out",
    description: "Stubborn stains require professional treatment"
  },
  {
    title: "Delicate fabric that can't go in the machine",
    description: "Silk, cashmere, wool need special care"
  },
  {
    title: "Fabrics that shrink, lose color, or lose shape in water",
    description: "Protect your investment with proper cleaning"
  },
  {
    title: "Clothes that have a strong odor or musty smell",
    description: "Professional cleaning eliminates deep-set odors"
  },
  {
    title: "Items with special finishes, beading, or embroidery",
    description: "Delicate details require expert handling"
  }
];

const garmentTypes = [
  { category: "Clothing", items: [
    "Shirts & Blouses",
    "Pants & Shorts", 
    "Dresses (casual, silk, evening gowns, and wedding dresses)",
    "Suits, Jackets & Coats (including Canada Goose & wool coats)",
    "Scarves, Shawls & Ties",
    "Skirts (pleated, silk, fancy)",
    "Lab Coats, Dishdashas, and Uniforms"
  ]},
  { category: "Household Items", items: [
    "Comforters, Blankets, and Sleeping Bags",
    "Curtains, Tablecloths, and Aprons"
  ]}
];

const whyChooseFeatures = [
  "Fabric-safe cleaning methods",
  "Detailed inspection and spot cleaning",
  "Eco-friendly and non-toxic solvents", 
  "Same-day or next-day service available",
  "Trusted by clients across Ottawa"
];

export default function DryCleaningPage() {
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

    // Cache current elements so cleanup uses stable references
    const heroElement = heroRef.current;
    const servicesElement = servicesRef.current;

    if (heroElement) observer.observe(heroElement);
    if (servicesElement) observer.observe(servicesElement);

    return () => {
      if (heroElement) observer.unobserve(heroElement);
      if (servicesElement) observer.unobserve(servicesElement);
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
    { label: 'Dry Cleaning', current: true }
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
              DRY CLEANING SERVICES
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
              Professional Dry Cleaning Services in Ottawa on Preston St. and Riverside Dr.
            </p>
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
                Expert Dry Cleaning for All Your Garments
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                At <span className="text-pink-600 font-semibold">Nimble Needle Tailoring</span>, we offer expert dry cleaning services at our two Ottawa locations—Preston Street and our new store on Riverside Drive. Whether it&#39;s everyday wear, delicate fabrics, or specialty items, our team uses proven techniques and professional-grade equipment to clean and refresh garments without damaging their quality.
              </p>

              <p className="text-lg text-pink-600 font-semibold mb-8 font-montserrat">
                Walk-ins are welcome during business hours. No appointment or prior consultation is required.
              </p>

              {/* Main Features */}
              <div className="space-y-4 mb-8">
                {mainFeatures.map((feature, index) => (
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
                  <Calendar className="h-5 w-5 mr-2" />
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
                Call or visit us in person at either of our two Ottawa locations.
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
                                  src="/services/washing.avif"
                alt="Professional dry cleaning services for delicate garments at Nimble Needle Tailoring"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-pink-500 rounded-2xl p-4 shadow-xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs Your Garment Needs Professional Dry Cleaning */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-league-spartan">
              Signs Your Garment Needs Professional Dry Cleaning
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-montserrat">
              Some garments require more than a simple wash. Signs you should bring your item in for dry cleaning:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cleaningSigns.map((sign, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 font-montserrat">
                        {sign.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-montserrat">
                        {sign.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-montserrat">
              We&#39;ll treat stains, protect fabric, and restore your garment to its original look.
            </p>
          </div>
        </div>
      </section>

      {/* Garments and Items We Clean */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-league-spartan">
              Garments and Household Items We Dry Clean
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-montserrat">
              We handle a wide range of garments, accessories, and household items with care and precision, including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {garmentTypes.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-league-spartan text-center">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Shirt className="h-5 w-5 text-pink-500" />
                      <span className="text-gray-700 font-montserrat">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-montserrat">
              We also offer expert care for silk, linen, wool, and other specialty fabrics.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-league-spartan">
              Why Choose Us for Dry Cleaning?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-montserrat mb-8">
              Bringing your clothes to a professional cleaner protects their quality, extends their life, and helps you look your best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {whyChooseFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 transition-all duration-1000 ${
                  isServicesVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <CheckCircle className="h-6 w-6 text-pink-500" />
                <span className="text-gray-700 font-montserrat text-lg">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700 font-montserrat max-w-4xl mx-auto">
              Our team takes pride in treating every garment like our own. From casual wear to formal attire, we clean with care and return your items fresh, pressed, and ready to wear.
            </p>
          </div>
        </div>
      </section>

      {/* Service Quality Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality Assurance */}
            <div className="text-center">
              <Card className="h-full border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    Every dry cleaning service comes with our satisfaction guarantee and quality workmanship.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Fast Turnaround */}
            <div className="text-center">
              <Card className="h-full border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat">
                    Fast Turnaround
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    Most dry cleaning completed same-day. Walk-ins welcome for immediate service.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Expert Craftsmanship */}
            <div className="text-center">
              <Card className="h-full border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-montserrat">
                    Expert Craftsmanship
                  </h3>
                  <p className="text-gray-600 font-montserrat">
                    Professional cleaning techniques ensure your garments look fresh and pristine for years to come.
                  </p>
                </CardContent>
              </Card>
            </div>
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