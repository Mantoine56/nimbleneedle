"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LocationSelector from './LocationSelector';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-gradient-to-b from-black/20 to-black/10 border-b border-white/30 shadow-xl shadow-black/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/25 backdrop-blur-sm p-1 shadow-lg">
              <Image
                src="/logo.png"
                alt="Nimble Needle Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight font-playfair drop-shadow-lg">Nimble Needle</span>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group px-6 py-3 text-white/90 hover:text-white transition-all duration-300 font-medium drop-shadow-md"
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Hover Effect - Animated Underline */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-pink-400 to-pink-600 group-hover:w-3/4 group-hover:left-[12.5%] transition-all duration-300 ease-out"></div>
                
                {/* Hover Effect - Subtle Glow */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"></div>
              </a>
            ))}
          </nav>
          
          {/* Location Selector */}
          <LocationSelector />
        </div>
      </div>
    </header>
  );
} 