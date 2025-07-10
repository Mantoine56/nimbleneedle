'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, User, Search, Filter, X } from 'lucide-react';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog-data';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const allPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  
  const filteredPosts = allPosts.filter(post => {
    // Category filter
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    
    // Tag filter
    if (selectedTag && !post.tags.includes(selectedTag)) return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return post.title.toLowerCase().includes(searchLower) ||
             post.excerpt.toLowerCase().includes(searchLower) ||
             post.tags.some(tag => tag.toLowerCase().includes(searchLower));
    }
    
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('');
    setSearchTerm('');
  };

  // Generate structured data for the blog listing page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://nimbleneedle.ca/blog',
    name: 'Nimble Needle Tailoring Blog',
    description: 'Expert tips, insights, and advice on clothing alterations, tailoring, and garment care from Ottawa\'s premier tailoring service.',
    url: 'https://nimbleneedle.ca/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Nimble Needle Tailoring',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nimbleneedle.ca/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://nimbleneedle.ca/blog'
    },
    about: {
      '@type': 'Thing',
      name: 'Clothing Alterations and Tailoring'
    },
    inLanguage: 'en-CA',
    blogPost: allPosts.map(post => ({
      '@type': 'BlogPosting',
      '@id': `https://nimbleneedle.ca/blog/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role
      },
      url: `https://nimbleneedle.ca/blog/${post.slug}`,
      image: `https://nimbleneedle.ca${post.featuredImage}`,
      keywords: post.tags,
      articleSection: post.category
    })),
  };

  // Generate breadcrumb structured data
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nimbleneedle.ca'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://nimbleneedle.ca/blog'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <SocialSidebar />
        
        {/* Enhanced Hero Section */}
        <section className="relative bg-gradient-to-r from-pink-600 via-pink-500 to-pink-700 text-white py-20 sm:py-32">
          <div className="absolute inset-0 bg-black/10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-league-spartan font-bold mb-4 sm:mb-6 animate-fade-in">
                The Nimble Needle Blog
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-light animate-fade-in animation-delay-200">
                Expert tailoring tips, fashion insights, and professional advice from our master tailors
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-300">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-pink-600"
                  />
                </div>
                {(selectedCategory !== 'all' || selectedTag || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:gap-12">
              
              {/* Enhanced Sidebar */}
              <aside className="lg:w-1/4 mb-8 sm:mb-12 lg:mb-0">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 sticky top-24 border border-gray-200/50 backdrop-blur-sm">
                  
                  {/* Categories */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-600" />
                      <h2 className="text-xl sm:text-2xl font-league-spartan font-bold text-gray-900">Categories</h2>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      <li>
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className={`text-left w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                            selectedCategory === 'all' 
                              ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg' 
                              : 'hover:bg-gray-50 text-gray-700'
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
                              className={`text-left w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                                selectedCategory === category 
                                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg' 
                                  : 'hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              {category} ({count})
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Popular Tags */}
                  <div>
                    <div className="flex items-center mb-4 sm:mb-6">
                      <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-600" />
                      <h2 className="text-xl sm:text-2xl font-league-spartan font-bold text-gray-900">Popular Tags</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 10).map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                            selectedTag === tag
                              ? 'bg-pink-600 text-white shadow-lg'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Blog Posts Grid */}
              <div className="lg:w-3/4">
                
                {/* Filter Status */}
                {(selectedTag || searchTerm || selectedCategory !== 'all') && (
                  <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-gray-600 text-sm sm:text-base">Showing {filteredPosts.length} results</span>
                        {selectedCategory !== 'all' && (
                          <span className="px-2 sm:px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs sm:text-sm font-medium">
                            Category: {selectedCategory}
                          </span>
                        )}
                        {selectedTag && (
                          <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                            Tag: #{selectedTag}
                          </span>
                        )}
                        {searchTerm && (
                          <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                            Search: "{searchTerm}"
                          </span>
                        )}
                      </div>
                      <button
                        onClick={clearFilters}
                        className="text-pink-600 hover:text-pink-700 font-medium text-xs sm:text-sm"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Blog Posts Grid */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {filteredPosts.map((post, index) => (
                    <article 
                      key={post.id} 
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-200/50 backdrop-blur-sm animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-pink-600 text-white rounded-full text-xs sm:text-sm font-medium shadow-lg">
                              <Tag className="w-3 h-3 mr-1" />
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-4 sm:p-6">
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-league-spartan font-bold mb-2 sm:mb-3 hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="mr-3 sm:mr-4">
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {post.author.avatar && (
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={28}
                                height={28}
                                className="rounded-full mr-2 sm:mr-3 shadow-md sm:w-8 sm:h-8"
                              />
                            )}
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-gray-900">{post.author.name}</p>
                              {post.author.role && (
                                <p className="text-xs text-pink-600">{post.author.role}</p>
                              )}
                            </div>
                          </div>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                            aria-label={`Read more about ${post.title}`}
                          >
                            Read Full Article
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-12 sm:py-16">
                    <div className="max-w-md mx-auto">
                      <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl sm:text-2xl font-league-spartan font-bold text-gray-900 mb-2">No articles found</h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                        We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
                      </p>
                      <button
                        onClick={clearFilters}
                        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}