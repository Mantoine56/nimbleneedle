"use client";

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
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';

const bridalServices = [
  {
    service: "Wedding Dress Alterations",
    description: "Complete bridal gown fitting and alterations",
    details: [
      "Hemming with train preservation",
      "Taking in/letting out bodice",
      "Strap and sleeve adjustments", 
      "Bustle creation",
      "Neckline modifications",
      "Beading and embellishment work"
    ],
    price: "Starting at $150",
    timeline: "2-4 weeks"
  },
  {
    service: "Bridesmaid Dress Alterations",
    description: "Perfect fit for your entire bridal party",
    details: [
      "Length adjustments",
      "Size modifications",
      "Strap alterations",
      "Neckline adjustments",
      "Color matching for repairs",
      "Multiple dress coordination"
    ],
    price: "Starting at $85",
    timeline: "1-2 weeks"
  },
  {
    service: "Mother-of-Bride Alterations",
    description: "Elegant alterations for special guests",
    details: [
      "Formal dress fitting",
      "Jacket and suit alterations",
      "Length and hem adjustments",
      "Sleeve modifications",
      "Neckline changes",
      "Perfect occasion styling"
    ],
    price: "Starting at $95",
    timeline: "1-2 weeks"
  }
];

const processSteps = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Bring your dress for professional assessment and detailed discussion of your vision.",
    icon: Users,
    timeframe: "30-45 minutes"
  },
  {
    step: "2", 
    title: "First Fitting",
    description: "Comprehensive fitting with pinning to achieve your perfect silhouette.",
    icon: Crown,
    timeframe: "60-90 minutes"
  },
  {
    step: "3",
    title: "Expert Alterations",
    description: "Our skilled seamstresses work with precision on your precious gown.",
    icon: Heart,
    timeframe: "1-3 weeks"
  },
  {
    step: "4",
    title: "Final Fitting & Pickup",
    description: "Final adjustments and quality check to ensure absolute perfection.",
    icon: Sparkles,
    timeframe: "30 minutes"
  }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    wedding: "June 2024",
    quote: "Absolutely incredible service! They made my grandmother's wedding dress fit like it was custom made for me. The attention to detail was remarkable.",
    rating: 5
  },
  {
    name: "Emily Chen", 
    wedding: "September 2024",
    quote: "I was so nervous about altering my dress, but they made the whole process stress-free. The result was even better than I imagined!",
    rating: 5
  },
  {
    name: "Jennifer Rodriguez",
    wedding: "May 2024", 
    quote: "They saved my wedding! My dress arrived too big, but they worked magic in just 2 weeks. Professional, caring, and incredibly skilled.",
    rating: 5
  }
];

const whyChooseUs = [
  {
    title: "Bridal Specialists",
    description: "Years of experience working exclusively with wedding gowns and formal wear",
    icon: Crown
  },
  {
    title: "Multiple Fittings",
    description: "Included in our service to ensure absolute perfection for your special day",
    icon: Calendar
  },
  {
    title: "Rush Service Available",
    description: "Last-minute alterations when time is critical - we understand wedding stress",
    icon: Clock
  },
  {
    title: "Delicate Fabric Expertise",
    description: "Experienced with silk, lace, chiffon, tulle, and all luxury bridal materials",
    icon: Heart
  },
  {
    title: "Beading & Embellishment",
    description: "Skilled in working with pearls, crystals, sequins, and intricate details",
    icon: Sparkles
  },
  {
    title: "Stress-Free Experience",
    description: "Calm, professional environment designed to make this process enjoyable",
    icon: Shield
  }
];

export default function WeddingDressAlterationsPage() {
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
              WEDDING DRESS<br />
              <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">
                ALTERATIONS
              </span><br />
              IN OTTAWA
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 font-montserrat leading-relaxed">
              Make your special day perfect with expert bridal alterations. From vintage family gowns to modern designer dresses, 
              we ensure your wedding dress fits like it was made just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25">
                <Phone className="h-5 w-5 mr-2" />
                Call (343) 588-1300
              </Button>
              <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50 px-10 py-4 text-lg font-semibold rounded-full">
                <Calendar className="h-5 w-5 mr-2" />
                Book Consultation
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
                <div className="text-gray-600">Brides Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridal Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Complete Bridal Alteration Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From wedding gowns to bridesmaid dresses, we provide comprehensive alteration services for your entire bridal party.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {bridalServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-white to-pink-50">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">
                      {service.service}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-pink-500 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t border-pink-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-pink-600">{service.price}</span>
                      <Badge className="bg-pink-100 text-pink-700 text-xs">
                        {service.timeline}
                      </Badge>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full">
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Our Bridal Alteration Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A carefully designed process to ensure your wedding dress is absolutely perfect for your special day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-2 font-montserrat">
                    {step.description}
                  </p>
                  
                  <Badge className="bg-pink-100 text-pink-700 text-xs">
                    {step.timeframe}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Why Brides Choose Nimble Needle
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your wedding day deserves nothing less than perfection. Here's why Ottawa brides trust us with their most precious gowns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-0 bg-gradient-to-br from-white to-pink-50 hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 font-montserrat">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">
              Happy Brides Say It Best
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read what recent brides have to say about their experience with our wedding dress alteration services.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-pink-600">Wedding: {testimonial.wedding}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Crown className="h-16 w-16 mx-auto mb-6 opacity-80" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-playfair">
            Your Perfect Wedding Dress Awaits
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Don't let an ill-fitting dress diminish your special day. Let our bridal specialists create the perfect fit for your dream wedding.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-full shadow-lg">
              <Phone className="h-5 w-5 mr-2" />
              Call (343) 588-1300
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600 px-10 py-4 text-lg font-semibold rounded-full">
              <ArrowRight className="h-5 w-5 mr-2" />
              View All Services
            </Button>
          </div>
          
          <div className="mt-8 text-base opacity-80">
            📧 nimble.needle.tailoring@gmail.com<br />
            📍 Preston & Riverside locations | Walk-ins welcome
          </div>
        </div>
      </section>
    </div>
  );
}