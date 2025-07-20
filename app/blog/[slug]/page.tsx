import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, ChevronLeft, Share2 } from 'lucide-react';
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from '@/lib/blog-data';
import Navigation from '@/components/Navigation';
import SocialSidebar from '@/components/SocialSidebar';
import Footer from '@/components/Footer';
import BlogPostClient from './BlogPostClient';

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Nimble Needle',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Nimble Needle Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),

    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,

      tags: post.tags,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://nimbleneedle.ca/blog/${slug}`,
    url: `https://nimbleneedle.ca/blog/${slug}`,
    name: post.title,
    headline: post.title,
    description: post.excerpt,
    image: `https://nimbleneedle.ca${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.date,

    publisher: {
      '@type': 'Organization',
      name: 'Nimble Needle Tailoring',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nimbleneedle.ca/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nimbleneedle.ca/blog/${slug}`
    },
    wordCount: post.content.split(' ').length,
    timeRequired: post.readTime,
    keywords: post.tags,
    articleSection: post.category,
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://nimbleneedle.ca/blog',
      name: 'Nimble Needle Tailoring Blog'
    },
    about: {
      '@type': 'Thing',
      name: 'Clothing Alterations and Tailoring'
    },
    mentions: [
      {
        '@type': 'Organization',
        name: 'Nimble Needle Tailoring',
        url: 'https://nimbleneedle.ca'
      }
    ],
    inLanguage: 'en-CA'
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
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://nimbleneedle.ca/blog/${slug}`
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
        
        {/* Enhanced Hero Section with Featured Image */}
        <section className="relative h-[60vh] min-h-[400px] sm:min-h-[500px] overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
              <div className="max-w-4xl">
                {/* Category Badge */}
                <div className="mb-3 sm:mb-4 animate-fade-in">
                  <span className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-pink-600 text-white rounded-full text-xs sm:text-sm font-medium">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {post.category}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-league-spartan font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in animation-delay-200">
                  {post.title}
                </h1>
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/90 text-sm sm:text-lg animate-fade-in animation-delay-300">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-base">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-base">{post.readTime}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12 sm:py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
                
                {/* Sidebar */}
                <aside className="lg:col-span-1 order-2 lg:order-1">
                  <div className="sticky top-24 space-y-6 sm:space-y-8">
                    


                    {/* Share Buttons */}
                    <BlogPostClient postUrl={`https://nimbleneedle.ca/blog/${post.slug}`} postTitle={post.title} />

                    {/* Back to Blog */}
                    <Link
                      href="/blog"
                      className="block bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-6 sm:p-8 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl text-center border border-pink-400"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2" />
                      <div className="font-bold">Back to Blog</div>
                      <div className="text-sm opacity-90 mt-1">Discover more articles</div>
                    </Link>
                  </div>
                </aside>

                {/* Enhanced Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-sm">
                    
                    {/* Content Header */}
                    <div className="p-8 sm:p-12 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/30 to-white">
                      <div className="max-w-none">
                        {/* Article Lead/Excerpt */}
                        <p className="text-xl sm:text-2xl xl:text-3xl text-gray-700 leading-relaxed font-light italic mb-6 
                                     border-l-4 border-pink-500 pl-6 bg-pink-50/30 rounded-r-lg py-4">
                          {post.excerpt}
                        </p>
                        
                        {/* Reading indicators */}
                        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="p-8 sm:p-12">
                      <div 
                        className="blog-content max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>

                    {/* Tags Section */}
                    <div className="p-6 sm:p-8 border-t border-gray-200/50 bg-gray-50/50">
                      <h3 className="text-xl sm:text-2xl font-league-spartan font-bold text-gray-900 mb-4 sm:mb-6">Tags</h3>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {post.tags.map(tag => (
                          <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="bg-white hover:bg-pink-50 border border-gray-200 hover:border-pink-200 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:text-pink-600 transition-all duration-300 transform hover:scale-105 shadow-sm"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="mt-12 sm:mt-16">
                      <h2 className="text-3xl sm:text-4xl font-league-spartan font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                        Related Articles
                      </h2>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {relatedPosts.map((relatedPost, index) => (
                          <Link
                            key={relatedPost.id}
                            href={`/blog/${relatedPost.slug}`}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                              <Image
                                src={relatedPost.featuredImage}
                                alt={relatedPost.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4 sm:p-6">
                              <h3 className="font-league-spartan font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
                                {relatedPost.title}
                              </h3>
                              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span>
                                  {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                                <span className="mx-2">•</span>
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span>{relatedPost.readTime}</span>
                              </div>
                              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                                {relatedPost.excerpt}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}