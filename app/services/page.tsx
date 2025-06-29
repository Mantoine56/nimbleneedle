"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scissors, 
  Shirt, 
  Heart, 
  Star, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { Metadata } from 'next';

const services = [
  {
    title: "Alterations and Repairs",
    description: "Professional alterations for all types of clothing",
    details: [
      "Wedding dress alterations",
      "Suit alterations", 
      "Dress alterations",
      "Pants hemming and adjustments",
      "Shirt and blouse fitting",
      "Jacket alterations"
    ],
    image: "/alterations.jpg",
    link: "/clothing-alterations"
  },
  {
    title: "Custom and Retail Suits",
    description: "Bespoke tailoring and custom clothing creation",
    details: [
      "Custom suits",
      "Retail suit adjustments",
      "Bridal wear fitting",
      "Evening wear customization",
      "Formal wear tailoring",
      "Pattern adjustments"
    ],
    image: "/custom.jpg",
    link: "/custom-suits"
  },
  {
    title: "Zipper Repair",
    description: "Expert zipper repair and replacement services",
    details: [
      "Zipper repair and replacement",
      "Clothing repairs",
      "Household textile repairs", 
      "Seam repairs",
      "Button replacement",
      "Patch work"
    ],
    image: "/zipper.jpg",
    link: "/zipper-repair"
  }
];

const specialtyServices = [
  {
    title: "Wedding Dress Alterations",
    description: "Make your special day perfect with expert bridal alterations",
    features: ["Multiple fittings included", "Rush services available", "Delicate fabric expertise", "Stress-free experience"],
    price: "Starting at $150",
    link: "/wedding-dress-alterations"
  },
  {
    title: "Business Suit Tailoring", 
    description: "Professional suit alterations for the modern workplace",
    features: ["Same-day service available", "Perfect fit guarantee", "All fabric types", "Competitive pricing"],
    price: "Starting at $35",
    link: "/suit-alterations"
  },
  {
    title: "Formal Wear Specialists",
    description: "Evening gowns, tuxedos, and special occasion wear",
    features: ["Evening appointments", "Rush orders welcome", "Vintage restoration", "Designer experience"],
    price: "Starting at $75",
    link: "/formal-wear"
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0);

  const breadcrumbItems = [
    { label: 'Services', current: true }
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
          <div className="text-center mb-16">
            <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-4 py-2 text-sm font-medium mb-6">
              ⭐ Ottawa&apos;s Premier Tailoring Services
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
              OUR TAILORING<br />
              <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                SERVICES
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-montserrat">
              Professional clothing alterations, custom tailoring, and repair services in Ottawa. 
              No appointment needed - walk-ins welcome at both Preston and Riverside locations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full">
                <Phone className="h-5 w-5 mr-2" />
                Call (343) 588-1300
              </Button>
              <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg font-semibold rounded-full">
                <MapPin className="h-5 w-5 mr-2" />
                Find Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Complete Tailoring Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We handle all fabrics and styles with expert craftsmanship and quick turnaround times
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 rounded-2xl overflow-hidden border-0 bg-white/10 backdrop-blur-xl"
              >
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} - Nimble Needle Ottawa`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                    />
                    {/* Overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-pink-700/80 group-hover:via-pink-500/40"></div>
                    {/* Centered title text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold font-playfair text-white text-center drop-shadow-lg px-4">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Specialty Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized tailoring for life&apos;s most important moments
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {specialtyServices.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
                    <Badge className="bg-pink-100 text-pink-700 text-xs">Specialty</Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <Star className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">{service.price}</span>
                    <Button 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
                      onClick={() => window.location.href = service.link}
                    >
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Why Choose Nimble Needle?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appointment Needed</h3>
                    <p className="text-gray-600">Walk-ins welcome at both locations. We respect your time and provide quick, efficient service.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Family-Run Business</h3>
                    <p className="text-gray-600">Personal attention and care that only comes from a family business with years of experience.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fixed, Clear Pricing</h3>
                    <p className="text-gray-600">Transparent pricing with no hidden fees. You'll know exactly what you're paying before we start.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Professional tailor working on clothing alterations at Nimble Needle Ottawa"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Ready to Experience Expert Tailoring?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Visit us at either of our convenient Ottawa locations. No appointment necessary!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600 px-8 py-3 text-lg font-semibold rounded-full">
              <MapPin className="h-5 w-5 mr-2" />
              Get Directions
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            📧 nimble.needle.tailoring@gmail.com | 📞 (343) 588-1300
          </div>
        </div>
      </section>
    </div>
  );
}