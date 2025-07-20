"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Phone,
  Building2
} from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';

// Location data with service mappings
const locations = {
  preston: {
    name: 'Preston St (Downtown)',
    address: '141 Preston St, Ottawa',
    phone: '(343) 588-1300',
    phoneNumber: '3435881300',
    services: [
      {
        name: 'Suit Fitting',
        duration: '30 min',
        calLink: 'nimbleneedle/suit-fitting',
        description: 'Professional suit tailoring and alterations',
        icon: '👔'
      },
      {
        name: 'Dress Fitting',
        duration: '30 min', 
        calLink: 'nimbleneedle/dress-fitting',
        description: 'Custom dress alterations and adjustments',
        icon: '👗'
      },
      {
        name: 'Wedding Gown Fitting',
        duration: '60 min',
        calLink: 'nimbleneedle/wedding-gown-fitting', 
        description: 'Specialized wedding gown alterations',
        icon: '💒'
      }
    ]
  },
  riverside: {
    name: 'Riverside Dr (Riverside)',
    address: '3681 Riverside Dr, Ottawa',
    phone: '(343) 588-3182',
    phoneNumber: '3435883182',
    services: [
      {
        name: 'Suit Fitting',
        duration: '30 min',
        calLink: 'nimbleneedle/suit-fitting-riverside',
        description: 'Professional suit tailoring and alterations',
        icon: '👔'
      },
      {
        name: 'Dress Fitting', 
        duration: '30 min',
        calLink: 'nimbleneedle/dress-fitting-riverside',
        description: 'Custom dress alterations and adjustments',
        icon: '👗'
      },
      {
        name: 'Wedding Gown Fitting',
        duration: '60 min',
        calLink: 'nimbleneedle/wedding-gown-fitting-riverside',
        description: 'Specialized wedding gown alterations',
        icon: '💒'
      }
    ]
  }
};

// Simple features list for the hero section
const features = [
  "20+ years of experience",
  "Two Ottawa locations", 
  "Free consultations",
  "Same-day service available"
];

