"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, ChevronDown, Calendar, Clock } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
  hours: string;
}

const locations: Location[] = [
  {
    id: 'preston',
    name: 'Downtown Ottawa - Preston',
    address: '141 Preston St, Ottawa, ON K1R 7P4',
    phone: '(343) 588-1300',
    mapUrl: 'https://www.google.com/maps/search/Nimble+Needle+Tailoring+141+Preston+St+Ottawa',
    hours: 'Sun-Mon: 10am-7pm • Tue-Sat: 9am-9pm'
  },
  {
    id: 'riverside',
    name: 'Riverside & Uplands', 
    address: '3681 Riverside Dr, Ottawa, ON K1V 1H7',
    phone: '(343) 588-3182',
    mapUrl: 'https://www.google.com/maps/search/Nimble+Needle+Tailoring+3681+Riverside+Dr+Ottawa',
    hours: 'Sun-Mon: 10am-7pm • Tue-Sat: 9am-9pm'
  }
];

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone.replace(/[^\d]/g, '')}`);
  };

  const handleDirections = (mapUrl: string) => {
    window.open(mapUrl, '_blank');
  };

  const handleBookAppointment = () => {
    // Redirect to bookings page
    window.location.href = '/bookings';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 px-6 py-3 font-semibold transform hover:scale-105 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          Call Us
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4">
            <h3 className="text-white font-semibold font-league-spartan text-lg">Visit Nimble Needle</h3>
            <p className="text-white/80 text-sm">Call us or get directions • Walk-ins welcome!</p>
          </div>

          {/* Locations */}
          <div className="p-4 space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="group bg-gray-50/50 rounded-xl p-4 hover:bg-gray-100/50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 font-montserrat">{location.name}</h4>
                    <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {location.address}
                    </p>
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
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => handleCall(location.phone)}
                    size="sm"
                    // Alternative colors to consider:
                    // Teal: bg-teal-500 hover:bg-teal-600 (modern, fresh)
                    // Slate: bg-slate-600 hover:bg-slate-700 (professional, neutral)
                    // Amber: bg-amber-500 hover:bg-amber-600 (warm, friendly)
                    // Cyan: bg-cyan-500 hover:bg-cyan-600 (bright, energetic)
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs transition-all duration-200"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    {location.phone}
                  </Button>
                  <Button
                    onClick={() => handleDirections(location.mapUrl)}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-300 hover:bg-gray-100 text-gray-700 text-xs"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    Our Locations
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Book Appointment CTA */}
          <div className="border-t border-gray-200/50 p-4">
            <Button
              onClick={handleBookAppointment}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Your Appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 