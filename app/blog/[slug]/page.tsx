import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, User, ChevronLeft, Share2 } from 'lucide-react';
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
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  
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
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nimble Needle',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nimbleneedle.ca/logo.png',
      },
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(' ').length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in animation-delay-200">
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
                  <div className="flex items-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-base">By {post.author.name}</span>
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
                    
                    {/* Author Info */}
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200/50 backdrop-blur-sm">
                      <h3 className="text-lg sm:text-xl font-playfair font-bold text-gray-900 mb-3 sm:mb-4">About the Author</h3>
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        {post.author.avatar && (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={50}
                            height={50}
                            className="rounded-full shadow-md sm:w-[60px] sm:h-[60px]"
                          />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{post.author.name}</h4>
                          {post.author.role && (
                            <p className="text-pink-600 font-medium text-sm sm:text-base">{post.author.role}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <BlogPostClient postUrl={`https://nimbleneedle.ca/blog/${post.slug}`} postTitle={post.title} />

                    {/* Back to Blog */}
                    <Link
                      href="/blog"
                      className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      Back to Blog
                    </Link>
                  </div>
                </aside>

                {/* Enhanced Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-sm">
                    
                    {/* Content Header */}
                    <div className="p-6 sm:p-8 border-b border-gray-200/50">
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    {/* Main Content */}
                    <div className="p-6 sm:p-8">
                      <div 
                        className="prose prose-base sm:prose-lg max-w-none
                          prose-headings:font-playfair prose-headings:text-gray-900
                          prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-6
                          prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:text-gray-800 prose-h2:border-b prose-h2:border-pink-200 prose-h2:pb-3
                          prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-3 sm:prose-h3:mb-4 prose-h3:text-gray-800
                          prose-h4:text-lg sm:prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-gray-800
                          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6 prose-p:text-base sm:prose-p:text-lg
                          prose-a:text-pink-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-pink-700 hover:prose-a:underline
                          prose-strong:text-gray-900 prose-strong:font-semibold
                          prose-em:text-gray-800 prose-em:font-medium
                          prose-ul:my-4 sm:prose-ul:my-6 prose-ul:space-y-2
                          prose-ol:my-4 sm:prose-ol:my-6 prose-ol:space-y-2
                          prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-base sm:prose-li:text-lg
                          prose-li:marker:text-pink-600
                          prose-blockquote:border-l-4 prose-blockquote:border-pink-500 prose-blockquote:bg-pink-50 prose-blockquote:p-4 sm:prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:my-6 sm:prose-blockquote:my-8
                          prose-blockquote:text-gray-800 prose-blockquote:font-medium prose-blockquote:text-base sm:prose-blockquote:text-lg
                          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-pink-600 prose-code:font-medium prose-code:text-sm sm:prose-code:text-base
                          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 sm:prose-pre:p-6 prose-pre:rounded-lg prose-pre:my-6 prose-pre:text-sm sm:prose-pre:text-base
                          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 sm:prose-img:my-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>

                    {/* Tags Section */}
                    <div className="p-6 sm:p-8 border-t border-gray-200/50 bg-gray-50/50">
                      <h3 className="text-xl sm:text-2xl font-playfair font-bold text-gray-900 mb-4 sm:mb-6">Tags</h3>
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
                      <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-6 sm:mb-8 text-center">
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
                              <h3 className="font-playfair font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
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