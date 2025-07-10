"use client";

import { Facebook, Instagram, MessageCircle, Phone } from 'lucide-react';

export default function SocialSidebar() {
  const handleSocialClick = (platform: string) => {
    switch (platform) {
      case 'facebook':
        window.open('https://www.facebook.com/NimbleNeedleTailoring', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/nimble.needle.tailoring', '_blank');
        break;
      case 'whatsapp':
        window.open('https://wa.me/13435881300', '_blank');
        break;
      case 'call':
        window.open('tel:3435881300');
        break;
    }
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div className="bg-gray-100/80 backdrop-blur-sm rounded-l-lg shadow-lg border-l border-t border-b border-gray-200/50 py-4 px-2 space-y-3">
        {/* Facebook */}
        <button
          onClick={() => handleSocialClick('facebook')}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white/60 rounded-md transition-all duration-200 group"
          aria-label="Facebook"
        >
          <Facebook className="h-4 w-4" />
        </button>

        {/* Instagram */}
        <button
          onClick={() => handleSocialClick('instagram')}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white/60 rounded-md transition-all duration-200 group"
          aria-label="Instagram"
        >
          <Instagram className="h-4 w-4" />
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleSocialClick('whatsapp')}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white/60 rounded-md transition-all duration-200 group"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </button>

        {/* Call Button */}
        <button
          onClick={() => handleSocialClick('call')}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white/60 rounded-md transition-all duration-200 group"
          aria-label="Call Us"
        >
          <Phone className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 