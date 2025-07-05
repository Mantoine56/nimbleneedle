'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog-data';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  
  const filteredPosts = allPosts.filter(post => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (selectedTag && !post.tags.includes(selectedTag)) return false;
    return true;
  });



  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SocialSidebar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-600 to-pink-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 animate-fade-in">
            Nimble Needle Blog
          </h1>
          <p className="text-xl mb-8 animate-fade-in animation-delay-200">
            Tailoring Tips, Fashion Insights, and Expert Advice
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="lg:flex lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4 mb-8 lg:mb-0">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-playfair font-bold mb-4">Categories</h2>
                <ul className="space-y-2 mb-8">
                  <li>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`text-left w-full px-3 py-2 rounded transition-colors ${
                        selectedCategory === 'all' 
                          ? 'bg-pink-100 text-pink-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      All Posts ({allPosts.length})
                    </button>
                  </li>
                  {categories.map(category => {
                    const count = allPosts.filter(p => p.category === category).length;
                    return (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`text-left w-full px-3 py-2 rounded transition-colors ${
                            selectedCategory === category 
                              ? 'bg-pink-100 text-pink-700' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category} ({count})
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <h2 className="text-2xl font-playfair font-bold mb-4">Popular Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTag === tag
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Blog Posts Grid */}
            <div className="lg:w-3/4">
              {selectedTag && (
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">
                    Showing posts tagged with "{selectedTag}"
                  </p>
                  <button
                    onClick={() => setSelectedTag('')}
                    className="text-pink-600 hover:text-pink-700"
                  >
                    Clear filter
                  </button>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
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
                          <User className="w-4 h-4 mr-1 text-gray-500" />
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
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}