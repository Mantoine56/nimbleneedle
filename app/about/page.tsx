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
  Users,
  Award,
  Scissors,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';

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
  const breadcrumbItems = [
    { label: 'About', current: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b7280' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-4 py-2 text-sm font-medium mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Family-Run Business Since 2008
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
                ABOUT<br />
                <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                  NIMBLE NEEDLE
                </span><br />
                TAILORING
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-montserrat leading-relaxed">
                We are proud to be an Ottawa company that delivers top-quality services to our clients. 
                Our family-run business can meet your needs for clothing alterations, repairs and custom 
                sewing for clothing and other textiles.
              </p>

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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3 text-lg font-semibold rounded-full">
                  <Phone className="h-5 w-5 mr-2" />
                  Call (343) 588-1300
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold rounded-full">
                  <MapPin className="h-5 w-5 mr-2" />
                  Visit Our Locations
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Family-run tailoring business Nimble Needle in Ottawa showing expert craftsmanship and personal service"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Master tailor at work demonstrating years of experience and dedication to quality craftsmanship"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Our Story & Mission
              </h2>
              
              <div className="space-y-6 text-gray-600 font-montserrat">
                <p className="text-lg leading-relaxed">
                  Founded in 2008, Nimble Needle has grown from a small family business into Ottawa's 
                  trusted destination for professional tailoring and alterations. What started as a 
                  passion for perfect craftsmanship has evolved into a comprehensive service that has 
                  served over 5,000 satisfied customers.
                </p>
                
                <p className="text-lg leading-relaxed">
                  At our tailoring studio, we pride ourselves on delivering high-quality craftsmanship 
                  with quick turnaround times, all while providing friendly, personalized service. 
                  No appointment needed - we offer fixed, clear pricing and handle all fabrics and styles.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Our commitment to excellence has earned us the trust and satisfaction of countless 
                  happy customers. From everyday alterations to wedding dress fittings, we treat every 
                  garment with the care and attention it deserves.
                </p>
              </div>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3 rounded-full">
                  <Scissors className="h-5 w-5 mr-2" />
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Our Journey Through the Years
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to serving thousands of customers across Ottawa
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className={`md:grid md:grid-cols-2 md:gap-8 items-center ${
                    index % 2 === 0 ? '' : 'md:grid-flow-col-dense'
                  }`}>
                    {/* Content */}
                    <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                      <Card className="bg-white shadow-lg border-0 rounded-xl">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-3">
                            <Badge className="bg-gray-100 text-gray-700 text-sm font-bold">
                              {milestone.year}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 font-playfair">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                </div>
              ))}
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
                <Card key={index} className="border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
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

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
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
                    <CheckCircle className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3 rounded-full">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-700 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Experience the Nimble Needle Difference
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us with their most important garments. 
            Visit us today - no appointment necessary!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
              <Phone className="h-5 w-5 mr-2" />
              Call (343) 588-1300
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800 px-8 py-3 text-lg font-semibold rounded-full">
              <MapPin className="h-5 w-5 mr-2" />
              Find Our Locations
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            📧 nimble.needle.tailoring@gmail.com<br />
            📍 Preston Street & Riverside Drive | Walk-ins Welcome
          </div>
        </div>
      </section>
    </div>
  );
}