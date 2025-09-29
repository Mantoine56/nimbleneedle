"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Users,
  Facebook,
  Instagram
} from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import { useState, useEffect, useRef } from 'react';

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
    directions: "https://www.google.com/maps/search/Nimble+Needle+Tailoring+141+Preston+St+Ottawa"
  },
  {
    name: "Riverside & Uplands",
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
    directions: "https://www.google.com/maps/search/Nimble+Needle+Tailoring+3681+Riverside+Dr+Ottawa"
  }
];

const contactMethods = [
  {
    method: "Phone",
    icon: Phone,
    primary: "(343) 588-1300 - Preston St",
    secondary: "(343) 588-3182 - Riverside Dr", 
    description: "Call either location directly",
    available: "During business hours"
  },
  {
    method: "Email",
    icon: Mail,
    primary: "info@nimbleneedle.ca",
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
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const locationPopupRef = useRef<HTMLDivElement>(null);
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle click outside to close popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationPopupRef.current && !locationPopupRef.current.contains(event.target as Node)) {
        setIsLocationPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send form data to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - show success message
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        // API returned an error
        console.error('Form submission error:', data.error);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    } catch (error) {
      // Network or other error
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Contact Us', current: true }
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Contact Information */}
            <div>
              <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-4 py-2 text-sm font-medium mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Two Convenient Ottawa Locations
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 font-league-spartan">
                CONTACT<br />
                <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  NIMBLE NEEDLE
                </span><br />
                TAILORING
              </h1>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-montserrat mb-8">
                <p>
                  Ready to experience expert tailoring? Visit us at either of our convenient Ottawa locations. 
                  No appointment necessary - walk-ins are always welcome!
                </p>
                
                {/* Removed multilingual service line at user request to declutter the hero copy. */}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 relative">
                <Button 
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    if (form) {
                      form.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
                <Button 
                  onClick={() => {
                    setIsLocationPopupOpen(!isLocationPopupOpen);
                  }}
                  variant="outline" 
                  className="border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg font-semibold rounded-full"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Our Locations
                </Button>
              </div>

              {/* Location Popup - Fixed positioning */}
              {isLocationPopupOpen && (
                <div 
                  ref={locationPopupRef}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999]"
                >
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
                    <h3 className="text-white font-semibold font-league-spartan text-lg">Our Locations</h3>
                    <p className="text-white/80 text-sm">Get directions to our locations</p>
                  </div>
                  <div className="p-4 space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
                        <h4 className="font-semibold text-gray-900 font-montserrat">{location.name}</h4>
                    <button
                      type="button"
                      onClick={() => window.open(location.directions, '_blank', 'noopener,noreferrer')}
                      className="text-gray-600 text-sm flex items-center gap-1 mt-1 underline decoration-dotted underline-offset-4 hover:text-pink-600 transition-colors"
                    >
                      <MapPin className="h-3 w-3" />
                      {location.address}
                    </button>
                        <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" />
                          {location.phone}
                        </p>
                        <div className="text-gray-600 text-sm flex items-start gap-1 mt-1">
                          <Clock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p>Tue-Sat: 9am-9pm</p>
                            <p>Sun-Mon: 10am-7pm</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            onClick={() => {
                              window.open(location.directions, '_blank');
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
                            {location.phone}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backdrop for popup */}
              {isLocationPopupOpen && (
                <div 
                  className="fixed inset-0 bg-black/50 z-[9998]"
                  onClick={() => setIsLocationPopupOpen(false)}
                />
              )}
            </div>

            {/* Contact Form */}
            <div className="relative" id="contact-form">
              <Card className="shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-league-spartan">
                      Send us a message
                    </h3>
                    <p className="text-gray-600">
                      Get a quote or ask about our services
                    </p>
                  </div>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium">Something went wrong. Please try again.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(Optional) Your phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                      />
                    </div>

                    {/* Service Type */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors bg-white"
                      >
                        <option value="">Select a service (optional)</option>
                        <option value="clothing-alterations">Clothing Alterations</option>
                        <option value="wedding-dress">Wedding Dress Alterations</option>
                        <option value="suit-alterations">Suit Alterations</option>
                        <option value="custom-suits">Custom Suits</option>
                        <option value="dry-cleaning">Dry Cleaning</option>
                        <option value="zipper-repair">Zipper Repair</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Describe your alteration needs or ask us a question..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 text-center">
                      Or contact us directly at{' '}
                      <a href="mailto:info@nimbleneedle.ca" className="text-pink-600 hover:text-pink-700 font-medium">
                        info@nimbleneedle.ca
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-league-spartan">
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
                <Card key={index} className="border-0 bg-gradient-to-br from-white to-pink-50 hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-league-spartan">
                      {method.method}
                    </h3>
                    
                    <div className="mb-4">
                      {method.method === "Phone" ? (
                        <>
                          <a 
                            href="tel:3435881300"
                            className="text-lg font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-300 block mb-1 cursor-pointer"
                            aria-label="Call Preston Street location"
                          >
                            {method.primary}
                          </a>
                          {method.secondary && (
                            <a 
                              href="tel:3435883182"
                              className="text-lg font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-300 block cursor-pointer"
                              aria-label="Call Riverside Drive location"
                            >
                              {method.secondary}
                            </a>
                          )}
                        </>
                      ) : method.method === "Email" ? (
                        <a 
                          href="mailto:info@nimbleneedle.ca"
                          className="text-lg font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-300 block mb-1 cursor-pointer"
                          aria-label="Send us an email"
                        >
                          {method.primary}
                        </a>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-pink-600 mb-1">{method.primary}</p>
                          {method.secondary && (
                            <p className="text-lg font-semibold text-pink-600">{method.secondary}</p>
                          )}
                        </>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{method.description}</p>
                    
                    <Badge className="bg-pink-100 text-pink-700 text-xs">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-league-spartan">
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
                    title={`Google Maps location for ${location.name}`}
                  ></iframe>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 font-league-spartan">
                      {location.name}
                    </h3>
                    <Badge className="bg-pink-100 text-pink-700">
                      Walk-ins Welcome
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <button
                      type="button"
                      onClick={() => window.open(location.directions, '_blank', 'noopener,noreferrer')}
                      className="flex items-start space-x-3 text-left text-pink-600 hover:text-pink-700 font-semibold transition-colors"
                      aria-label={`Open Google Maps directions for ${location.name}`}
                    >
                      {/* Ensure the location address is clickable for quick map access. */}
                      <MapPin className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                      <span className="text-left">
                        <span className="text-gray-700 font-medium underline decoration-dotted underline-offset-4">
                          {location.address}
                        </span>
                        <br />
                        <span className="text-gray-600 font-normal">{location.city}</span>
                      </span>
                    </button>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-pink-500 flex-shrink-0" />
                      <a 
                        href={`tel:${location.phone.replace(/[^\d]/g, '')}`}
                        className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
                      >
                        {location.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
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
                          <CheckCircle className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white flex-1"
                      onClick={() => window.open(location.directions, '_blank')}
                    >
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-pink-500 text-pink-600 hover:bg-pink-50"
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

      {/* A Family Tradition in Tailoring */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-league-spartan">
                A Family Tradition in Tailoring
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-montserrat">
                Nimble Needle Tailoring is a family-owned business built on a tradition of 
                craftsmanship and attention to detail. Led by Riber Baabo, a tailor with 
                over 20 years of experience, our team is dedicated to delivering precise 
                and high-quality tailoring solutions. Our family values are reflected in the 
                care and precision we bring to every garment, ensuring each client 
                receives personalized service and seamless alterations.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/services/A Family Tradition in Tailoring.jpeg"
                  alt="A family tradition in tailoring - expert craftsmanship at Nimble Needle Tailoring"
                  fill
                  className="object-cover"
                />
                {/* Decorative scissors icon */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tailoring Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/services/Our Tailoring Services.jpg"
                  alt="Our tailoring services - professional craftsmanship at Nimble Needle Tailoring"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-league-spartan">
                Our Tailoring Services
              </h2>
              <p className="text-lg text-gray-700 mb-6 font-montserrat">
                At Nimble Needle Tailoring, we provide a range of tailoring services, 
                including but not limited to:
              </p>
              
              <ul className="space-y-4 text-gray-700 font-montserrat">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-pink-600">Wedding dress alterations</strong> for bridal gowns and formal attire</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-pink-600">Dress alterations</strong> for casual and formal wear</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-pink-600">Zipper repair</strong> for jackets, dresses, and more</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-pink-600">Suit alterations</strong> for a tailored and refined fit</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-pink-600">General garment alterations</strong> for men's, women's, and children's clothing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong className="text-pink-600">Repairs and restorations</strong> for damaged clothing</span>
                </li>
              </ul>

              <p className="text-gray-700 mt-6 font-montserrat">
                If you require a specific service that is not listed, please contact us, and 
                our team will be happy to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-league-spartan">
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
                  <h3 className="text-lg font-bold text-gray-900 mb-3 font-league-spartan">
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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
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
                  <span className="text-2xl font-bold font-league-spartan">Nimble Needle Tailoring</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed font-montserrat">
                  Your one-stop shop for all your tailoring and clothing alteration needs in Ottawa!
                </p>
                
                {/* Social Media */}
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2" 
                    onClick={() => window.open('https://www.facebook.com/NimbleNeedleTailoring', '_blank')}
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-2" 
                    onClick={() => window.open('https://www.instagram.com/nimble.needle.tailoring', '_blank')}
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Preston Location */}
              <div>
                <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">Downtown Ottawa - Preston</h3>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=141+Preston+St,+Ottawa,+ON+K1R+7P4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block hover:text-pink-400 transition-colors"
                    >
                      <p className="font-medium">141 Preston St</p>
                      <p>Ottawa, ON K1R 7P4</p>
                    </a>
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
                <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">Riverside & Uplands</h3>
                <div className="space-y-4 text-gray-300 font-montserrat">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=3681+Riverside+Dr,+Ottawa,+ON+K1V+1H7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block hover:text-pink-400 transition-colors"
                    >
                      <p className="font-medium">3681 Riverside Dr</p>
                      <p>Ottawa, ON K1V 1H7</p>
                    </a>
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
                <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">Services</h3>
                <ul className="space-y-3 text-gray-300 font-montserrat mb-6">
                  <li><a href="/clothing-alterations" className="hover:text-pink-400 transition-colors">Alterations & Repairs</a></li>
                  <li><a href="/services" className="hover:text-pink-400 transition-colors">Custom & Retail Suits</a></li>
                  <li><a href="/zipper-repair" className="hover:text-pink-400 transition-colors">Zipper Repair</a></li>
                  <li><a href="/wedding-dress-alterations" className="hover:text-pink-400 transition-colors">Wedding Dress Alterations</a></li>
                  <li><a href="/services" className="hover:text-pink-400 transition-colors">All Services</a></li>
                </ul>

                {/* Email Contact */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="h-5 w-5 text-pink-400" />
                    <span className="font-semibold text-pink-400">Email Us</span>
                  </div>
                  <a 
                    href="mailto:info@nimbleneedle.ca" 
                    className="text-gray-300 hover:text-pink-400 transition-colors whitespace-nowrap block text-sm"
                  >
                    info@nimbleneedle.ca
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