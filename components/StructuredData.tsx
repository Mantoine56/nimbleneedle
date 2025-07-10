import { BlogPost } from '@/lib/blog-data';

interface StructuredDataProps {
  post: BlogPost;
}

export default function BlogPostStructuredData({ post }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://nimbleneedle.ca/blog/${post.slug}`,
    "url": `https://nimbleneedle.ca/blog/${post.slug}`,
    "name": post.title,
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://nimbleneedle.ca${post.featuredImage}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "image": post.author.avatar ? `https://nimbleneedle.ca${post.author.avatar}` : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nimble Needle Tailoring",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nimbleneedle.ca/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nimbleneedle.ca/blog/${post.slug}`
    },
    "wordCount": post.content.split(' ').length,
    "timeRequired": post.readTime,
    "keywords": post.tags,
    "articleSection": post.category,
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://nimbleneedle.ca/blog",
      "name": "Nimble Needle Tailoring Blog"
    },
    "about": {
      "@type": "Thing",
      "name": "Clothing Alterations and Tailoring"
    },
    "mentions": [
      {
        "@type": "Organization",
        "name": "Nimble Needle Tailoring",
        "url": "https://nimbleneedle.ca"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

// Component for blog listing page structured data
export function BlogListingStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://nimbleneedle.ca/blog",
    "url": "https://nimbleneedle.ca/blog",
    "name": "Nimble Needle Tailoring Blog",
    "description": "Expert tips, insights, and advice on clothing alterations, tailoring, and garment care from Ottawa's premier tailoring service.",
    "publisher": {
      "@type": "Organization",
      "name": "Nimble Needle Tailoring",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nimbleneedle.ca/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://nimbleneedle.ca/blog"
    },
    "about": {
      "@type": "Thing",
      "name": "Clothing Alterations and Tailoring"
    },
    "inLanguage": "en-CA"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

// Component for breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 