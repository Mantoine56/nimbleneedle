import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
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
                <span className="text-2xl font-bold font-league-spartan">Nimble Needle</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed font-montserrat">
                Your one-stop shop for all your tailoring and clothing alteration needs in Ottawa!
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white p-2" aria-label="Follow us on Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-2" aria-label="Follow us on Instagram">
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
                  <div>
                    <p className="font-medium">141 Preston St</p>
                    <p>Ottawa, ON K1R 7P4</p>
                  </div>
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
              <h3 className="text-lg font-semibold mb-6 font-league-spartan text-pink-400">New Location - Riverside</h3>
              <div className="space-y-4 text-gray-300 font-montserrat">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">3681 Riverside Dr</p>
                    <p>Ottawa, ON K1V 1H7</p>
                  </div>
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
              <ul className="space-y-3 text-gray-300 font-montserrat mb-8">
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
                  href="mailto:nimble.needle.tailoring@gmail.com" 
                  className="text-gray-300 hover:text-pink-400 transition-colors break-all"
                >
                  nimble.needle.tailoring@gmail.com
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
  );
}