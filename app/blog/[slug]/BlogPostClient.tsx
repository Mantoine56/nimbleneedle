'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';

interface BlogPostClientProps {
  postUrl: string;
  postTitle: string;
}

export default function BlogPostClient({ postUrl, postTitle }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  const shareOnSocial = (platform: string) => {
    const urls: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
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
        <h3 className="text-xl font-league-spartan font-bold text-gray-900">Share This Post</h3>
      </div>
      
      <div className="space-y-3">
        {/* Facebook */}
        <button
          onClick={() => shareOnSocial('facebook')}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Facebook className="w-5 h-5" />
          <span>Share on Facebook</span>
        </button>
        
        {/* Twitter */}
        <button
          onClick={() => shareOnSocial('twitter')}
          className="w-full flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Twitter className="w-5 h-5" />
          <span>Share on Twitter</span>
        </button>
        
        {/* LinkedIn */}
        <button
          onClick={() => shareOnSocial('linkedin')}
          className="w-full flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Linkedin className="w-5 h-5" />
          <span>Share on LinkedIn</span>
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