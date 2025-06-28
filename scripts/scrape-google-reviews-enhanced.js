const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

class EnhancedGoogleReviewsScraper {
  constructor(businessName, location) {
    this.businessName = businessName;
    this.location = location;
    this.reviews = [];
    this.businessInfo = {};
  }

  async scrapeReviews() {
    console.log(`🚀 Starting enhanced scraping for ${this.businessName} in ${this.location}`);
    
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
          '--disable-gpu',
          '--window-size=1280,720'
        ]
      });

      const page = await browser.newPage();
      
      // Set viewport and user agent
      await page.setViewport({ width: 1280, height: 720 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      // Try multiple approaches to find reviews
      let success = false;
      
      // Approach 1: Direct Google Maps search
      success = await this.tryGoogleMapsSearch(page);
      
      if (!success) {
        // Approach 2: Google search then navigate to Maps
        success = await this.tryGoogleSearchThenMaps(page);
      }

      if (!success) {
        // Approach 3: Try the specific Google business page
        success = await this.tryDirectBusinessPage(page);
      }

      // Save the data
      await this.saveData();

      console.log(`✅ Enhanced scraping completed! Found ${this.reviews.length} reviews`);

    } catch (error) {
      console.error('❌ Error during enhanced scraping:', error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async tryGoogleMapsSearch(page) {
    try {
      console.log('🗺️  Trying Google Maps direct search...');
      
      const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(this.businessName + ' ' + this.location)}`;
      await page.goto(mapsUrl, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Look for the business listing
      const businessElements = await page.$$('[data-result-index]');
      if (businessElements.length > 0) {
        console.log(`📍 Found ${businessElements.length} business results`);
        
        // Click on the first result (most relevant)
        await businessElements[0].click();
        await new Promise(resolve => setTimeout(resolve, 3000));

        return await this.extractFromCurrentPage(page);
      }
      
      return false;
    } catch (error) {
      console.error('❌ Google Maps search failed:', error);
      return false;
    }
  }

  async tryGoogleSearchThenMaps(page) {
    try {
      console.log('🔍 Trying Google search then Maps navigation...');
      
      const searchQuery = `${this.businessName} ${this.location} reviews`;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Look for the "Reviews" button or link
      const reviewsButton = await page.$('button:contains("Reviews"), [data-async-trigger="reviewDialog"], a[href*="maps.google.com"]');
      
      if (reviewsButton) {
        console.log('📋 Found reviews button, clicking...');
        await reviewsButton.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        return await this.extractFromCurrentPage(page);
      }

      // Try to find Google Maps link in the knowledge panel
      const mapsLink = await page.$('a[href*="maps.google.com"]');
      if (mapsLink) {
        console.log('🗺️  Found Maps link, navigating...');
        const href = await page.evaluate(el => el.href, mapsLink);
        await page.goto(href, { waitUntil: 'networkidle2' });
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        return await this.extractFromCurrentPage(page);
      }

      return false;
    } catch (error) {
      console.error('❌ Google search approach failed:', error);
      return false;
    }
  }

  async tryDirectBusinessPage(page) {
    try {
      console.log('🎯 Trying direct business page approach...');
      
      // Try known business info from scraped website
      const businessUrls = [
        'https://www.google.com/maps/place/Nimble+Needle+Tailoring/@45.4215,-75.6972,15z',
        'https://www.google.com/maps/search/141+Preston+St,+Ottawa,+ON/@45.4215,-75.6972,15z',
        'https://www.google.com/maps/search/Nimble+Needle+Tailoring+141+Preston+Street+Ottawa'
      ];

      for (const url of businessUrls) {
        try {
          console.log(`🔗 Trying URL: ${url}`);
          await page.goto(url, { waitUntil: 'networkidle2' });
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const success = await this.extractFromCurrentPage(page);
          if (success) return true;
        } catch (e) {
          console.log(`⚠️  URL failed: ${url}`);
          continue;
        }
      }

      return false;
    } catch (error) {
      console.error('❌ Direct business page approach failed:', error);
      return false;
    }
  }

  async extractFromCurrentPage(page) {
    try {
      console.log('📋 Extracting business information from current page...');

      // Extract business info
      await this.extractBusinessInfo(page);

      // Look for and click the reviews tab/section
      await this.navigateToReviews(page);

      // Scroll to load more reviews
      await this.scrollToLoadReviews(page);

      // Extract all reviews
      await this.extractReviews(page);

      return this.reviews.length > 0 || Object.keys(this.businessInfo).length > 0;
    } catch (error) {
      console.error('❌ Error extracting from current page:', error);
      return false;
    }
  }

  async extractBusinessInfo(page) {
    try {
      const businessInfo = await page.evaluate(() => {
        const info = {};
        
        // Try multiple selectors for business name
        const nameSelectors = [
          'h1[data-attrid="title"]',
          'h1.x3AX1-LfntMc-header-title-title',
          '.x3AX1-LfntMc-header-title-title',
          'h1.SPZz6b',
          '[data-attrid="title"]',
          '.qrShPb h1',
          '.x3AX1-LfntMc-header-title'
        ];
        
        for (const selector of nameSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent.trim()) {
            info.name = element.textContent.trim();
            break;
          }
        }

        // Try multiple selectors for rating
        const ratingSelectors = [
          '.ceNzKf',
          '[data-attrid*="rating"]',
          '.Aq14fc',
          '.MW4etd',
          '.fontDisplayLarge'
        ];
        
        for (const selector of ratingSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent.match(/\d+\.\d+/)) {
            info.overallRating = element.textContent.trim();
            break;
          }
        }

        // Try multiple selectors for review count
        const reviewCountSelectors = [
          '.RDApEe',
          '[data-attrid*="review"]',
          '.hqzQac',
          '.fontTitleSmall a'
        ];
        
        for (const selector of reviewCountSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent.match(/\d+.*review/i)) {
            info.totalReviews = element.textContent.trim();
            break;
          }
        }

        // Extract address
        const addressSelectors = [
          '[data-attrid*="address"]',
          '.LrzXr',
          '.rogA2c .fontBodyMedium'
        ];
        
        for (const selector of addressSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent.includes('Ottawa')) {
            info.address = element.textContent.trim();
            break;
          }
        }

        // Extract phone
        const phoneSelectors = [
          '[data-attrid*="phone"]',
          'a[href^="tel:"]',
          '.rogA2c .fontBodyMedium'
        ];
        
        for (const selector of phoneSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent.match(/\(\d{3}\)\s?\d{3}-\d{4}/)) {
            info.phone = element.textContent.trim();
            break;
          }
        }

        return info;
      });

      this.businessInfo = businessInfo;
      console.log('📋 Business info extracted:', businessInfo);

    } catch (error) {
      console.error('❌ Error extracting business info:', error);
    }
  }

  async navigateToReviews(page) {
    try {
      console.log('⭐ Looking for reviews section...');

      // Try to find and click the reviews tab
      const reviewsSelectors = [
        'button[data-value="Reviews"]',
        'button:contains("Reviews")',
        '[data-tab-index="1"]',
        '.hh2c6',
        '.Gpq6kf[data-tab-index="1"]',
        'button[jsaction*="review"]'
      ];

      for (const selector of reviewsSelectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            console.log(`📍 Found reviews button with selector: ${selector}`);
            await element.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            break;
          }
        } catch (e) {
          continue;
        }
      }

    } catch (error) {
      console.error('❌ Error navigating to reviews:', error);
    }
  }

  async scrollToLoadReviews(page) {
    console.log('📜 Scrolling to load all reviews...');
    
    try {
      // Try to find the reviews container with multiple selectors
      const containerSelectors = [
        '.m6QErb[data-local-attribute="d3bn"]',
        '.review-dialog-list',
        '.section-listbox',
        '.section-scrollbox',
        '[data-local-attribute="d3bn"]',
        '.m6QErb'
      ];

      let reviewsContainer = null;
      for (const selector of containerSelectors) {
        reviewsContainer = await page.$(selector);
        if (reviewsContainer) {
          console.log(`📦 Found reviews container: ${selector}`);
          break;
        }
      }
      
      if (reviewsContainer) {
        // Scroll within the reviews container
        let scrollAttempts = 0;
        const maxScrolls = 10;
        
        while (scrollAttempts < maxScrolls) {
          const previousHeight = await page.evaluate(el => el.scrollHeight, reviewsContainer);
          
          await page.evaluate(el => {
            el.scrollTo(0, el.scrollHeight);
          }, reviewsContainer);
          
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const currentHeight = await page.evaluate(el => el.scrollHeight, reviewsContainer);
          
          console.log(`📜 Scroll attempt ${scrollAttempts + 1}: height ${currentHeight}`);
          
          if (previousHeight === currentHeight) {
            break; // No more content to load
          }
          
          scrollAttempts++;
        }
      } else {
        console.log('📜 No specific container found, scrolling main page...');
        // Fallback: scroll the main page
        for (let i = 0; i < 5; i++) {
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      console.error('❌ Error scrolling:', error);
    }
  }

  async extractReviews(page) {
    console.log('⭐ Extracting reviews with enhanced selectors...');

    try {
      const reviews = await page.evaluate(() => {
        // Try multiple selectors for review elements
        const reviewSelectors = [
          '.jftiEf',
          '.WMbnJf',
          '.gws-localreviews__google-review',
          '[data-review-id]',
          '.section-review',
          '.ODSEW-ShBeI',
          '.jftiEf.fontBodyMedium'
        ];

        let reviewElements = [];
        for (const selector of reviewSelectors) {
          reviewElements = document.querySelectorAll(selector);
          if (reviewElements.length > 0) {
            console.log(`Found ${reviewElements.length} reviews with selector: ${selector}`);
            break;
          }
        }

        const extractedReviews = [];

        reviewElements.forEach((reviewEl, index) => {
          try {
            const review = {};

            // Reviewer name - try multiple selectors
            const nameSelectors = ['.d4r55', '.X43Kjb', '.TSUbDb', '.YBMVLf'];
            for (const selector of nameSelectors) {
              const nameElement = reviewEl.querySelector(selector);
              if (nameElement && nameElement.textContent.trim()) {
                review.reviewerName = nameElement.textContent.trim();
                break;
              }
            }

            // Rating - try multiple approaches
            const ratingSelectors = [
              '[role="img"][aria-label*="star"]',
              '.kvMYJc',
              '.Fam1ne',
              '.pf5lIe'
            ];
            
            for (const selector of ratingSelectors) {
              const ratingElement = reviewEl.querySelector(selector);
              if (ratingElement) {
                const ariaLabel = ratingElement.getAttribute('aria-label') || '';
                const ratingMatch = ariaLabel.match(/(\d+(?:\.\d+)?)/);
                if (ratingMatch) {
                  review.rating = parseFloat(ratingMatch[1]);
                  break;
                }
                
                // Try counting stars
                const stars = ratingElement.querySelectorAll('[style*="fill"], .hCCjke');
                if (stars.length > 0) {
                  review.rating = stars.length;
                  break;
                }
              }
            }

            // Date
            const dateSelectors = ['.rsqaWe', '.p2TkOb', '.fontCaption'];
            for (const selector of dateSelectors) {
              const dateElement = reviewEl.querySelector(selector);
              if (dateElement && dateElement.textContent.trim()) {
                review.date = dateElement.textContent.trim();
                break;
              }
            }

            // Review text
            const textSelectors = ['.MyEned', '.wiI7pd', '.fontBodyMedium span'];
            for (const selector of textSelectors) {
              const textElement = reviewEl.querySelector(selector);
              if (textElement && textElement.textContent.trim()) {
                review.reviewText = textElement.textContent.trim();
                break;
              }
            }

            // Reviewer avatar
            const avatarElement = reviewEl.querySelector('img[src*="googleusercontent"], img[src*="gstatic"]');
            if (avatarElement) {
              review.reviewerAvatar = avatarElement.src;
            }

            // Only add if we have essential data
            if (review.reviewerName || review.reviewText || review.rating) {
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
      console.log(`⭐ Enhanced extraction found ${reviews.length} reviews`);

    } catch (error) {
      console.error('❌ Error extracting reviews:', error);
    }
  }

  async saveData() {
    const outputDir = path.join(process.cwd(), 'scraped-data');
    await fs.ensureDir(outputDir);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `google-reviews-enhanced-${timestamp}.json`;
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
    console.log(`💾 Enhanced data saved to: ${filepath}`);

    // Save a summary file
    const summaryFilename = `google-reviews-enhanced-summary-${timestamp}.json`;
    const summaryFilepath = path.join(outputDir, summaryFilename);
    
    const summary = {
      scrapedAt: output.scrapedAt,
      businessName: output.businessName,
      businessInfo: output.businessInfo,
      summary: output.summary,
      sampleReviews: this.reviews.slice(0, 10) // First 10 reviews as sample
    };

    await fs.writeJSON(summaryFilepath, summary, { spaces: 2 });
    console.log(`📊 Enhanced summary saved to: ${summaryFilepath}`);
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

// Run the enhanced scraper
async function main() {
  const scraper = new EnhancedGoogleReviewsScraper('Nimble Needle Tailoring', 'Ottawa');
  await scraper.scrapeReviews();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = EnhancedGoogleReviewsScraper; 