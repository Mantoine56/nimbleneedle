'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-lg p-6 observe-fade">
      <h3 className="font-playfair font-bold mb-4">Share This Post</h3>
      <div className="space-y-2">
        <button
          onClick={() => shareOnSocial('facebook')}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </button>
        <button
          onClick={() => shareOnSocial('twitter')}
          className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition-colors"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </button>
        <button
          onClick={() => shareOnSocial('linkedin')}
          className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </button>
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}