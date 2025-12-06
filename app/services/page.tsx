"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scissors, 
  Heart, 
  Star, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Shield,
  ThumbsUp
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import { allServices } from '@/lib/data';

const whyChooseUsPoints = [
  {
    icon: Award,
    title: "High Quality Work",
    description: "Expert craftsmanship with over 20 years of experience"
  },
  {
    icon: Clock,
    title: "Trusted professionals",
    description: "Reliable service you can count on"
  },
  {
    icon: Shield,
    title: "Money Back Guarantee",
    description: "100% satisfaction guaranteed or your money back"
  },
  {
    icon: Users,
    title: "Many 5-star Reviews",
    description: "Hundreds of satisfied customers with excellent ratings"
  },
  {
    icon: Heart,
    title: "Family-run business",
    description: "Personal attention and care that larger shops can't match"
  },
  {
    icon: ThumbsUp,
    title: "Same-day/Express Service",
    description: "Quick turnaround when you need it most"
  }
];

export default function ServicesPage() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(allServices.length).fill(false));
  const [isWhyChooseUsVisible, setIsWhyChooseUsVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setVisibleCards(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            } else if (entry.target === whyChooseUsRef.current) {
              setIsWhyChooseUsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Cache observed elements so cleanup uses the same instances
    const cardsToObserve = [...cardRefs.current];
    const whyChooseUsElement = whyChooseUsRef.current;

    cardsToObserve.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    if (whyChooseUsElement) observer.observe(whyChooseUsElement);

    return () => {
      cardsToObserve.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      if (whyChooseUsElement) observer.unobserve(whyChooseUsElement);
    };
  }, []);

  const breadcrumbItems = [
    { label: 'Services', current: true }
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
              SERVICES
            </h1>
            
            <div className="space-y-4 text-gray-700 text-lg md:text-xl leading-relaxed font-montserrat mb-8">
              <p className="text-2xl md:text-3xl font-semibold">
                We can handle all your alterations, tailoring, and seamstress needs
              </p>
              
              <p className="text-lg text-pink-600 font-medium">
                Featured Services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {allServices.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  // Store each card element so the intersection observer can animate visibility
                  cardRefs.current[index] = el;
                }}
                className={`transition-all duration-1000 ${
                  visibleCards[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <Card 
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-2xl overflow-hidden border-0 bg-white shadow-lg cursor-pointer"
                  onClick={() => window.location.href = service.link}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={`${service.title} - Nimble Needle Ottawa`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-pink-700/60 group-hover:via-pink-500/20"></div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 text-center font-montserrat group-hover:text-pink-600 transition-colors break-words-safe">
                        {service.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        ref={whyChooseUsRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Why Choose Us Points */}
            <div className={`transition-all duration-1000 ${
              isWhyChooseUsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-league-spartan">
                Why choose us?
              </h2>
              
              <div className="space-y-6">
                {whyChooseUsPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-1000 ${
                      isWhyChooseUsVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    <div className="bg-pink-100 p-3 rounded-full flex-shrink-0">
                      <point.icon className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-montserrat">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 font-montserrat">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className={`transition-all duration-1000 delay-300 ${
              isWhyChooseUsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <Image
                  src="/services/custom-art.webp"
                  alt="Professional seamstress working on clothing alterations at Nimble Needle"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-pink-500 rounded-2xl p-4 shadow-xl">
                  <Scissors className="h-8 w-8 text-white" />
                </div>
              </div>
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