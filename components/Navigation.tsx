"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Scissors, Heart, Zap, Settings, Shirt, Sparkles } from 'lucide-react';
import Image from 'next/image';
import LocationSelector from './LocationSelector';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLightBackground, setIsLightBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Detect if we're on a page with light background (not homepage)
    const isHomepage = window.location.pathname === '/';
    setIsLightBackground(!isHomepage);
  }, []);

  // Close mobile menu when clicking outside or on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' }
  ];

  const servicePages = [
    { 
      name: 'All Services', 
      href: '/services', 
      icon: Settings,
      description: 'Browse our complete service offerings'
    },
    { 
      name: 'Clothing Alterations', 
      href: '/clothing-alterations', 
      icon: Scissors,
      description: 'Professional tailoring and alterations'
    },
    { 
      name: 'Custom and Retail Suits', 
      href: '/custom-suits', 
      icon: Shirt,
      description: 'Tailored suits and formal wear'
    },
    { 
      name: 'Dry Cleaning', 
      href: '/dry-cleaning', 
      icon: Sparkles,
      description: 'Professional dry cleaning services'
    },
    { 
      name: 'Wedding Dress Alterations', 
      href: '/wedding-dress-alterations', 
      icon: Heart,
      description: 'Expert bridal gown fitting and alterations'
    },
    { 
      name: 'Zipper Repair and Replacement', 
      href: '/zipper-repair', 
      icon: Zap,
      description: 'Quick and reliable zipper fixes'
    }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        // Use light background if not on homepage or if scrolled
        isLightBackground || isScrolled
          ? 'backdrop-blur-xl bg-white/95 border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`relative w-12 h-12 rounded-xl overflow-hidden p-1 shadow-lg transition-all duration-500 ${
                isLightBackground || isScrolled 
                  ? 'bg-gray-100' 
                  : 'bg-white/25 backdrop-blur-sm'
              }`}>
                <Image
                  src="/logo.png"
                  alt="Nimble Needle Tailoring - Expert clothing alterations and tailoring services in Ottawa"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={`text-2xl font-bold tracking-tight font-playfair transition-colors duration-500 ${
                isLightBackground || isScrolled 
                  ? 'text-gray-900' 
                  : 'text-white drop-shadow-lg'
              }`}>Nimble Needle</span>
            </div>
            
            {/* Desktop Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* Home and About Links */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative group px-6 py-3 transition-all duration-300 font-medium ${
                    isLightBackground || isScrolled 
                      ? 'text-gray-700 hover:text-gray-900' 
                      : 'text-white/90 hover:text-white drop-shadow-md'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Hover Effect - Animated Underline */}
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-pink-400 to-pink-600 group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300 ease-out"></div>
                  
                  {/* Hover Effect - Subtle Glow */}
                  <div className={`absolute inset-0 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg ${
                    isLightBackground || isScrolled 
                      ? 'bg-gray-100/50' 
                      : 'bg-white/10'
                  }`}></div>
                </a>
              ))}
              
              {/* Services Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <button className={`relative group px-6 py-3 transition-all duration-300 font-medium flex items-center ${
                  isLightBackground || isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white drop-shadow-md'
                }`}>
                  <span className="relative z-10">Services</span>
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  
                  {/* Hover Effect - Animated Underline */}
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-pink-400 to-pink-600 group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300 ease-out"></div>
                  
                  {/* Hover Effect - Subtle Glow */}
                  <div className={`absolute inset-0 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg ${
                    isLightBackground || isScrolled 
                      ? 'bg-gray-100/50' 
                      : 'bg-white/10'
                  }`}></div>
                </button>
                
                {/* Creative Dropdown Menu */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[600px] transition-all duration-300 ${
                  isServicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  {/* Dropdown Arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-pink-200"></div>
                  
                  {/* Dropdown Content */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-200 px-6 py-4">
                      <h3 className="text-gray-900 font-semibold font-playfair text-lg">Our Services</h3>
                      <p className="text-gray-700 text-sm">Expert tailoring and alterations in Ottawa</p>
                    </div>
                    
                    {/* Service Grid */}
                    <div className="p-4 grid grid-cols-3 gap-3">
                      {servicePages.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                          <a
                            key={service.name}
                            href={service.href}
                            className="group relative bg-gradient-to-br from-pink-50/50 to-white p-4 rounded-xl hover:from-pink-100 hover:to-pink-50 border border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                          >
                            {/* Service Icon */}
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 group-hover:from-pink-500 group-hover:to-pink-600 rounded-lg mb-3 transition-all duration-300">
                              <IconComponent className="h-5 w-5 text-pink-600 group-hover:text-white" />
                            </div>
                            
                            {/* Service Info */}
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-gray-800 text-sm mb-1 transition-colors duration-200">
                                {service.name}
                              </h4>
                              <p className="text-gray-600 group-hover:text-gray-700 text-xs leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                            
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-pink-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </a>
                        );
                      })}
                    </div>
                    
                    {/* Footer CTA */}
                    <div className="border-t border-pink-200 p-4 bg-gradient-to-r from-pink-50/50 to-rose-50/50">
                      <p className="text-center text-gray-600 text-sm">
                        Need something else? 
                        <a href="/contact-us" className="text-pink-600 hover:text-pink-700 font-medium ml-1 transition-colors duration-200 underline decoration-pink-400 hover:decoration-pink-600">
                          Contact us today
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Link */}
              <a
                href="/contact-us"
                className={`relative group px-6 py-3 transition-all duration-300 font-medium ${
                  isLightBackground || isScrolled 
                    ? 'text-gray-700 hover:text-gray-900' 
                    : 'text-white/90 hover:text-white drop-shadow-md'
                }`}
              >
                <span className="relative z-10">Contact</span>
                
                {/* Hover Effect - Animated Underline */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-pink-400 to-pink-600 group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300 ease-out"></div>
                
                {/* Hover Effect - Subtle Glow */}
                <div className={`absolute inset-0 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg ${
                  isLightBackground || isScrolled 
                    ? 'bg-gray-100/50' 
                    : 'bg-white/10'
                }`}></div>
              </a>
            </nav>

            {/* Mobile + Desktop Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-3 transition-all duration-500 ${
                  isLightBackground || isScrolled 
                    ? 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200' 
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                }`}
                size="sm"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
              
              {/* Location Selector */}
              <LocationSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={closeMobileMenu}>
          <div 
            className="absolute top-20 left-0 right-0 bg-white/98 border-b border-gray-200/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="max-w-7xl mx-auto px-4 py-6">
              <div className="space-y-1">
                {/* Home and About */}
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-gray-900 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile Services Section */}
                <div className="pt-4">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Services
                  </div>
                  {servicePages.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <a
                        key={service.name}
                        href={service.href}
                        onClick={closeMobileMenu}
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-gray-900 rounded-lg transition-all duration-200 font-medium group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 bg-pink-100 group-hover:bg-pink-500 rounded-lg mr-3 transition-colors duration-200">
                          <IconComponent className="h-4 w-4 text-pink-600 group-hover:text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-xs text-gray-500 group-hover:text-gray-700">{service.description}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
                
                {/* Contact */}
                <div className="pt-4">
                  <a
                    href="/contact-us"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-gray-900 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-all duration-200 font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>
              
              {/* Mobile CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-3">Ready to get started?</p>
                  <Button 
                    onClick={closeMobileMenu}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
                  >
                    Book Your Appointment
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
} 