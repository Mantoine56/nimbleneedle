"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scissors, 
  Star, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';

const alterationServices = [
  {
    category: "Formal Wear",
    services: [
      { name: "Suit jacket alterations", price: "From $45", description: "Sleeve length, body fitting, button adjustments" },
      { name: "Dress pants hemming", price: "From $25", description: "Professional hemming with original finish" },
      { name: "Formal dress alterations", price: "From $65", description: "Taking in/out, length adjustments, strap fixes" },
      { name: "Blazer fitting", price: "From $40", description: "Shoulder, waist, and sleeve adjustments" }
    ]
  },
  {
    category: "Casual Wear", 
    services: [
      { name: "Jeans hemming", price: "From $20", description: "Original hem preservation available" },
      { name: "Shirt alterations", price: "From $30", description: "Sleeve shortening, body fitting, collar adjustments" },
      { name: "Casual dress fitting", price: "From $45", description: "All types of casual dresses and skirts" },
      { name: "T-shirt alterations", price: "From $25", description: "Resizing, length adjustments, sleeve modifications" }
    ]
  },
  {
    category: "Special Occasion",
    services: [
      { name: "Wedding dress alterations", price: "From $150", description: "Comprehensive bridal alterations with multiple fittings" },
      { name: "Bridesmaid dress fitting", price: "From $85", description: "Perfect fit for your bridal party" },
      { name: "Prom dress alterations", price: "From $75", description: "Make your prom dress picture perfect" },
      { name: "Evening gown tailoring", price: "From $95", description: "Luxury alterations for special events" }
    ]
  }
];

const processSteps = [
  {
    step: "1",
    title: "Walk In or Call",
    description: "No appointment needed! Visit either location or call ahead.",
    icon: Phone
  },
  {
    step: "2", 
    title: "Consultation & Fitting",
    description: "We'll assess your garment and discuss your needs with clear pricing.",
    icon: Users
  },
  {
    step: "3",
    title: "Expert Alterations",
    description: "Our skilled tailors work on your garment with attention to detail.",
    icon: Scissors
  },
  {
    step: "4",
    title: "Perfect Fit",
    description: "Pick up your perfectly fitted garment, usually within 3-5 days.",
    icon: Award
  }
];

export default function ClothingAlterationsPage() {
  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'Clothing Alterations', current: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 text-sm font-medium mb-6">
                <Scissors className="h-4 w-4 mr-2" />
                Professional Alterations
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
                CLOTHING<br />
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  ALTERATIONS
                </span><br />
                IN OTTAWA
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-montserrat">
                Professional clothing alteration services for all types of garments. We handle all fabrics and styles with expert craftsmanship and quick turnaround times.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full">
                  <Phone className="h-5 w-5 mr-2" />
                  Call (343) 588-1300
                </Button>
                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-full">
                  <MapPin className="h-5 w-5 mr-2" />
                  Find Us
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">3-5</div>
                  <div className="text-sm text-gray-600">Days Turnaround</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Professional clothing alterations being performed at Nimble Needle Ottawa"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Alteration Services & Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. All prices include professional consultation and quality guarantee.
            </p>
          </div>

          <div className="space-y-12">
            {alterationServices.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair flex items-center">
                  <Sparkles className="h-6 w-6 text-blue-500 mr-3" />
                  {category.category}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.services.map((service, idx) => (
                    <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
                          <span className="text-lg font-bold text-blue-600">{service.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Quality guaranteed
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Our Simple Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting your clothes altered at Nimble Needle is quick and easy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 font-montserrat">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Expert tailor demonstrating precision clothing alterations at Nimble Needle"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Why Choose Nimble Needle<br />
                for Your Alterations?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appointment Needed</h3>
                    <p className="text-gray-600">Walk-ins welcome! We respect your time and provide quick, efficient consultations.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
                    <p className="text-gray-600">Over 15 years of experience with all types of fabrics and garment styles.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fixed, Clear Pricing</h3>
                    <p className="text-gray-600">Transparent pricing with no surprises. You'll know the exact cost before we begin work.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                    <p className="text-gray-600">We stand behind our work with a satisfaction guarantee on all alterations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Ready for Perfect-Fitting Clothes?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Visit us today at either Preston or Riverside location. No appointment necessary!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
              <Phone className="h-5 w-5 mr-2" />
              Call (343) 588-1300
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold rounded-full">
              <ArrowRight className="h-5 w-5 mr-2" />
              View All Services
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            📧 nimble.needle.tailoring@gmail.com | Two convenient Ottawa locations
          </div>
        </div>
      </section>
    </div>
  );
}