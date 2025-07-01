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
import { detailedReviews, locations } from '@/lib/data';

const teamValues = [
  {
    value: "Expert Craftsmanship",
    description: "Over 15 years of experience in tailoring and alterations with meticulous attention to detail.",
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
    title: "15+ Years Strong",
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
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineEndRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
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
            } else if (entry.target === reviewsRef.current) {
              setIsReviewsVisible(true);
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

    if (reviewsRef.current) {
      observer.observe(reviewsRef.current);
    }

    return () => {
      milestoneRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      if (timelineEndRef.current) {
        observer.unobserve(timelineEndRef.current);
      }
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current);
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
    <div className="min-h-screen bg-white">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section with Riber Baabo */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Company Information */}
            <div>
              <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-4 py-2 text-sm font-medium mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Family-Run Business Since 2008
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
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
                  <div className="text-3xl font-bold text-gray-800 mb-1">15+</div>
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
                    Visit Our Locations
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

              {/* Location Popup - Fixed positioning */}
              {isLocationPopupOpen && (
                <div 
                  ref={locationPopupRef}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                    <h3 className="text-white font-semibold font-playfair text-lg">Visit Nimble Needle</h3>
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
                        <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {location.hours.weekdays}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => {
                              const address = encodeURIComponent(location.address);
                              window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
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

            {/* Riber's Photo */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                <Image
                  src="/wordpress-media/original/riber_photo.jpg"
                  alt="Riber Baabo - Expert tailor with over 15 years experience at Nimble Needle Tailoring"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-pink-500 rounded-2xl p-4 shadow-xl">
                  <Scissors className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 font-playfair mb-2">Riber Baabo</h3>
                <p className="text-pink-600 font-semibold">Master tailor with over 15 years experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section 
        ref={reviewsRef}
        className="relative py-20 bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isReviewsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500 tracking-[0.2em] uppercase">
                CUSTOMER REVIEWS
              </span>
              <div className="w-16 h-0.5 bg-pink-500 mx-auto mt-2"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
              WHAT OUR CUSTOMERS<br />
              ARE SAYING
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
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
              onClick={() => window.location.href = '/contact-us'}
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Complete Tailoring Services
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 font-montserrat">
                From everyday alterations to special occasion fittings, we handle it all with 
                expertise and care. Here's what we can do for you:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  View All Services
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Professional clothing alterations showcase at Nimble Needle"
                  width={300}
                  height={200}
                  className="rounded-xl shadow-lg"
                />
                <Image
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Expert tailoring craftsmanship demonstration"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <Image
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                  alt="Quality fabric work and attention to detail"
                  width={300}
                  height={300}
                  className="rounded-xl shadow-lg"
                />
                <Image
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Precision tailoring tools and workspace"
                  width={300}
                  height={200}
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The values that guide everything we do at Nimble Needle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="border-0 bg-gradient-to-br from-white to-pink-50 hover:shadow-xl transition-all duration-300 rounded-2xl hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">
                      {value.value}
                    </h3>
                    
                    <p className="text-gray-600 font-montserrat">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Milestones - Enhanced Elegant Timeline */}
      <section className="py-24 bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-6 border border-pink-200">
              <Sparkles className="h-4 w-4 mr-2" />
              Our Story
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-playfair leading-tight">
              Our Journey Through<br />
              <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                the Years
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to serving thousands of customers across Ottawa,
              discover the milestones that shaped Nimble Needle into Ottawa's premier tailoring service.
            </p>
          </div>

          <div className="relative">
            {/* Enhanced Timeline Line with Gradient */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1">
              <div className="h-full w-full bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200 rounded-full shadow-lg"></div>
            </div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  ref={el => milestoneRefs.current[index] = el}
                  className={`relative group transition-all duration-1000 ${
                    visibleMilestones[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Mobile Timeline Line */}
                  <div className="lg:hidden absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-pink-200"></div>
                  
                  <div className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                  }`}>
                    {/* Enhanced Content Card */}
                    <div className={`relative ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:col-start-2 lg:pl-8'}`}>
                      {/* Year Indicator for Mobile */}
                      <div className="lg:hidden flex items-center mb-6">
                        <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white shadow-lg mr-6"></div>
                        <Badge className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-bold px-4 py-2 shadow-lg">
                          {milestone.year}
                        </Badge>
                      </div>
                      
                      {/* Main Content Card */}
                      <Card className="group-hover:shadow-2xl transition-all duration-700 transform group-hover:-translate-y-2 border-0 bg-gradient-to-br from-white via-white to-pink-50 overflow-hidden">
                        <CardContent className="p-8">
                          {/* Desktop Year Badge */}
                          <div className={`hidden lg:flex items-center mb-6 ${
                            index % 2 === 0 ? 'justify-end' : 'justify-start'
                          }`}>
                            <Badge className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg font-bold px-6 py-3 shadow-lg rounded-full">
                              {milestone.year}
                            </Badge>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-playfair group-hover:text-pink-600 transition-colors duration-300">
                            {milestone.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-600 text-lg leading-relaxed font-montserrat">
                            {milestone.description}
                          </p>
                          
                          {/* Decorative Element */}
                          <div className={`mt-6 ${
                            index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                          }`}>
                            <div className="inline-flex items-center text-pink-500 font-semibold text-sm">
                              <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                              Milestone {index + 1}
                            </div>
                          </div>
                        </CardContent>
                        
                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </Card>
                    </div>
                    
                    {/* Enhanced Timeline Dot for Desktop */}
                    <div className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10 transition-all duration-700 ${
                      visibleMilestones[index] 
                        ? 'scale-100 opacity-100' 
                        : 'scale-50 opacity-0'
                    }`} style={{ transitionDelay: `${index * 200 + 300}ms` }}>
                      <div className="relative">
                        {/* Outer Ring */}
                        <div className="w-8 h-8 bg-white rounded-full shadow-2xl border-4 border-pink-200 group-hover:border-pink-400 transition-all duration-500"></div>
                        
                        {/* Inner Dot */}
                        <div className="absolute inset-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full group-hover:scale-110 transition-transform duration-500 shadow-lg"></div>
                        
                        {/* Pulse Animation - Only when visible */}
                        {visibleMilestones[index] && (
                          <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20"></div>
                        )}
                        
                        {/* Year Label */}
                        <div className={`absolute top-10 ${
                          index % 2 === 0 ? '-right-16' : '-left-16'
                        } hidden xl:block transition-all duration-500 ${
                          visibleMilestones[index] 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-4'
                        }`} style={{ transitionDelay: `${index * 200 + 500}ms` }}>
                          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            {milestone.year}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Timeline End Indicator */}
            <div 
              ref={timelineEndRef}
              className={`mt-16 text-center transition-all duration-1000 ${
                isTimelineEndVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-75'
              }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 transform hover:scale-110">
                <Heart className="h-8 w-8 text-white animate-pulse" />
              </div>
              <p className="mt-4 text-pink-600 font-semibold tracking-wide">Continuing Our Legacy</p>
              <div className="mt-2 w-16 h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full mx-auto opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">
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
                  <span className="text-2xl font-bold font-playfair">Nimble Needle</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed font-montserrat">
                  Your one-stop shop for all your tailoring and clothing alteration needs in Ottawa!
                </p>
                
                {/* Social Media */}
                <div className="flex space-x-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white p-2">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-2">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preston Location */}
              <div>
                <h3 className="text-lg font-semibold mb-6 font-playfair text-pink-400">Downtown Ottawa - Preston</h3>
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
                <h3 className="text-lg font-semibold mb-6 font-playfair text-pink-400">New Location - Riverside</h3>
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
                <h3 className="text-lg font-semibold mb-6 font-playfair text-pink-400">Services</h3>
                <ul className="space-y-3 text-gray-300 font-montserrat mb-8">
                  <li><a href="/clothing-alterations" className="hover:text-pink-400 transition-colors">Alterations & Repairs</a></li>
                  <li><a href="/services" className="hover:text-pink-400 transition-colors">Custom & Retail Suits</a></li>
                  <li><a href="/zipper-repair" className="hover:text-pink-400 transition-colors">Zipper Repair</a></li>
                  <li><a href="/wedding-dress-alterations" className="hover:text-pink-400 transition-colors">Wedding Dress Alterations</a></li>
                  <li><a href="/services" className="hover:text-pink-400 transition-colors">Hemming Services</a></li>
                </ul>

                {/* Email Contact */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="h-5 w-5 text-pink-400" />
                    <span className="font-semibold text-pink-400">Email Us</span>
                  </div>
                  <a 
                    href="mailto:nimble.needle.tailoring@gmail.com" 
                    className="text-gray-300 hover:text-pink-400 transition-colors break-all"
                  >
                    nimble.needle.tailoring@gmail.com
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