export default function BookingsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: location, 2: service, 3: booking
  const [selectedLocation, setSelectedLocation] = useState<'preston' | 'riverside' | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Simple intersection observer for main content
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

    if (mainRef.current) {
      observer.observe(mainRef.current);
    }

    return () => {
      if (mainRef.current) {
        observer.unobserve(mainRef.current);
      }
    };
  }, []);

  // Initialize Cal.com when we reach step 3
  useEffect(() => {
    if (currentStep === 3 && selectedService) {
      (async function () {
        const cal = await getCalApi({});
        cal("ui", {
          "hideEventTypeDetails": false, 
          "layout": "month_view",
          "styles": {"branding": {"brandColor": "#ec4899"}}
        });
      })();
    }
  }, [currentStep, selectedService]);

  // Handle location selection
  const handleLocationSelect = (locationKey: 'preston' | 'riverside') => {
    setSelectedLocation(locationKey);
    setCurrentStep(2);
  };

  // Handle service selection
  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentStep(3);
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2);
      setSelectedService(null);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedLocation(null);
    }
  };

  const breadcrumbItems = [
    { label: 'Book Appointment', current: true }
  ];

  return (
    <div className="min-h-screen bg-white mobile-safe">
      <Navigation />
      <SocialSidebar />
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content - Two Column Layout */}
      <section 
        ref={mainRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Left Column - Hero Content */}
            <div className="space-y-8 lg:sticky lg:top-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight font-league-spartan">
                  Book Your Appointment
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed font-montserrat">
                  Schedule your professional tailoring consultation. Our expert tailors will ensure the perfect fit for your clothing.
                </p>
                
                {/* Star Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">4.9/5</span>
                  <span className="text-gray-500">• 500+ customers</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 font-league-spartan">
                  Booking Progress
                </h2>
                
                {/* Stepper with proper alignment */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center space-y-2 flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                        currentStep >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        1
                      </div>
                      <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                        currentStep >= 1 ? 'text-pink-600' : 'text-gray-500'
                      }`}>
                        Location
                      </span>
                    </div>
                    
                    {/* Connector Line 1 */}
                    <div className={`h-1 w-12 mx-2 rounded transition-colors duration-300 ${
                      currentStep >= 2 ? 'bg-pink-500' : 'bg-gray-200'
                    }`} />
                    
                    {/* Step 2 */}
                    <div className="flex flex-col items-center space-y-2 flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                        currentStep >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        2
                      </div>
                      <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                        currentStep >= 2 ? 'text-pink-600' : 'text-gray-500'
                      }`}>
                        Service
                      </span>
                    </div>
                    
                    {/* Connector Line 2 */}
                    <div className={`h-1 w-12 mx-2 rounded transition-colors duration-300 ${
                      currentStep >= 3 ? 'bg-pink-500' : 'bg-gray-200'
                    }`} />
                    
                    {/* Step 3 */}
                    <div className="flex flex-col items-center space-y-2 flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${
                        currentStep >= 3 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        3
                      </div>
                      <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                        currentStep >= 3 ? 'text-pink-600' : 'text-gray-500'
                      }`}>
                        Booking
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 font-league-spartan">
                  Why Choose Us
                </h2>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-pink-500 flex-shrink-0" />
                      <span className="text-gray-700 font-montserrat">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Selection Summary */}
              {(selectedLocation || selectedService) && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-900 font-league-spartan">
                    Your Selection
                  </h3>
                  {selectedLocation && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-pink-500" />
                      <span className="font-montserrat">{locations[selectedLocation].name}</span>
                    </div>
                  )}
                  {selectedService && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Clock className="h-4 w-4 text-pink-500" />
                      <span className="font-montserrat">{selectedService.name} ({selectedService.duration})</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Dynamic Content Based on Step */}
            <div className="space-y-6">
              
              {/* Step Navigation */}
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="mb-4 inline-flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              )}

              {/* Step 1: Location Selection */}
              {currentStep === 1 && (
                <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                  <CardHeader className="bg-gray-900 text-white text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                    <CardTitle className="text-2xl font-bold font-league-spartan">
                      Choose Your Location
                    </CardTitle>
                    <p className="text-gray-300">
                      Select your preferred location for the appointment
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {Object.entries(locations).map(([key, location]) => (
                      <Card 
                        key={key}
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 border-2 hover:-translate-y-1"
                        onClick={() => handleLocationSelect(key as 'preston' | 'riverside')}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold text-gray-900 font-league-spartan">
                                {location.name}
                              </h3>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span className="font-montserrat">{location.address}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span className="font-montserrat">{location.phone}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-pink-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Service Selection */}
              {currentStep === 2 && selectedLocation && (
                <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                  <CardHeader className="bg-gray-900 text-white text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                    <CardTitle className="text-2xl font-bold font-league-spartan">
                      Choose Your Service
                    </CardTitle>
                    <p className="text-gray-300">
                      Available services at {locations[selectedLocation].name}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {locations[selectedLocation].services.map((service, index) => (
                      <Card 
                        key={index}
                        className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-pink-300 border-2 hover:-translate-y-1"
                        onClick={() => handleServiceSelect(service)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-3xl">{service.icon}</div>
                              <div className="space-y-1">
                                <h3 className="text-xl font-bold text-gray-900 font-league-spartan">
                                  {service.name}
                                </h3>
                                <p className="text-gray-600 font-montserrat text-sm">
                                  {service.description}
                                </p>
                                <div className="flex items-center space-x-2 text-pink-600">
                                  <Clock className="h-4 w-4" />
                                  <span className="font-semibold font-montserrat">{service.duration}</span>
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-pink-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Cal.com Booking Widget */}
              {currentStep === 3 && selectedService && selectedLocation && (
                <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                  <CardHeader className="bg-gray-900 text-white text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-3 text-gray-300" />
                    <CardTitle className="text-2xl font-bold font-league-spartan">
                      Book Your Appointment
                    </CardTitle>
                    <div className="text-gray-300 space-y-1">
                      <p>{selectedService.name} at {locations[selectedLocation].name}</p>
                      <p className="text-sm">Duration: {selectedService.duration}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div style={{ width: '100%', height: '600px' }}>
                      <Cal 
                        calLink={selectedService.calLink}
                        style={{width:"100%",height:"100%",overflow:"scroll"}}
                        config={{
                          "layout":"month_view",
                          "theme": "light"
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-league-spartan">
              Need urgent alterations?
            </h2>
            <p className="text-xl text-gray-600 font-montserrat">
              Call us directly for rush orders and same-day service
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                onClick={() => window.open('tel:3435881300', '_self')}
              >
                <span>Call Preston Location</span>
                <ExternalLink className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2"
                onClick={() => window.open('tel:3435883182', '_self')}
              >
                <span>Call Riverside Location</span>
                <ExternalLink className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 