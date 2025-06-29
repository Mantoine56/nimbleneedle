"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Star, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowRight,
  Wrench,
  Shield,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';

const zipperTypes = [
  {
    type: "Clothing Zippers",
    items: [
      { name: "Jacket zippers", description: "Outerwear, leather jackets, windbreakers", price: "From $25" },
      { name: "Dress zippers", description: "Back zippers, side zippers, invisible zippers", price: "From $20" },
      { name: "Pants zippers", description: "Jeans, trousers, shorts", price: "From $18" },
      { name: "Boot zippers", description: "Ankle boots, knee-high boots", price: "From $30" }
    ]
  },
  {
    type: "Bags & Accessories",
    items: [
      { name: "Purse zippers", description: "Handbags, clutches, wallets", price: "From $22" },
      { name: "Backpack zippers", description: "School bags, hiking packs, laptop bags", price: "From $25" },
      { name: "Makeup bag zippers", description: "Cosmetic cases, toiletry bags", price: "From $15" },
      { name: "Gym bag zippers", description: "Sports bags, duffel bags", price: "From $28" }
    ]
  },
  {
    type: "Luggage & Travel",
    items: [
      { name: "Suitcase zippers", description: "Rolling luggage, hard cases, soft cases", price: "From $35" },
      { name: "Carry-on zippers", description: "Travel bags, overnight bags", price: "From $30" },
      { name: "Garment bag zippers", description: "Suit carriers, dress bags", price: "From $32" },
      { name: "Travel accessory zippers", description: "Packing cubes, shoe bags", price: "From $18" }
    ]
  }
];

const repairProcess = [
  {
    step: "1",
    title: "Assessment",
    description: "We examine your zipper to determine if repair or replacement is needed.",
    icon: AlertCircle
  },
  {
    step: "2", 
    title: "Quote",
    description: "Clear, upfront pricing with no hidden costs. Most repairs same-day.",
    icon: Clock
  },
  {
    step: "3",
    title: "Expert Repair",
    description: "Professional replacement with quality zippers that last.",
    icon: Wrench
  },
  {
    step: "4",
    title: "Quality Check",
    description: "Every repair is tested to ensure smooth, reliable operation.",
    icon: Shield
  }
];

const commonIssues = [
  {
    issue: "Stuck zipper",
    solution: "Professional lubrication and realignment",
    urgency: "Same-day fix"
  },
  {
    issue: "Broken zipper pull",
    solution: "Replacement pull or slider installation", 
    urgency: "15-30 minutes"
  },
  {
    issue: "Separated zipper teeth",
    solution: "Complete zipper replacement with matching color",
    urgency: "Same-day service"
  },
  {
    issue: "Zipper won't close",
    solution: "Slider replacement or track realignment",
    urgency: "Quick repair"
  }
];

export default function ZipperRepairPage() {
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
      <section className="relative py-20 bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-4 py-2 text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Expert Zipper Repair
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-playfair">
                ZIPPER REPAIR<br />
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  SERVICES
                </span><br />
                OTTAWA
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-montserrat">
                Fast, reliable zipper repair and replacement for all types of clothing, bags, and luggage. Same-day service available for most repairs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-3 text-lg font-semibold rounded-full">
                  <Phone className="h-5 w-5 mr-2" />
                  Call (343) 588-1300
                </Button>
                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold rounded-full">
                  <Clock className="h-5 w-5 mr-2" />
                  Same-Day Service
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">15min</div>
                  <div className="text-sm text-gray-600">Fastest Repairs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">All</div>
                  <div className="text-sm text-gray-600">Zipper Types</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Professional zipper repair service at Nimble Needle Ottawa showing precision craftsmanship"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">Same Day</div>
                  <div className="text-sm">Service Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Common Zipper Problems We Fix
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't throw away that favorite jacket or bag! Most zipper problems can be fixed quickly and affordably.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonIssues.map((item, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="h-6 w-6 text-orange-600" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 font-playfair">
                    {item.issue}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">{item.solution}</p>
                  
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {item.urgency}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Zipper Repair Services & Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional zipper repair for all types of items. Clear pricing with no surprises.
            </p>
          </div>

          <div className="space-y-12">
            {zipperTypes.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-playfair flex items-center">
                  <Sparkles className="h-6 w-6 text-orange-500 mr-3" />
                  {category.type}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item, idx) => (
                    <Card key={idx} className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                          <span className="text-lg font-bold text-orange-600">{item.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Same-day service available
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Our Repair Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fast, professional service from assessment to completion
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {repairProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Why Choose Our<br />
                Zipper Repair Service?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Service</h3>
                    <p className="text-gray-600">Most repairs completed same-day. Simple fixes often done while you wait.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">All Zipper Types</h3>
                    <p className="text-gray-600">From delicate dress zippers to heavy-duty luggage zippers - we handle them all.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Materials</h3>
                    <p className="text-gray-600">We use only high-quality replacement zippers that match your original.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Satisfaction Guarantee</h3>
                    <p className="text-gray-600">Every repair comes with our guarantee - if it doesn't work perfectly, we'll make it right.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Close-up of precision zipper repair work being performed at Nimble Needle Ottawa"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Fix Your Broken Zipper Today!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't let a broken zipper ruin your favorite item. Bring it to us for fast, professional repair.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
              <Phone className="h-5 w-5 mr-2" />
              Call (343) 588-1300
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg font-semibold rounded-full">
              <ArrowRight className="h-5 w-5 mr-2" />
              View All Services
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            📧 nimble.needle.tailoring@gmail.com | Walk-ins welcome - No appointment needed!
          </div>
        </div>
      </section>
    </div>
  );
}