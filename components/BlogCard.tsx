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
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-200/50 backdrop-blur-sm animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 bg-pink-600 text-white rounded-full text-sm font-medium shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl lg:text-2xl font-playfair font-bold mb-3 hover:text-pink-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
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
                width={32}
                height={32}
                className="rounded-full mr-3 shadow-md"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              {post.author.role && (
                <p className="text-xs text-pink-600">{post.author.role}</p>
              )}
            </div>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}