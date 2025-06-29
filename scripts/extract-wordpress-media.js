const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { DOMParser } = require('@xmldom/xmldom');

async function extractWordPressMedia() {
  try {
    console.log('🔄 Starting WordPress media extraction...');
    
    // Read the WordPress export XML file
    const xmlPath = path.join(__dirname, '..', 'scraped-data', 'mediaexport.xml');
    const xmlContent = await fs.readFile(xmlPath, 'utf8');
    
    // Parse XML
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'text/xml');
    
    // Find all attachment items
    const items = doc.getElementsByTagName('item');
    const mediaItems = [];
    
    console.log(`📄 Found ${items.length} total items in XML`);
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Check if this is an attachment
      const postType = item.getElementsByTagName('wp:post_type')[0];
      if (postType && postType.textContent === 'attachment') {
        
        // Extract media information
        const title = item.getElementsByTagName('title')[0]?.textContent || '';
        const attachmentUrl = item.getElementsByTagName('wp:attachment_url')[0]?.textContent || '';
        const postName = item.getElementsByTagName('wp:post_name')[0]?.textContent || '';
        const description = item.getElementsByTagName('description')[0]?.textContent || '';
        const content = item.getElementsByTagName('content:encoded')[0]?.textContent || '';
        
        // Extract alt text and other metadata from post meta
        let altText = '';
        let caption = '';
        const postMetas = item.getElementsByTagName('wp:postmeta');
        
        for (let j = 0; j < postMetas.length; j++) {
          const metaKey = postMetas[j].getElementsByTagName('wp:meta_key')[0]?.textContent;
          const metaValue = postMetas[j].getElementsByTagName('wp:meta_value')[0]?.textContent;
          
          if (metaKey === '_wp_attachment_image_alt') {
            altText = metaValue || '';
          }
          if (metaKey === '_wp_attachment_metadata') {
            // Could extract more metadata here if needed
          }
        }
        
        // Skip if no URL
        if (!attachmentUrl) continue;
        
        // Determine file extension
        const urlParts = attachmentUrl.split('.');
        const extension = urlParts[urlParts.length - 1].split('?')[0].toLowerCase();
        
        // Generate clean filename
        let filename = postName || title.replace(/[^a-zA-Z0-9-]/g, '-');
        if (!filename || filename === '') {
          filename = `media-${i}`;
        }
        
        // Add extension if not present
        if (!filename.includes('.')) {
          filename += `.${extension}`;
        }
        
        mediaItems.push({
          title,
          filename,
          url: attachmentUrl,
          altText,
          caption,
          description,
          content,
          extension,
          originalName: postName
        });
      }
    }
    
    console.log(`🖼️  Found ${mediaItems.length} media attachments`);
    
    // Create directories
    const publicDir = path.join(__dirname, '..', 'public');
    const mediaDir = path.join(publicDir, 'wordpress-media');
    const originalDir = path.join(mediaDir, 'original');
    
    await fs.ensureDir(mediaDir);
    await fs.ensureDir(originalDir);
    
    // Download all media files
    const downloadedFiles = [];
    const failedDownloads = [];
    
    for (const media of mediaItems) {
      try {
        console.log(`⬇️  Downloading: ${media.filename}`);
        
        // Download file
        const response = await axios.get(media.url, {
          responseType: 'stream',
          timeout: 30000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; WordPress Media Extractor)'
          }
        });
        
        const filePath = path.join(originalDir, media.filename);
        const writer = fs.createWriteStream(filePath);
        
        response.data.pipe(writer);
        
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        
        downloadedFiles.push({
          ...media,
          localPath: filePath,
          relativePath: `wordpress-media/original/${media.filename}`
        });
        
        console.log(`✅ Downloaded: ${media.filename}`);
        
      } catch (error) {
        console.error(`❌ Failed to download ${media.filename}:`, error.message);
        failedDownloads.push({
          ...media,
          error: error.message
        });
      }
    }
    
    // Create metadata JSON file
    const metadata = {
      extractedAt: new Date().toISOString(),
      totalItems: mediaItems.length,
      downloadedCount: downloadedFiles.length,
      failedCount: failedDownloads.length,
      files: downloadedFiles,
      failed: failedDownloads
    };
    
    const metadataPath = path.join(mediaDir, 'media-metadata.json');
    await fs.writeJson(metadataPath, metadata, { spaces: 2 });
    
    // Create image mapping for easy reference
    const imageMap = {};
    downloadedFiles.forEach(file => {
      imageMap[file.originalName] = {
        path: file.relativePath,
        alt: file.altText,
        title: file.title,
        description: file.description,
        caption: file.caption
      };
    });
    
    const imageMappingPath = path.join(mediaDir, 'image-mapping.json');
    await fs.writeJson(imageMappingPath, imageMap, { spaces: 2 });
    
    // Create TypeScript types file for easy usage
    const typesContent = `// Auto-generated WordPress media types
export interface WordPressImage {
  path: string;
  alt: string;
  title: string;
  description: string;
  caption: string;
}

export interface WordPressImageMap {
  [originalName: string]: WordPressImage;
}

// Available images from WordPress
export const WORDPRESS_IMAGES: WordPressImageMap = ${JSON.stringify(imageMap, null, 2)};
`;
    
    const typesPath = path.join(__dirname, '..', 'lib', 'wordpress-images.ts');
    await fs.writeFile(typesPath, typesContent);
    
    console.log('');
    console.log('🎉 WordPress media extraction complete!');
    console.log(`📊 Summary:`);
    console.log(`   • Total attachments found: ${mediaItems.length}`);
    console.log(`   • Successfully downloaded: ${downloadedFiles.length}`);
    console.log(`   • Failed downloads: ${failedDownloads.length}`);
    console.log(`📂 Files saved to: ${mediaDir}`);
    console.log(`📋 Metadata saved to: ${metadataPath}`);
    console.log(`🗺️  Image mapping saved to: ${imageMappingPath}`);
    console.log(`📝 TypeScript types created: ${typesPath}`);
    console.log('');
    
    if (downloadedFiles.length > 0) {
      console.log('✨ Sample usage in your components:');
      console.log(`import { WORDPRESS_IMAGES } from '@/lib/wordpress-images';`);
      console.log(`// Example: <Image src="/\${WORDPRESS_IMAGES['some-image'].path}" alt={\${WORDPRESS_IMAGES['some-image'].alt}} />`);
    }
    
    if (failedDownloads.length > 0) {
      console.log('\n⚠️  Failed downloads:');
      failedDownloads.forEach(fail => {
        console.log(`   • ${fail.filename}: ${fail.error}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error during media extraction:', error);
    process.exit(1);
  }
}

// Run the extraction
extractWordPressMedia();