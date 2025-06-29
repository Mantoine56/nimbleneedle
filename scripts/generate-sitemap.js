const fs = require('fs-extra');
const path = require('path');

async function generateSitemap() {
  const domain = 'https://nimbleneedle.ca';
  
  // Define all pages with their priority and change frequency
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services', priority: '0.9', changefreq: 'weekly' },
    { url: '/clothing-alterations', priority: '0.8', changefreq: 'weekly' },
    { url: '/wedding-dress-alterations', priority: '0.8', changefreq: 'weekly' },
    { url: '/zipper-repair', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact-us', priority: '0.7', changefreq: 'monthly' }
  ];

  // Generate XML sitemap
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${domain}${page.url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Save sitemap to public directory
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  await fs.writeFile(sitemapPath, xml);

  console.log('✅ Sitemap generated successfully at:', sitemapPath);
  console.log(`📄 Total pages included: ${pages.length}`);
  
  // Also generate a sitemap index for better organization (optional)
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${domain}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  const sitemapIndexPath = path.join(__dirname, '..', 'public', 'sitemap-index.xml');
  await fs.writeFile(sitemapIndexPath, sitemapIndex);
  
  console.log('✅ Sitemap index generated at:', sitemapIndexPath);
}

// Run the generator
generateSitemap().catch(console.error);