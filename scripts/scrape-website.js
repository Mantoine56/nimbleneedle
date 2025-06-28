const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

class WebsiteScraper {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.visitedUrls = new Set();
    this.scrapedData = [];
    this.errors = [];
  }

  async scrapeWebsite() {
    console.log(`🚀 Starting to scrape ${this.baseUrl}`);
    
    try {
      // Start with the homepage
      await this.scrapePage(this.baseUrl);
      
      // Get all internal links from the homepage and scrape them
      const homepageLinks = await this.getInternalLinks(this.baseUrl);
      
      for (const link of homepageLinks) {
        if (!this.visitedUrls.has(link)) {
          await this.scrapePage(link);
          await this.delay(1000); // Be respectful with requests
        }
      }
      
      // Save the scraped data
      await this.saveData();
      
      console.log(`✅ Scraping completed! Found ${this.scrapedData.length} pages`);
      
    } catch (error) {
      console.error('❌ Error during scraping:', error);
      this.errors.push({ url: this.baseUrl, error: error.message });
    }
  }

  async scrapePage(url) {
    if (this.visitedUrls.has(url)) {
      return;
    }

    console.log(`📄 Scraping: ${url}`);
    this.visitedUrls.add(url);

    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      const pageData = {
        url: url,
        title: $('title').text().trim(),
        metaDescription: $('meta[name="description"]').attr('content') || '',
        metaKeywords: $('meta[name="keywords"]').attr('content') || '',
        canonicalUrl: $('link[rel="canonical"]').attr('href') || '',
        ogTitle: $('meta[property="og:title"]').attr('content') || '',
        ogDescription: $('meta[property="og:description"]').attr('content') || '',
        ogImage: $('meta[property="og:image"]').attr('content') || '',
        ogUrl: $('meta[property="og:url"]').attr('content') || '',
        twitterTitle: $('meta[name="twitter:title"]').attr('content') || '',
        twitterDescription: $('meta[name="twitter:description"]').attr('content') || '',
        twitterCard: $('meta[name="twitter:card"]').attr('content') || '',
        structuredData: [],
        headings: {
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: []
        },
        content: {
          bodyText: $('body').text().replace(/\s+/g, ' ').trim(),
          paragraphs: [],
          links: [],
          images: []
        },
        navigation: [],
        footer: $('footer').text().replace(/\s+/g, ' ').trim(),
        scrapedAt: new Date().toISOString()
      };

      // Extract headings
      for (let i = 1; i <= 6; i++) {
        $(`h${i}`).each((index, element) => {
          pageData.headings[`h${i}`].push({
            text: $(element).text().trim(),
            id: $(element).attr('id') || '',
            class: $(element).attr('class') || ''
          });
        });
      }

      // Extract paragraphs
      $('p').each((index, element) => {
        const text = $(element).text().trim();
        if (text) {
          pageData.content.paragraphs.push(text);
        }
      });

      // Extract links
      $('a[href]').each((index, element) => {
        const href = $(element).attr('href');
        const text = $(element).text().trim();
        if (href && text) {
          pageData.content.links.push({
            url: href,
            text: text,
            isExternal: href.startsWith('http') && !href.includes(new URL(this.baseUrl).hostname)
          });
        }
      });

      // Extract images
      $('img').each((index, element) => {
        const src = $(element).attr('src');
        const alt = $(element).attr('alt') || '';
        if (src) {
          pageData.content.images.push({
            src: src,
            alt: alt,
            title: $(element).attr('title') || ''
          });
        }
      });

      // Extract navigation elements
      $('nav a, .nav a, .navbar a, .menu a').each((index, element) => {
        const href = $(element).attr('href');
        const text = $(element).text().trim();
        if (href && text) {
          pageData.navigation.push({
            url: href,
            text: text
          });
        }
      });

      // Extract structured data (JSON-LD)
      $('script[type="application/ld+json"]').each((index, element) => {
        try {
          const structuredData = JSON.parse($(element).html());
          pageData.structuredData.push(structuredData);
        } catch (e) {
          console.warn(`⚠️  Failed to parse structured data on ${url}`);
        }
      });

      this.scrapedData.push(pageData);

    } catch (error) {
      console.error(`❌ Error scraping ${url}:`, error.message);
      this.errors.push({ url, error: error.message });
    }
  }

  async getInternalLinks(url) {
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const links = new Set();
      const baseUrlObj = new URL(this.baseUrl);

      $('a[href]').each((index, element) => {
        let href = $(element).attr('href');
        
        if (href) {
          // Convert relative URLs to absolute
          if (href.startsWith('/')) {
            href = baseUrlObj.origin + href;
          } else if (href.startsWith('./')) {
            href = baseUrlObj.origin + href.substring(1);
          } else if (!href.startsWith('http')) {
            href = baseUrlObj.origin + '/' + href;
          }

          // Only include internal links
          if (href.includes(baseUrlObj.hostname) && 
              !href.includes('#') && 
              !href.includes('mailto:') && 
              !href.includes('tel:') &&
              !href.endsWith('.pdf') &&
              !href.endsWith('.jpg') &&
              !href.endsWith('.png') &&
              !href.endsWith('.gif')) {
            links.add(href);
          }
        }
      });

      return Array.from(links);
    } catch (error) {
      console.error(`❌ Error getting links from ${url}:`, error.message);
      return [];
    }
  }

  async saveData() {
    const outputDir = path.join(process.cwd(), 'scraped-data');
    await fs.ensureDir(outputDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `nibbleneedle-scrape-${timestamp}.json`;
    const filepath = path.join(outputDir, filename);

    const output = {
      scrapedAt: new Date().toISOString(),
      baseUrl: this.baseUrl,
      totalPages: this.scrapedData.length,
      totalErrors: this.errors.length,
      pages: this.scrapedData,
      errors: this.errors,
      summary: {
        totalHeadings: this.scrapedData.reduce((sum, page) => {
          return sum + Object.values(page.headings).reduce((hSum, hArray) => hSum + hArray.length, 0);
        }, 0),
        totalParagraphs: this.scrapedData.reduce((sum, page) => sum + page.content.paragraphs.length, 0),
        totalLinks: this.scrapedData.reduce((sum, page) => sum + page.content.links.length, 0),
        totalImages: this.scrapedData.reduce((sum, page) => sum + page.content.images.length, 0)
      }
    };

    await fs.writeJSON(filepath, output, { spaces: 2 });
    console.log(`💾 Data saved to: ${filepath}`);

    // Also save a summary file
    const summaryFilename = `nibbleneedle-summary-${timestamp}.json`;
    const summaryFilepath = path.join(outputDir, summaryFilename);
    
    const summary = {
      scrapedAt: output.scrapedAt,
      baseUrl: output.baseUrl,
      summary: output.summary,
      pageUrls: this.scrapedData.map(page => page.url),
      errors: this.errors
    };

    await fs.writeJSON(summaryFilepath, summary, { spaces: 2 });
    console.log(`📊 Summary saved to: ${summaryFilepath}`);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the scraper
async function main() {
  const scraper = new WebsiteScraper('https://nimbleneedle.ca');
  await scraper.scrapeWebsite();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = WebsiteScraper; 