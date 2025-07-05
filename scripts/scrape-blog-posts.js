const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

class BlogScraper {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.blogUrl = `${baseUrl}/blog/`;
    this.posts = [];
    this.errors = [];
  }

  async scrapeBlog() {
    console.log(`🚀 Starting to scrape blog posts from ${this.blogUrl}`);
    
    try {
      // First, get the blog listing page
      const blogListingHtml = await this.fetchPage(this.blogUrl);
      if (!blogListingHtml) {
        console.error('❌ Could not fetch blog listing page');
        return;
      }

      // Extract blog post URLs from the listing
      const postUrls = await this.extractBlogPostUrls(blogListingHtml);
      console.log(`📋 Found ${postUrls.length} blog posts to scrape`);

      // Scrape each blog post
      for (const postUrl of postUrls) {
        await this.scrapeBlogPost(postUrl);
        await this.delay(1000); // Be respectful with requests
      }

      // Save the scraped data
      await this.saveData();
      
      console.log(`✅ Blog scraping completed! Found ${this.posts.length} posts`);
      
    } catch (error) {
      console.error('❌ Error during blog scraping:', error);
      this.errors.push({ url: this.blogUrl, error: error.message });
    }
  }

  async fetchPage(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching ${url}:`, error.message);
      this.errors.push({ url, error: error.message });
      return null;
    }
  }

  async extractBlogPostUrls(html) {
    const $ = cheerio.load(html);
    const postUrls = [];

    // Common WordPress blog post selectors
    const selectors = [
      'article h2 a',
      'article h3 a',
      'h3 a', // Added this for nimbleneedle.ca
      '.post-title a',
      '.entry-title a',
      'h2.entry-title a',
      'h1.entry-title a',
      '.blog-post a',
      'article a[rel="bookmark"]'
    ];

    for (const selector of selectors) {
      $(selector).each((index, element) => {
        const href = $(element).attr('href');
        if (href && !postUrls.includes(href)) {
          const fullUrl = href.startsWith('http') ? href : new URL(href, this.baseUrl).href;
          // More flexible URL matching for nimbleneedle.ca
          if (fullUrl.includes('/blog/') || fullUrl.includes('/post/') || 
              (fullUrl.includes(this.baseUrl) && fullUrl !== this.baseUrl && fullUrl !== this.blogUrl)) {
            postUrls.push(fullUrl);
          }
        }
      });
    }

    // Also check for pagination links
    const paginationSelectors = ['.pagination a', '.nav-links a', '.page-numbers a'];
    for (const selector of paginationSelectors) {
      $(selector).each((index, element) => {
        const href = $(element).attr('href');
        if (href && href.includes('/page/')) {
          console.log(`📄 Found pagination link: ${href}`);
          // TODO: Handle pagination recursively
        }
      });
    }

    // Debug: log what we found
    console.log(`🔍 Debug: Found ${postUrls.length} potential blog post URLs:`);
    postUrls.forEach(url => console.log(`   - ${url}`));

    return [...new Set(postUrls)]; // Remove duplicates
  }

  async scrapeBlogPost(url) {
    console.log(`📝 Scraping blog post: ${url}`);
    
    const html = await this.fetchPage(url);
    if (!html) return;

    const $ = cheerio.load(html);
    
    // Extract post data
    const post = {
      url,
      title: this.extractTitle($),
      content: this.extractContent($),
      excerpt: this.extractExcerpt($),
      author: this.extractAuthor($),
      date: this.extractDate($),
      categories: this.extractCategories($),
      tags: this.extractTags($),
      featuredImage: this.extractFeaturedImage($),
      images: this.extractImages($),
      metaDescription: $('meta[name="description"]').attr('content') || '',
      slug: this.extractSlug(url),
      scrapedAt: new Date().toISOString()
    };

    this.posts.push(post);
  }

  extractTitle($) {
    const selectors = [
      'h1.entry-title',
      'h1.post-title',
      'article h1',
      '.blog-post h1',
      'h2.entry-title',
      'title'
    ];

    for (const selector of selectors) {
      const title = $(selector).first().text().trim();
      if (title && !title.includes('|') && !title.includes('-')) {
        return title;
      } else if (title) {
        // Clean up title that includes site name
        return title.split(/[|\-]/)[0].trim();
      }
    }
    return '';
  }

  extractContent($) {
    const selectors = [
      '.entry-content',
      '.post-content',
      'article .content',
      '.blog-content',
      'main article'
    ];

    for (const selector of selectors) {
      const content = $(selector).first();
      if (content.length) {
        // Remove script tags and other unwanted elements
        content.find('script, style, .sharedaddy, .related-posts').remove();
        return content.html() || '';
      }
    }
    return '';
  }

  extractExcerpt($) {
    const selectors = [
      '.entry-summary',
      '.post-excerpt',
      'meta[name="description"]',
      'meta[property="og:description"]'
    ];

    for (const selector of selectors) {
      if (selector.startsWith('meta')) {
        const excerpt = $(selector).attr('content');
        if (excerpt) return excerpt.trim();
      } else {
        const excerpt = $(selector).first().text().trim();
        if (excerpt) return excerpt;
      }
    }

    // If no excerpt found, create one from content
    const content = this.extractContent($);
    const textContent = $('<div>').html(content).text();
    return textContent.substring(0, 200).trim() + '...';
  }

  extractAuthor($) {
    const selectors = [
      '.author-name',
      '.by-author',
      '.entry-author',
      'span.author',
      'meta[name="author"]'
    ];

    for (const selector of selectors) {
      if (selector.startsWith('meta')) {
        const author = $(selector).attr('content');
        if (author) return author.trim();
      } else {
        const author = $(selector).first().text().trim();
        if (author) return author.replace(/^by\s+/i, '');
      }
    }
    return 'Nimble Needle Team';
  }

  extractDate($) {
    const selectors = [
      'time[datetime]',
      '.entry-date',
      '.post-date',
      '.published',
      'meta[property="article:published_time"]'
    ];

    for (const selector of selectors) {
      if (selector === 'time[datetime]') {
        const datetime = $('time[datetime]').first().attr('datetime');
        if (datetime) return datetime;
      } else if (selector.startsWith('meta')) {
        const date = $(selector).attr('content');
        if (date) return date;
      } else {
        const dateText = $(selector).first().text().trim();
        if (dateText) {
          // Try to parse the date
          const parsed = new Date(dateText);
          if (!isNaN(parsed.getTime())) {
            return parsed.toISOString();
          }
        }
      }
    }
    return new Date().toISOString();
  }

  extractCategories($) {
    const categories = [];
    const selectors = [
      '.category-links a',
      '.post-categories a',
      '.entry-categories a',
      'a[rel="category tag"]'
    ];

    for (const selector of selectors) {
      $(selector).each((index, element) => {
        const category = $(element).text().trim();
        if (category && !categories.includes(category)) {
          categories.push(category);
        }
      });
    }
    return categories;
  }

  extractTags($) {
    const tags = [];
    const selectors = [
      '.tag-links a',
      '.post-tags a',
      '.entry-tags a',
      'a[rel="tag"]'
    ];

    for (const selector of selectors) {
      $(selector).each((index, element) => {
        const tag = $(element).text().trim();
        if (tag && !tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    return tags;
  }

  extractFeaturedImage($) {
    const selectors = [
      'meta[property="og:image"]',
      '.post-thumbnail img',
      '.featured-image img',
      'article img:first',
      '.wp-post-image'
    ];

    for (const selector of selectors) {
      if (selector.startsWith('meta')) {
        const image = $(selector).attr('content');
        if (image) return image;
      } else {
        const img = $(selector).first();
        const src = img.attr('src') || img.attr('data-src');
        if (src) {
          return src.startsWith('http') ? src : new URL(src, this.baseUrl).href;
        }
      }
    }
    return '';
  }

  extractImages($) {
    const images = [];
    $('.entry-content img, .post-content img, article img').each((index, element) => {
      const src = $(element).attr('src') || $(element).attr('data-src');
      const alt = $(element).attr('alt') || '';
      if (src && !images.some(img => img.src === src)) {
        images.push({
          src: src.startsWith('http') ? src : new URL(src, this.baseUrl).href,
          alt
        });
      }
    });
    return images;
  }

  extractSlug(url) {
    const urlParts = url.split('/').filter(part => part);
    return urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveData() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const outputDir = path.join(__dirname, '..', 'scraped-data');
    
    await fs.ensureDir(outputDir);

    // Save full data
    const fullDataPath = path.join(outputDir, `blog-posts-${timestamp}.json`);
    await fs.writeJson(fullDataPath, {
      scrapedAt: timestamp,
      baseUrl: this.baseUrl,
      posts: this.posts,
      errors: this.errors
    }, { spaces: 2 });

    // Save summary
    const summaryPath = path.join(outputDir, `blog-posts-summary-${timestamp}.json`);
    await fs.writeJson(summaryPath, {
      scrapedAt: timestamp,
      baseUrl: this.baseUrl,
      totalPosts: this.posts.length,
      posts: this.posts.map(post => ({
        title: post.title,
        url: post.url,
        slug: post.slug,
        date: post.date,
        author: post.author,
        categories: post.categories,
        excerpt: post.excerpt
      })),
      errors: this.errors
    }, { spaces: 2 });

    console.log(`💾 Data saved to:`);
    console.log(`   - ${fullDataPath}`);
    console.log(`   - ${summaryPath}`);
  }
}

// Run the scraper
async function main() {
  const scraper = new BlogScraper('https://nimbleneedle.ca');
  await scraper.scrapeBlog();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = BlogScraper;