#!/usr/bin/env node
/**
 * Script to extract blog content from Word documents (.docx)
 * 
 * This script reads a Word document and extracts:
 * - Title (first heading or first paragraph)
 * - Content (converted to HTML)
 * - Images (saved to public/blogs/ folder)
 * 
 * Usage: node scripts/extract-blog-from-docx.js <path-to-docx-file>
 * 
 * Dependencies: npm install mammoth
 */

const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Configuration for output directories
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'blogs');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

/**
 * Ensures the output directories exist
 */
function ensureDirectoriesExist() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log(`Created directory: ${IMAGES_DIR}`);
  }
}

/**
 * Generates a URL-friendly slug from a title
 * @param {string} title - The title to convert to a slug
 * @returns {string} - URL-friendly slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
}

/**
 * Extracts content from a Word document
 * @param {string} docxPath - Path to the Word document
 * @returns {Promise<object>} - Extracted blog data
 */
async function extractBlogFromDocx(docxPath) {
  console.log(`\n📄 Processing: ${docxPath}\n`);
  
  // Verify file exists
  if (!fs.existsSync(docxPath)) {
    throw new Error(`File not found: ${docxPath}`);
  }

  // Ensure output directories exist
  ensureDirectoriesExist();

  // Track extracted images
  const extractedImages = [];
  let imageIndex = 0;

  // Configure mammoth to extract images
  const options = {
    convertImage: mammoth.images.imgElement(async function(image) {
      // Generate a unique filename for each image
      const extension = image.contentType.split('/')[1] || 'png';
      const imageName = `blog-image-${Date.now()}-${imageIndex++}.${extension}`;
      const imagePath = path.join(IMAGES_DIR, imageName);
      
      // Read image buffer and save to file
      const imageBuffer = await image.read();
      fs.writeFileSync(imagePath, imageBuffer);
      
      const publicPath = `/blogs/images/${imageName}`;
      extractedImages.push({
        name: imageName,
        path: publicPath,
        contentType: image.contentType
      });
      
      console.log(`  📸 Extracted image: ${imageName}`);
      
      return {
        src: publicPath
      };
    })
  };

  // Convert document to HTML
  const result = await mammoth.convertToHtml({ path: docxPath }, options);
  
  // Log any conversion warnings
  if (result.messages.length > 0) {
    console.log('\n⚠️  Conversion warnings:');
    result.messages.forEach(msg => console.log(`   - ${msg.message}`));
  }

  // Extract the HTML content
  let htmlContent = result.value;

  // Parse out the title (first h1, h2, or strong text)
  let title = '';
  const titleMatch = htmlContent.match(/<h[12][^>]*>(.*?)<\/h[12]>/i) || 
                     htmlContent.match(/<p><strong>(.*?)<\/strong><\/p>/i);
  
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
  }

  // Clean up the HTML content
  htmlContent = cleanHtmlContent(htmlContent);

  // Generate a slug from the title
  const slug = generateSlug(title || path.basename(docxPath, '.docx'));

  // Calculate estimated read time (average 200 words per minute)
  const wordCount = htmlContent.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Prepare the blog data object
  const blogData = {
    title: title || 'Untitled Blog Post',
    slug: slug,
    excerpt: extractExcerpt(htmlContent),
    content: htmlContent,
    wordCount: wordCount,
    readTime: `${readTime} min read`,
    images: extractedImages,
    featuredImage: extractedImages.length > 0 ? extractedImages[0].path : null
  };

  // Output the results
  console.log('\n✅ Extraction complete!\n');
  console.log('📝 Blog Data Summary:');
  console.log(`   Title: ${blogData.title}`);
  console.log(`   Slug: ${blogData.slug}`);
  console.log(`   Word Count: ${blogData.wordCount}`);
  console.log(`   Read Time: ${blogData.readTime}`);
  console.log(`   Images Extracted: ${extractedImages.length}`);
  console.log(`   Featured Image: ${blogData.featuredImage || 'None'}`);

  // Save the extracted data to a JSON file for reference
  const outputJsonPath = path.join(OUTPUT_DIR, `${slug}-extracted.json`);
  fs.writeFileSync(outputJsonPath, JSON.stringify(blogData, null, 2));
  console.log(`\n💾 Saved extraction data to: ${outputJsonPath}`);

  // Also output the raw HTML content for review
  const outputHtmlPath = path.join(OUTPUT_DIR, `${slug}-content.html`);
  fs.writeFileSync(outputHtmlPath, htmlContent);
  console.log(`📄 Saved HTML content to: ${outputHtmlPath}`);

  return blogData;
}

/**
 * Cleans up HTML content from Word conversion
 * @param {string} html - Raw HTML from mammoth conversion
 * @returns {string} - Cleaned HTML
 */
function cleanHtmlContent(html) {
  return html
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    // Clean up excessive whitespace
    .replace(/\s+/g, ' ')
    // Add proper spacing between elements
    .replace(/<\/p>\s*<p>/g, '</p>\n\n<p>')
    .replace(/<\/h([1-6])>\s*<p>/g, '</h$1>\n\n<p>')
    .replace(/<\/p>\s*<h([1-6])>/g, '</p>\n\n<h$1>')
    .replace(/<\/ul>\s*<p>/g, '</ul>\n\n<p>')
    .replace(/<\/ol>\s*<p>/g, '</ol>\n\n<p>')
    // Trim the result
    .trim();
}

/**
 * Extracts an excerpt from HTML content
 * @param {string} html - HTML content
 * @param {number} maxLength - Maximum excerpt length
 * @returns {string} - Excerpt text
 */
function extractExcerpt(html, maxLength = 200) {
  // Strip HTML tags and get plain text
  const plainText = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Truncate to maxLength, ending at a word boundary
  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generates a blog post entry template for blog-data.ts
 * @param {object} blogData - Extracted blog data
 * @returns {string} - TypeScript code for the blog entry
 */
function generateBlogEntry(blogData) {
  const today = new Date().toISOString().split('T')[0];
  
  return `
  {
    id: "NEW_ID", // TODO: Update with next available ID
    slug: "${blogData.slug}",
    title: "${blogData.title.replace(/"/g, '\\"')}",
    excerpt: "${blogData.excerpt.replace(/"/g, '\\"')}",
    content: \`
${blogData.content}
    \`,
    author: {
      name: "Nimble Needle Team"
    },
    date: "${today}",
    readTime: "${blogData.readTime}",
    category: "Alterations", // TODO: Update category
    tags: ["tailoring", "alterations", "Ottawa"], // TODO: Update tags
    featuredImage: "${blogData.featuredImage || '/services/alterations.webp'}",
    featuredImageAlt: "${blogData.title.replace(/"/g, '\\"')}",
    published: true
  }`;
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📚 Word Document to Blog Extractor
===================================

Usage: node scripts/extract-blog-from-docx.js <path-to-docx-file>

Example:
  node scripts/extract-blog-from-docx.js blogs/my-blog-post.docx

This script will:
  1. Extract text content and convert to HTML
  2. Extract embedded images and save to public/blogs/images/
  3. Generate a JSON file with the extracted data
  4. Output a template for adding to blog-data.ts
`);
  process.exit(0);
}

const docxPath = args[0];

extractBlogFromDocx(docxPath)
  .then(blogData => {
    console.log('\n📋 Blog Entry Template (for lib/blog-data.ts):');
    console.log('='.repeat(50));
    console.log(generateBlogEntry(blogData));
    console.log('='.repeat(50));
    console.log('\n✨ Done! Copy the template above to add this blog post.\n');
  })
  .catch(error => {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  });

