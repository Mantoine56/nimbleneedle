'use client';

import { useState } from 'react';
import { Share2, Facebook, Instagram, Copy, Check } from 'lucide-react';

interface BlogPostClientProps {
  postUrl: string;
  postTitle: string;
}

export default function BlogPostClient({ postUrl, postTitle }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  const visitSocialMedia = (platform: string) => {
    const urls: { [key: string]: string } = {
      facebook: 'https://www.facebook.com/NimbleNeedleTailoring',
      instagram: 'https://www.instagram.com/nimble.needle.tailoring'
    };
    
    window.open(urls[platform], '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50 backdrop-blur-sm">
      <div className="flex items-center mb-6">
        <Share2 className="w-5 h-5 mr-2 text-pink-600" />
        <h3 className="text-xl font-league-spartan font-bold text-gray-900">Follow Us</h3>
      </div>
      
      <div className="space-y-3">
        {/* Facebook */}
        <button
          onClick={() => visitSocialMedia('facebook')}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Facebook className="w-5 h-5" />
          <span>Visit us on Facebook</span>
        </button>
        
        {/* Instagram */}
        <button
          onClick={() => visitSocialMedia('instagram')}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Instagram className="w-5 h-5" />
          <span>Visit us on Instagram</span>
        </button>
        
        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            copied 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}