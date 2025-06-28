# Web Scraping Scripts

This directory contains two powerful scraping scripts for gathering data about Nimble Needle.

## Scripts Overview

### 1. Website Scraper (`scrape-website.js`)
Scrapes all content from nibbleneedle.ca including:
- All page content and text
- H1-H6 headings with IDs and classes
- Meta tags (description, keywords, canonical)
- Open Graph and Twitter Card data
- Structured data (JSON-LD)
- Navigation elements
- Images with alt text
- Internal and external links
- SEO-related information

### 2. Google Reviews Scraper (`scrape-google-reviews.js`)
Scrapes Google Reviews for Nimble Needle in Ottawa including:
- Business information (rating, address, phone, hours)
- Individual reviews with ratings and text
- Reviewer names and avatars
- Review dates
- Rating distribution analysis
- Summary statistics

## Prerequisites

Before running the scripts, install the required dependencies:

```bash
npm install
```

## Usage

### Running the Website Scraper

```bash
npm run scrape:website
```

Or directly:
```bash
node scripts/scrape-website.js
```

### Running the Google Reviews Scraper

```bash
npm run scrape:reviews
```

Or directly:
```bash
node scripts/scrape-google-reviews.js
```

## Output

Both scripts save their data to the `scraped-data/` directory with timestamped filenames:

- **Website Scraper**: Creates `nibbleneedle-scrape-[timestamp].json` and `nibbleneedle-summary-[timestamp].json`
- **Reviews Scraper**: Creates `google-reviews-nimble-needle-[timestamp].json` and `google-reviews-summary-[timestamp].json`

## Data Structure

### Website Scraper Output
```json
{
  "scrapedAt": "2024-01-01T00:00:00.000Z",
  "baseUrl": "https://nibbleneedle.ca",
  "totalPages": 10,
  "pages": [
    {
      "url": "https://nibbleneedle.ca/",
      "title": "Page Title",
      "metaDescription": "Meta description",
      "headings": {
        "h1": [{"text": "Main Heading", "id": "", "class": ""}],
        "h2": [{"text": "Sub Heading", "id": "", "class": ""}]
      },
      "content": {
        "bodyText": "Full page text...",
        "paragraphs": ["Paragraph 1", "Paragraph 2"],
        "links": [{"url": "/page", "text": "Link Text", "isExternal": false}],
        "images": [{"src": "/image.jpg", "alt": "Alt text"}]
      }
    }
  ]
}
```

### Reviews Scraper Output
```json
{
  "scrapedAt": "2024-01-01T00:00:00.000Z",
  "businessName": "Nimble Needle",
  "businessInfo": {
    "name": "Nimble Needle",
    "overallRating": "4.5",
    "totalReviews": "150 reviews",
    "address": "123 Main St, Ottawa, ON"
  },
  "reviews": [
    {
      "reviewerName": "John Doe",
      "rating": 5,
      "date": "2 weeks ago",
      "reviewText": "Great service!",
      "reviewerAvatar": "https://...",
      "extractedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "summary": {
    "averageRating": "4.8",
    "ratingDistribution": {"5": 120, "4": 20, "3": 5, "2": 3, "1": 2},
    "totalReviews": 150,
    "reviewsWithText": 145
  }
}
```

## Important Notes

### Rate Limiting & Respectful Scraping
- The website scraper includes 1-second delays between requests
- Both scripts use realistic user agents
- Please be respectful and don't run the scripts too frequently

### Google Reviews Limitations
- Google frequently changes their HTML structure, so the reviews scraper may need updates
- The script tries multiple fallback methods to find reviews
- Some reviews might be missed due to dynamic loading
- Running the script too frequently may trigger bot detection

### Legal Considerations
- Ensure you comply with the website's terms of service
- Google's terms of service restrict automated access
- Use the scraped data responsibly and in accordance with applicable laws

## Troubleshooting

### Common Issues

1. **No reviews found**: The Google Reviews scraper uses multiple fallback methods, but Google's structure changes frequently. The business might need to be found manually.

2. **Puppeteer crashes**: Try running with more memory or in non-headless mode for debugging:
   ```bash
   # Edit the script to set headless: false for debugging
   ```

3. **Network timeouts**: Increase timeout values in the scripts if you have a slow connection.

4. **Empty scraped data**: Check that the website is accessible and hasn't changed its structure significantly.

## Customization

Both scripts are modular and can be easily customized:
- Modify selectors in the reviews scraper for different review platforms
- Adjust the website scraper to focus on specific content types
- Change output formats or add additional data extraction
- Modify rate limiting and request behavior

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify the target websites are accessible
3. Check if the HTML structure has changed
4. Update selectors in the scripts if needed 