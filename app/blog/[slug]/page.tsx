import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag, User, ChevronLeft } from 'lucide-react';
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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);



  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SocialSidebar />
      {/* Hero Section with Featured Image */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4 animate-fade-in">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 animate-fade-in animation-delay-200">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Author Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6 observe-fade">
                    <h3 className="font-playfair font-bold mb-4">About the Author</h3>
                    <div className="flex items-center mb-3">
                      {post.author.avatar && (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="rounded-full mr-3"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{post.author.name}</p>
                        {post.author.role && (
                          <p className="text-sm text-gray-600">{post.author.role}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons - Client Component */}
                  <BlogPostClient postUrl={`https://nimbleneedle.ca/blog/${post.slug}`} postTitle={post.title} />

                  {/* Back to Blog */}
                  <Link
                    href="/blog"
                    className="flex items-center text-pink-600 hover:text-pink-700 font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Blog
                  </Link>
                </div>
              </aside>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-8 observe-fade">
                  <div 
                    className="prose prose-lg max-w-none
                      prose-headings:font-playfair prose-headings:text-gray-900
                      prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-gray-700 prose-p:leading-relaxed
                      prose-a:text-pink-600 prose-a:no-underline hover:prose-a:text-pink-700
                      prose-strong:text-gray-900
                      prose-ul:list-disc prose-ul:pl-6
                      prose-ol:list-decimal prose-ol:pl-6
                      prose-li:text-gray-700 prose-li:mb-2"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-playfair font-bold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-12 observe-fade">
                    <h2 className="text-3xl font-playfair font-bold mb-6">Related Posts</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map(relatedPost => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-playfair font-bold mb-2 group-hover:text-pink-600 transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
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
  );
}