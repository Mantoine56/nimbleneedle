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
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
  Shield,
  Users,
  Calendar,
  X
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { testimonials, locations } from '@/lib/data';

const services = [
  {
    name: "Hem shortening",
    description: "Professional hem adjustments for the perfect length",
    icon: CheckCircle
  },
  {
    name: "Bodice adjustment (taking in or letting out)",
    description: "Precise fit adjustments for the bodice area",
    icon: CheckCircle
  },
  {
    name: "Strap, sleeve, or shoulder adjustments",
    description: "Customized adjustments for comfort and style",
    icon: CheckCircle
  },
  {
    name: "Adding or removing cups",
    description: "Bust support modifications for comfort",
    icon: CheckCircle
  },
  {
    name: "Bustle creation for the train",
    description: "Professional bustle installation",
    icon: CheckCircle
  },
  {
    name: "Zipper repair or full replacement if faulty",
    description: "Complete zipper services and repairs",
    icon: CheckCircle
  }
];

const benefits = [
  {
    name: "Preserve delicate materials such as lace, chiffon, or silk",
    description: "Expert handling of delicate fabrics",
    icon: Heart
  },
  {
    name: "Apply precise stitching and hidden seams",
    description: "Professional seamstress techniques",
    icon: Sparkles
  },
  {
    name: "Use proper tools for beadwork or embroidery adjustments",
    description: "Specialized tools for detailed work",
    icon: Crown
  },
  {
    name: "Ensure a balanced and secure fit based on posture and body movement",
    description: "Comprehensive fitting approach",
    icon: Shield
  }
];

const keyFeatures = [
  "Fast",
  "Friendly", 
  "Affordable",
  "Reliable",
  "Proudly Serving Ottawa"
];

export default function WeddingDressAlterationsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Wedding Dress Alterations', current: true }
  ];

  const handleCallClick = () => {
    setShowCallPopup(true);
  };

  const handleClosePopup = () => {
    setShowCallPopup(false);
  };

  const handleLocationCall = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
    setShowCallPopup(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowCallPopup(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ec4899' fill-opacity='0.6'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-6 py-3 text-base font-medium mb-8">
              <Crown className="h-5 w-5 mr-2" />
              ✨ Bridal Specialists ✨
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8 font-playfair">
              Beautiful Wedding Dress<br />
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                Alterations
              </span><br />
              in Ottawa on Preston St. and Riverside Dr.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 font-montserrat leading-relaxed">
              Offers wedding dress alterations in Ottawa at two walk-in locations. Preston Street and our Riverside area. Both are welcome to visit without their during business hours. Most alterations can be completed in 1-2 weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                onClick={() => window.location.href = '/contact-us'}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book an Appointment
              </Button>
              <Button 
                onClick={handleCallClick}
                variant="outline" 
                className="border-pink-500 text-pink-600 hover:bg-pink-50 px-10 py-4 text-lg font-semibold rounded-full"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-100">
                  <CheckCircle className="h-5 w-5 text-pink-500" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section ref={elementRef} className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair">
                  Our team works with a variety of <span className="text-pink-600">wedding gowns</span>, including those with lace, beading, structured bodices, and delicate fabrics.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our attentions aim to ensure the dress fits securely and comfortably for the ceremony and reception. Here&apos;s what we offer:
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  <span className="text-pink-600 font-semibold">Join the hundreds of our very satisfied customers.</span> Let our experienced, top-rated tailors get you the perfect look you&apos;re looking for today!
                </p>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/services/alterations.webp"
                  alt="Wedding dress alterations"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Wedding Dress Alterations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
              Common Wedding Dress Alterations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bridal gown alterations are handled with precision to maintain the original design and comfort of the dress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Services include:</h3>
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <service.icon className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Each wedding dress alteration in Ottawa is done after a fitting session during which the dress is pinned and prepared. We typically include an initial fitting, a secondary fitting if needed, and a final fitting to confirm measurements.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team works with a variety of wedding gowns, including those with lace, beading, structured bodices, and delicate fabrics. Our attentions aim to ensure the dress fits securely and comfortably for the ceremony and reception.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Here is what we offer beyond dresses: <a href="/custom-suits" className="text-pink-600 font-semibold hover:underline">custom embroidery</a> services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
              Benefits of Hiring a Professional for Bridal Alterations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional tailoring helps maintain the structure, fabric integrity, and design of the dress. Our team aim to offer high-quality wedding dress alteration services to Ottawa. Moving professional like us offers benefits, such as:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <benefit.icon className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.name}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Work is undertaken using hand-stitched alterations and natural hand-finishing techniques, depending on garment needs.
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">EXCELLENT</span>
            </div>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">959 reviews</span> on <span className="font-semibold text-blue-600">Google</span>
            </p>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
              Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Feedback from past clients highlights our team's commitment to precise tailoring and considerate service at both Ottawa locations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">I Have Questions</h3>
                <p className="text-gray-600">
                  Not sure where to start or what changes would be best? Our friendly staff can provide options for you!
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">I Need It Done Right</h3>
                <p className="text-gray-600">
                  Our professionals work with all fabric and styles. We can get the result you're looking for with our front pricing.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">I Have an Urgent Need</h3>
                <p className="text-gray-600">
                  Talk to us. We are always happy for many customers and will do our best to help you!
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                                     <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src="/logo.png"
                  alt="Nimble Needle Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold">NIMBLE NEEDLE<br />TAILORING</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your one-stop shop for any tailoring and clothing alterations in Ottawa
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Downtown Ottawa – Preston Street</h4>
              <div className="space-y-2 text-gray-400">
                <p>Business Hours:</p>
                <p>Mon – Fri: 7am – 4pm</p>
                <p>Sat: 8am – 4pm</p>
                <p>Sun: Closed</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Riverside Ottawa – Riverside Dr.</h4>
              <div className="space-y-2 text-gray-400">
                <p>Business Hours:</p>
                <p>Mon – Fri: 7am – 4pm</p>
                <p>Sat: 8am – 4pm</p>
                <p>Sun: Closed</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Call: (343) 588-1300</p>
                <p>Email: nimble.needle.tailoring@gmail.com</p>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-pink-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-2.35 0-4.252-1.902-4.252-4.252s1.902-4.252 4.252-4.252 4.252 1.902 4.252 4.252-1.902 4.252-4.252 4.252zm7.519 0c-2.35 0-4.252-1.902-4.252-4.252s1.902-4.252 4.252-4.252 4.252 1.902 4.252 4.252-1.902 4.252-4.252 4.252z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 - Nimble Needle Tailoring</p>
          </div>
        </div>
      </footer>

      {/* Call Popup */}
      {showCallPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Choose Location</h3>
              <button 
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{location.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{location.address}</p>
                  <Button
                    onClick={() => handleLocationCall(location.phone)}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call {location.phone}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}