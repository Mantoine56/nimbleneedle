const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

class GoogleReviewsScraper {
  constructor(businessName, location) {
    this.businessName = businessName;
    this.location = location;
    this.reviews = [];
    this.businessInfo = {};
  }

  async scrapeReviews() {
    console.log(`🚀 Starting to scrape Google Reviews for ${this.businessName} in ${this.location}`);
    
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();
      
      // Set viewport and user agent
      await page.setViewport({ width: 1280, height: 720 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      // Search for the business
      const searchQuery = `${this.businessName} ${this.location} reviews`;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      console.log(`🔍 Searching: ${searchQuery}`);
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Look for the "View all Google reviews" link or similar
      try {
        await page.waitForSelector('[data-async-trigger="reviewDialog"]', { timeout: 10000 });
        await page.click('[data-async-trigger="reviewDialog"]');
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.log('⚠️  Trying alternative method to access reviews...');
        
        // Try to find and click on the business listing
        try {
          const businessLink = await page.$('a[href*="maps.google.com"]');
          if (businessLink) {
            await businessLink.click();
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        } catch (e) {
          console.log('⚠️  Could not find direct business link, trying Google Maps search...');
          
          // Go directly to Google Maps
          const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
          await page.goto(mapsUrl, { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }

      // Extract business information
      await this.extractBusinessInfo(page);

      // Find and click on reviews section
      try {
        const reviewsButton = await page.$('button[data-value="Reviews"], button:contains("Reviews"), [data-tab-index="1"]');
        if (reviewsButton) {
          await reviewsButton.click();
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.log('⚠️  Could not find reviews button, proceeding with current page...');
      }

      // Scroll to load more reviews
      await this.scrollToLoadReviews(page);

      // Extract all reviews
      await this.extractReviews(page);

      // Save the data
      await this.saveData();

      console.log(`✅ Scraping completed! Found ${this.reviews.length} reviews`);

    } catch (error) {
      console.error('❌ Error during scraping:', error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async extractBusinessInfo(page) {
    try {
      console.log('📋 Extracting business information...');

      const businessInfo = await page.evaluate(() => {
        const info = {};
        
        // Business name
        const nameElement = document.querySelector('h1[data-attrid="title"]') || 
                           document.querySelector('h1') ||
                           document.querySelector('[data-attrid="title"]');
        if (nameElement) {
          info.name = nameElement.textContent.trim();
        }

        // Rating
        const ratingElement = document.querySelector('[data-attrid="kc:/collection/knowledge_panels/local_reviewable:star_score"]') ||
                             document.querySelector('.Aq14fc') ||
                             document.querySelector('[data-attrid*="rating"]');
        if (ratingElement) {
          info.overallRating = ratingElement.textContent.trim();
        }

        // Total reviews count
        const reviewCountElement = document.querySelector('[data-attrid="kc:/collection/knowledge_panels/local_reviewable:review_count"]') ||
                                  document.querySelector('.hqzQac') ||
                                  document.querySelector('[data-attrid*="review"]');
        if (reviewCountElement) {
          info.totalReviews = reviewCountElement.textContent.trim();
        }

        // Address
        const addressElement = document.querySelector('[data-attrid*="address"]') ||
                              document.querySelector('.LrzXr');
        if (addressElement) {
          info.address = addressElement.textContent.trim();
        }

        // Phone
        const phoneElement = document.querySelector('[data-attrid*="phone"]') ||
                            document.querySelector('.LrzXr');
        if (phoneElement) {
          info.phone = phoneElement.textContent.trim();
        }

        // Website
        const websiteElement = document.querySelector('[data-attrid*="website"]') ||
                              document.querySelector('a[href*="http"]');
        if (websiteElement) {
          info.website = websiteElement.href || websiteElement.textContent.trim();
        }

        // Hours
        const hoursElements = document.querySelectorAll('[data-attrid*="hours"]');
        if (hoursElements.length > 0) {
          info.hours = Array.from(hoursElements).map(el => el.textContent.trim());
        }

        return info;
      });

      this.businessInfo = businessInfo;
      console.log('📋 Business info extracted:', businessInfo);

    } catch (error) {
      console.error('❌ Error extracting business info:', error);
    }
  }

  async scrollToLoadReviews(page) {
    console.log('📜 Scrolling to load all reviews...');
    
    try {
      // Find the reviews container
      const reviewsContainer = await page.$('.review-dialog-list, .section-listbox, .section-scrollbox');
      
      if (reviewsContainer) {
        // Scroll within the reviews container
        let previousHeight = 0;
        let currentHeight = await page.evaluate(el => el.scrollHeight, reviewsContainer);
        
        while (previousHeight !== currentHeight) {
          previousHeight = currentHeight;
          
          await page.evaluate(el => {
            el.scrollTo(0, el.scrollHeight);
          }, reviewsContainer);
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          currentHeight = await page.evaluate(el => el.scrollHeight, reviewsContainer);
          
          console.log(`📜 Scrolled to load more reviews... (height: ${currentHeight})`);
        }
      } else {
        // Fallback: scroll the main page
        let previousHeight = 0;
        let currentHeight = await page.evaluate(() => document.body.scrollHeight);
        
        while (previousHeight !== currentHeight) {
          previousHeight = currentHeight;
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await new Promise(resolve => setTimeout(resolve, 2000));
          currentHeight = await page.evaluate(() => document.body.scrollHeight);
        }
      }
    } catch (error) {
      console.error('❌ Error scrolling:', error);
    }
  }

  async extractReviews(page) {
    console.log('⭐ Extracting reviews...');

    try {
      const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll([
          '.gws-localreviews__google-review',
          '.review-dialog-list .gws-localreviews__google-review',
          '[data-review-id]',
          '.section-review',
          '.ODSEW-ShBeI'
        ].join(', '));

        const extractedReviews = [];

        reviewElements.forEach((reviewEl, index) => {
          try {
            const review = {};

            // Reviewer name
            const nameElement = reviewEl.querySelector('.TSUbDb, .X43Kjb, .d4r55') ||
                               reviewEl.querySelector('[data-attrid*="author"]');
            if (nameElement) {
              review.reviewerName = nameElement.textContent.trim();
            }

            // Rating
            const ratingElement = reviewEl.querySelector('.Fam1ne, .kvMYJc') ||
                                 reviewEl.querySelector('[role="img"][aria-label*="star"]');
            if (ratingElement) {
              const ariaLabel = ratingElement.getAttribute('aria-label') || '';
              const ratingMatch = ariaLabel.match(/(\d+(?:\.\d+)?)/);
              if (ratingMatch) {
                review.rating = parseFloat(ratingMatch[1]);
              } else {
                // Try to count filled stars
                const filledStars = ratingElement.querySelectorAll('[style*="fill"]').length;
                if (filledStars > 0) {
                  review.rating = filledStars;
                }
              }
            }

            // Date
            const dateElement = reviewEl.querySelector('.rsqaWe, .p2TkOb') ||
                               reviewEl.querySelector('[data-attrid*="date"]');
            if (dateElement) {
              review.date = dateElement.textContent.trim();
            }

            // Review text
            const textElement = reviewEl.querySelector('.MyEned, .wiI7pd') ||
                               reviewEl.querySelector('.review-text');
            if (textElement) {
              review.reviewText = textElement.textContent.trim();
            }

            // Reviewer profile image
            const avatarElement = reviewEl.querySelector('img[src*="googleusercontent"]');
            if (avatarElement) {
              review.reviewerAvatar = avatarElement.src;
            }

            // Only add if we have at least name and some content
            if (review.reviewerName && (review.reviewText || review.rating)) {
              review.extractedAt = new Date().toISOString();
              review.reviewIndex = index + 1;
              extractedReviews.push(review);
            }

          } catch (error) {
            console.error('Error extracting individual review:', error);
          }
        });

        return extractedReviews;
      });

      this.reviews = reviews;
      console.log(`⭐ Extracted ${reviews.length} reviews`);

    } catch (error) {
      console.error('❌ Error extracting reviews:', error);
    }
  }

  async saveData() {
    const outputDir = path.join(process.cwd(), 'scraped-data');
    await fs.ensureDir(outputDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `google-reviews-nimble-needle-${timestamp}.json`;
    const filepath = path.join(outputDir, filename);

    const output = {
      scrapedAt: new Date().toISOString(),
      businessName: this.businessName,
      location: this.location,
      businessInfo: this.businessInfo,
      totalReviewsFound: this.reviews.length,
      reviews: this.reviews,
      summary: {
        averageRating: this.reviews.length > 0 ? 
          (this.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / this.reviews.length).toFixed(1) : 0,
        ratingDistribution: this.getRatingDistribution(),
        totalReviews: this.reviews.length,
        reviewsWithText: this.reviews.filter(r => r.reviewText && r.reviewText.length > 0).length
      }
    };

    await fs.writeJSON(filepath, output, { spaces: 2 });
    console.log(`💾 Data saved to: ${filepath}`);

    // Save a summary file
    const summaryFilename = `google-reviews-summary-${timestamp}.json`;
    const summaryFilepath = path.join(outputDir, summaryFilename);
    
    const summary = {
      scrapedAt: output.scrapedAt,
      businessName: output.businessName,
      businessInfo: output.businessInfo,
      summary: output.summary,
      sampleReviews: this.reviews.slice(0, 5) // First 5 reviews as sample
    };

    await fs.writeJSON(summaryFilepath, summary, { spaces: 2 });
    console.log(`📊 Summary saved to: ${summaryFilepath}`);
  }

  getRatingDistribution() {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    this.reviews.forEach(review => {
      if (review.rating && review.rating >= 1 && review.rating <= 5) {
        const roundedRating = Math.round(review.rating);
        distribution[roundedRating]++;
      }
    });

    return distribution;
  }
}

// Run the scraper
async function main() {
  const scraper = new GoogleReviewsScraper('Nimble Needle', 'Ottawa');
  await scraper.scrapeReviews();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = GoogleReviewsScraper; 