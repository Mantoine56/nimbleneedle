"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  MapPin, 
  Clock,
  Mail,
  Navigation as NavigationIcon,
  Star,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Calendar,
  Users
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';

const locations = [
  {
    name: "Downtown Ottawa - Preston",
    address: "141 Preston St",
    city: "Ottawa, ON K1R 7P4", 
    phone: "(343) 588-1300",
    hours: {
      weekdays: "Tue-Sat: 9am-9pm",
      weekend: "Sun-Mon: 10am-7pm"
    },
    features: [
      "Walk-ins welcome",
      "Street parking available",
      "Near public transit",
      "Wheelchair accessible"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.4928542718835!2d-75.71163!3d45.4085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04e7311278bd%3A0x65c3031023e94dc7!2s141%20Preston%20St%2C%20Ottawa%2C%20ON%20K1R%207P4%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca",
    directions: "https://maps.google.com/?q=141+Preston+St,+Ottawa,+ON"
  },
  {
    name: "New Location - Riverside",
    address: "3681 Riverside Dr", 
    city: "Ottawa, ON K1V 1H7",
    phone: "(343) 588-3182",
    hours: {
      weekdays: "Tue-Sat: 9am-9pm", 
      weekend: "Sun-Mon: 10am-7pm"
    },
    features: [
      "Walk-ins welcome",
      "Free parking available",
      "Easy highway access",
      "Spacious location"
    ],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2804.2735842718835!2d-75.66663!3d45.3685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0759aa93a4c5%3A0x65c3031023e94dc8!2s3681%20Riverside%20Dr%2C%20Ottawa%2C%20ON%20K1V%201H7%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca",
    directions: "https://maps.google.com/?q=3681+Riverside+Dr,+Ottawa,+ON"
  }
];

const contactMethods = [
  {
    method: "Phone",
    icon: Phone,
    primary: "(343) 588-1300",
    secondary: "(343) 588-3182", 
    description: "Call either location directly",
    available: "During business hours"
  },
  {
    method: "Email",
    icon: Mail,
    primary: "nimble.needle.tailoring@gmail.com",
    secondary: "",
    description: "Send us your questions or photos",
    available: "24/7 - We reply within 24 hours"
  },
  {
    method: "Walk-In",
    icon: Users,
    primary: "No appointment needed",
    secondary: "Both locations welcome walk-ins",
    description: "Visit us directly for consultation",
    available: "During business hours"
  }
];

const faqItems = [
  {
    question: "Do I need an appointment?",
    answer: "No! Walk-ins are welcome at both locations during business hours. We pride ourselves on accommodating your schedule."
  },
  {
    question: "How long do alterations take?",
    answer: "Most alterations are completed within 3-5 business days. Rush services are available for urgent needs."
  },
  {
    question: "What forms of payment do you accept?",
    answer: "We accept cash, credit cards, and debit cards at both locations."
  },
  {
    question: "Do you provide price estimates?",
    answer: "Yes! We provide fixed, clear pricing upfront with no hidden fees. You'll know exactly what you're paying before we begin."
  },
  {
    question: "Can you work on all types of fabric?",
    answer: "Absolutely! We handle all fabrics and styles, from delicate silk to heavy denim, vintage pieces to modern designs."
  },
  {
    question: "Do you offer rush services?",
    answer: "Yes, rush services are available for urgent alterations. Contact us to discuss your timeline and we'll do our best to accommodate."
  }
];

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Contact Us', current: true }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-6 py-3 text-base font-medium mb-8">
              <MapPin className="h-5 w-5 mr-2" />
              Two Convenient Ottawa Locations
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8 font-playfair">
              CONTACT<br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                NIMBLE NEEDLE
              </span><br />
              TAILORING
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 font-montserrat leading-relaxed">
              Ready to experience expert tailoring? Visit us at either of our convenient Ottawa locations. 
              No appointment necessary - walk-ins are always welcome!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-lg">
                <Phone className="h-5 w-5 mr-2" />
                Call (343) 588-1300
              </Button>
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 px-10 py-4 text-lg font-semibold rounded-full">
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="border-0 bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-playfair">
                      {method.method}
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-green-700 mb-1">{method.primary}</p>
                      {method.secondary && (
                        <p className="text-base text-gray-600">{method.secondary}</p>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {method.available}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Our Two Ottawa Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the location that's most convenient for you
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl overflow-hidden">
                <div className="h-64 relative">
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 font-playfair">
                      {location.name}
                    </h3>
                    <Badge className="bg-green-100 text-green-700">
                      Walk-ins Welcome
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700 font-medium">{location.address}</p>
                        <p className="text-gray-600">{location.city}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <a 
                        href={`tel:${location.phone.replace(/[^\d]/g, '')}`}
                        className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                      >
                        {location.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">{location.hours.weekdays}</p>
                        <p className="text-gray-700">{location.hours.weekend}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Location Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {location.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex-1"
                      onClick={() => window.open(location.directions, '_blank')}
                    >
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-600 text-green-700 hover:bg-green-50"
                      onClick={() => window.open(`tel:${location.phone.replace(/[^\d]/g, '')}`, '_self')}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 font-playfair">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Ready to Visit Us?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            No appointment necessary! Stop by either location during business hours, 
            or give us a call to discuss your tailoring needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full">
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 text-lg font-semibold rounded-full">
              <ArrowRight className="h-5 w-5 mr-2" />
              View Services
            </Button>
          </div>
          
          <div className="mt-8 text-sm opacity-80">
            📧 nimble.needle.tailoring@gmail.com<br />
            📍 Preston: (343) 588-1300 | Riverside: (343) 588-3182
          </div>
        </div>
      </section>
    </div>
  );
}