import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/blog-data';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <article 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-playfair font-bold mb-2 hover:text-pink-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="mr-4">
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{post.readTime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-sm text-gray-600">{post.author.name}</span>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-pink-600 hover:text-pink-700 font-semibold text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}