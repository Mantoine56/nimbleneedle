"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Phone, MapPin, Star, Mail, Calendar, Award, Clock, ArrowRight, CheckCircle, Crown, Heart, Sparkles, Shield } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import { locations, detailedReviews } from '@/lib/data';

const serviceFeatures = [
  "Professional wedding dress alterations and fittings",
  "Walk-in service - no appointment needed", 
  "Expert seamstresses with specialized bridal experience",
  "Careful handling of delicate fabrics and embellishments",
  "Comprehensive alteration services for perfect fit",
  "Quick turnaround times for your special day"
];

const commonAlterations = [
  "Hem shortening for the perfect length",
  "Bodice adjustments (taking in or letting out)",
  "Strap, sleeve, or shoulder modifications",
  "Adding or removing built-in cups for comfort",
  "Bustle creation for train management",
  "Zipper repair or complete replacement if needed"
];

const fabricTypes = [
  "Lace and delicate embroidered fabrics",
  "Chiffon, tulle, and flowing materials", 
  "Silk, satin, and luxurious fabrics",
  "Beaded and sequined gowns",
  "Vintage and heirloom dresses",
  "Modern designer wedding gowns"
];

const professionalBenefits = [
  "Preserve delicate materials like lace, chiffon, and silk with expert care",
  "Apply precise stitching and hidden seams for flawless appearance",
  "Use specialized tools for beadwork and embroidery adjustments",
  "Ensure balanced and secure fit based on posture and body movement"
];

const serviceOptions = [
  {
    icon: Crown,
    title: "Bridal Specialists",
    description: "Specialized expertise in wedding dress alterations with attention to every detail."
  },
  {
    icon: Clock, 
    title: "Timely Service",
    description: "Most alterations completed within 1-2 weeks. Rush service available for urgent needs."
  },
  {
    icon: Heart,
    title: "Personalized Care", 
    description: "Individual attention and multiple fittings to ensure your dress fits perfectly."
  }
];

export default function WeddingDressAlterationsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
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
            } else if (entry.target === testimonialsRef.current) {
              setIsTestimonialsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
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
    { label: 'Wedding Dress Alterations', current: true }
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
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
              WEDDING DRESS ALTERATIONS
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Beautiful Wedding Dress Alterations in Ottawa on Preston St. and Riverside Dr.
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                At <span className="text-pink-600 font-semibold">Nimble Needle Tailoring</span>, we specialize in wedding dress alterations in Ottawa from our two convenient walk-in locations: Preston Street and Riverside Drive. We understand that your wedding dress is one of the most important garments you'll ever wear, and we're dedicated to ensuring it fits you perfectly on your special day.
              </p>

              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                Our experienced seamstresses work with all types of wedding dresses, from vintage family heirlooms to modern designer gowns. Most alterations can be completed in 1-2 weeks, with rush service available when needed.
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
                  onClick={() => window.location.href = '/contact-us'}
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
                    <h3 className="text-white font-semibold font-playfair text-lg">Call Nimble Needle</h3>
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
                Call to schedule your fitting or visit our shop during business hours. Walk-ins welcome!
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
                  src="/services/alterations.webp"
                  alt="Professional wedding dress alterations for the perfect fit"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-pink-500 rounded-2xl p-4 shadow-xl">
                  <Crown className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Wedding Dress Alterations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Common Wedding Dress Alterations We Provide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our skilled seamstresses can handle a wide range of wedding dress alterations to ensure your gown fits perfectly:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-4xl mx-auto">
            {commonAlterations.map((alteration, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-pink-600" />
                  </div>
                </div>
                <p className="text-gray-700 font-montserrat">{alteration}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            Each alteration is carefully planned and executed to maintain the integrity and beauty of your wedding dress while ensuring a perfect fit.
          </p>
        </div>
      </section>

      {/* Fabric Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Wedding Dress Fabrics We Work With
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team works with all types of wedding dress fabrics and materials:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fabricTypes.map((fabric, index) => (
              <div key={index} className="bg-pink-50 p-6 rounded-xl border border-pink-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-pink-600" />
                  <span className="text-gray-800 font-semibold font-montserrat">{fabric}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            We use specialized techniques and tools appropriate for each fabric type to ensure the best possible results.
          </p>
        </div>
      </section>

      {/* Benefits of Professional Alterations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Benefits of Hiring a Professional for Wedding Dress Alterations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional wedding dress alterations ensure your gown is handled with the expertise and care it deserves. At <span className="text-pink-600 font-semibold">Nimble Needle Tailoring</span>, we provide:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {professionalBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 font-montserrat">{benefit}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8 max-w-3xl mx-auto">
            Trust our skilled seamstresses to make your wedding dress fit like it was made just for you. <span className="text-pink-600 font-semibold">Contact us</span> today to schedule your fitting consultation.
          </p>
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

      {/* Customer Testimonials */}
      <section 
        ref={testimonialsRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedReviews.slice(0, 4).map((review, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  isTestimonialsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <Card className="h-full bg-white border-0 rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review.text.substring(0, 120)}...
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}