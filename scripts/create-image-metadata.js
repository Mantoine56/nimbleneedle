const fs = require('fs-extra');
const path = require('path');

async function createImageMetadata() {
  try {
    console.log('🔄 Creating image metadata from downloaded files...');
    
    // Read the WordPress export XML file to get alt text and metadata
    const xmlPath = path.join(__dirname, '..', 'scraped-data', 'mediaexport.xml');
    const xmlContent = await fs.readFile(xmlPath, 'utf8');
    
    // Simple regex to extract attachment data (more efficient than DOM parsing for large files)
    const itemMatches = xmlContent.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    console.log(`📄 Found ${itemMatches.length} items in XML`);
    
    // Create metadata map from XML
    const xmlMetadata = {};
    
    for (const itemXml of itemMatches) {
      // Check if it's an attachment
      if (itemXml.includes('<wp:post_type><![CDATA[attachment]]></wp:post_type>')) {
        // Extract key information using regex
        const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const postNameMatch = itemXml.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]><\/wp:post_name>/);
        const attachmentUrlMatch = itemXml.match(/<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/);
        const descriptionMatch = itemXml.match(/<description>(.*?)<\/description>/);
        const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/);
        
        // Extract alt text from postmeta
        let altText = '';
        const altTextMatch = itemXml.match(/<wp:meta_key><!\[CDATA\[_wp_attachment_image_alt\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/);
        if (altTextMatch) {
          altText = altTextMatch[1];
        }
        
        const title = titleMatch ? titleMatch[1] : '';
        const postName = postNameMatch ? postNameMatch[1] : '';
        const attachmentUrl = attachmentUrlMatch ? attachmentUrlMatch[1] : '';
        const description = descriptionMatch ? descriptionMatch[1] : '';
        const content = contentMatch ? contentMatch[1] : '';
        
        if (postName && attachmentUrl) {
          // Determine filename
          const urlParts = attachmentUrl.split('/');
          const originalFilename = urlParts[urlParts.length - 1];
          
          xmlMetadata[postName] = {
            title,
            originalFilename,
            altText,
            description,
            content,
            attachmentUrl
          };
        }
      }
    }
    
    console.log(`🔍 Extracted metadata for ${Object.keys(xmlMetadata).length} attachments`);
    
    // Get list of downloaded files
    const mediaDir = path.join(__dirname, '..', 'public', 'wordpress-media');
    const originalDir = path.join(mediaDir, 'original');
    
    await fs.ensureDir(mediaDir);
    
    let downloadedFiles = [];
    if (await fs.pathExists(originalDir)) {
      const files = await fs.readdir(originalDir);
      downloadedFiles = files.filter(f => !f.startsWith('.'));
    }
    
    console.log(`📁 Found ${downloadedFiles.length} downloaded files`);
    
    // Create image mapping
    const imageMap = {};
    const processedFiles = [];
    
    for (const filename of downloadedFiles) {
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
      const metadata = xmlMetadata[nameWithoutExt] || {};
      
      imageMap[nameWithoutExt] = {
        path: `wordpress-media/original/${filename}`,
        filename: filename,
        alt: metadata.altText || `Professional tailoring work by Nimble Needle - ${metadata.title || nameWithoutExt}`,
        title: metadata.title || nameWithoutExt,
        description: metadata.description || metadata.content || '',
        originalUrl: metadata.attachmentUrl || ''
      };
      
      processedFiles.push({
        filename,
        originalName: nameWithoutExt,
        localPath: path.join(originalDir, filename),
        relativePath: `wordpress-media/original/${filename}`,
        ...metadata
      });
    }
    
    // Create metadata JSON file
    const metadata = {
      extractedAt: new Date().toISOString(),
      totalXmlItems: itemMatches.length,
      xmlMetadataCount: Object.keys(xmlMetadata).length,
      downloadedCount: downloadedFiles.length,
      files: processedFiles
    };
    
    const metadataPath = path.join(mediaDir, 'media-metadata.json');
    await fs.writeJson(metadataPath, metadata, { spaces: 2 });
    
    // Create image mapping for easy reference
    const imageMappingPath = path.join(mediaDir, 'image-mapping.json');
    await fs.writeJson(imageMappingPath, imageMap, { spaces: 2 });
    
    // Create TypeScript types file for easy usage
    const typesContent = `// Auto-generated WordPress media types
export interface WordPressImage {
  path: string;
  filename: string;
  alt: string;
  title: string;
  description: string;
  originalUrl: string;
}

export interface WordPressImageMap {
  [originalName: string]: WordPressImage;
}

// Available images from WordPress
export const WORDPRESS_IMAGES: WordPressImageMap = ${JSON.stringify(imageMap, null, 2)};

// Helper function to get image by name
export function getWordPressImage(name: string): WordPressImage | null {
  return WORDPRESS_IMAGES[name] || null;
}

// Get all available image names
export function getAvailableImageNames(): string[] {
  return Object.keys(WORDPRESS_IMAGES);
}
`;
    
    const typesDir = path.join(__dirname, '..', 'lib');
    await fs.ensureDir(typesDir);
    const typesPath = path.join(typesDir, 'wordpress-images.ts');
    await fs.writeFile(typesPath, typesContent);
    
    console.log('');
    console.log('🎉 WordPress media metadata creation complete!');
    console.log(`📊 Summary:`);
    console.log(`   • XML items processed: ${itemMatches.length}`);
    console.log(`   • Metadata extracted: ${Object.keys(xmlMetadata).length}`);
    console.log(`   • Files available: ${downloadedFiles.length}`);
    console.log(`📂 Files directory: ${originalDir}`);
    console.log(`📋 Metadata saved to: ${metadataPath}`);
    console.log(`🗺️  Image mapping saved to: ${imageMappingPath}`);
    console.log(`📝 TypeScript types created: ${typesPath}`);
    console.log('');
    
    // Show some sample images
    const sampleImages = Object.keys(imageMap).slice(0, 5);
    if (sampleImages.length > 0) {
      console.log('✨ Sample usage in your components:');
      console.log(`import { WORDPRESS_IMAGES, getWordPressImage } from '@/lib/wordpress-images';`);
      console.log('');
      console.log('Examples:');
      sampleImages.forEach(name => {
        console.log(`// ${imageMap[name].title}`);
        console.log(`<Image src="/${imageMap[name].path}" alt="${imageMap[name].alt}" />`);
        console.log('');
      });
    }
    
    console.log('🔍 Categories found:');
    const categories = {
      hero: downloadedFiles.filter(f => f.includes('hero') || f.includes('background')).length,
      clothing: downloadedFiles.filter(f => f.includes('dress') || f.includes('shirt') || f.includes('suit')).length,
      team: downloadedFiles.filter(f => f.includes('team') || f.includes('riber') || f.includes('avatar')).length,
      work: downloadedFiles.filter(f => f.includes('nimble-needle-') && f.match(/\d+/)).length,
      accessories: downloadedFiles.filter(f => f.includes('mask') || f.includes('pillow')).length
    };
    
    Object.entries(categories).forEach(([category, count]) => {
      if (count > 0) {
        console.log(`   • ${category}: ${count} images`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error creating metadata:', error);
    process.exit(1);
  }
}

// Run the metadata creation
createImageMetadata();