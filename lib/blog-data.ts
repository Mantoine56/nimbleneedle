export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-care-for-your-altered-garments",
    title: "How to Care for Your Altered Garments",
    excerpt: "Learn the best practices for maintaining your professionally altered clothing to ensure they last longer and always look their best.",
    content: `
      <p>Having your clothes professionally altered is an investment in your wardrobe. To ensure your altered garments maintain their perfect fit and quality, proper care is essential. Here are our expert tips for caring for your altered clothing.</p>

      <h2>1. Follow Care Labels Carefully</h2>
      <p>After alterations, the care requirements for your garment may change. Always check the care label and follow the instructions precisely. If you're unsure, ask your tailor for specific care recommendations.</p>

      <h2>2. Proper Storage is Key</h2>
      <p>Store your altered garments properly to maintain their shape:</p>
      <ul>
        <li>Use padded hangers for suits and jackets</li>
        <li>Fold knits carefully to prevent stretching</li>
        <li>Keep garments in breathable garment bags</li>
        <li>Ensure adequate space between items to prevent wrinkles</li>
      </ul>

      <h2>3. Handle with Care</h2>
      <p>Be mindful of altered areas when wearing and removing garments. Newly hemmed areas, taken-in seams, and adjusted buttons need gentle handling to maintain their integrity.</p>

      <h2>4. Regular Maintenance</h2>
      <p>Schedule regular check-ups for your most worn altered pieces. Small adjustments can prevent larger issues and keep your clothes fitting perfectly for years to come.</p>

      <h2>5. Professional Cleaning</h2>
      <p>For dry-clean-only items, choose a reputable cleaner and inform them about any alterations. This ensures they take extra care around adjusted areas.</p>

      <p>At Nimble Needle, we're always here to help maintain your altered garments. Don't hesitate to bring items back for touch-ups or advice on care and maintenance.</p>
    `,
    author: {
      name: "Riber Baabo",
      role: "Master Tailor",
      avatar: "/testimonials/sarah.webp"
    },
    date: "2025-06-15",
    readTime: "5 min read",
    category: "Care Tips",
    tags: ["garment care", "alterations", "maintenance", "clothing tips"],
    featuredImage: "/services/alterations.webp",
    published: true
  },
  {
    id: "2",
    slug: "wedding-dress-alterations-timeline",
    title: "Wedding Dress Alterations: Your Complete Timeline Guide",
    excerpt: "Planning your wedding dress alterations? Here's everything you need to know about timing your fittings for the perfect fit on your big day.",
    content: `
      <p>Your wedding dress is one of the most important garments you'll ever wear, and ensuring it fits perfectly is crucial for your confidence and comfort on your special day. Here's our comprehensive timeline guide for wedding dress alterations.</p>

      <h2>3-4 Months Before the Wedding</h2>
      <p>Schedule your first fitting. This gives ample time for any major alterations needed, such as:</p>
      <ul>
        <li>Taking in or letting out the bodice</li>
        <li>Adjusting the length</li>
        <li>Adding or removing sleeves</li>
        <li>Customizing the neckline</li>
      </ul>

      <h2>6-8 Weeks Before the Wedding</h2>
      <p>Your second fitting should focus on fine-tuning the alterations. At this point, major changes should be complete, and we'll work on perfecting the fit.</p>

      <h2>2-3 Weeks Before the Wedding</h2>
      <p>The final fitting ensures everything is perfect. Bring your wedding shoes and undergarments you'll wear on the day for the most accurate fit.</p>

      <h2>Important Tips</h2>
      <ul>
        <li>Maintain a stable weight between fittings</li>
        <li>Bring the exact shoes and undergarments you'll wear</li>
        <li>Consider the bustle for your reception</li>
        <li>Don't wait until the last minute - good alterations take time</li>
      </ul>

      <h2>What to Expect at Nimble Needle</h2>
      <p>Our experienced bridal alteration specialists understand the importance of your wedding dress. We provide personalized attention, expert craftsmanship, and work within your timeline to ensure your dress is absolutely perfect for your big day.</p>

      <p>Contact us early to secure your spot in our bridal alterations schedule. We're here to make your dress dreams come true!</p>
    `,
    author: {
      name: "Sarah Johnson",
      role: "Bridal Specialist",
      avatar: "/testimonials/sarah-m.webp"
    },
    date: "2025-06-01",
    readTime: "7 min read",
    category: "Wedding",
    tags: ["wedding dress", "bridal alterations", "timeline", "wedding planning"],
    featuredImage: "/image.webp",
    published: true
  },
  {
    id: "3",
    slug: "sustainable-fashion-through-alterations",
    title: "Sustainable Fashion: How Alterations Can Transform Your Wardrobe",
    excerpt: "Discover how professional alterations can help you create a more sustainable wardrobe while saving money and reducing fashion waste.",
    content: `
      <p>In an era of fast fashion and disposable clothing, alterations offer a sustainable alternative that benefits both your wallet and the environment. Here's how professional tailoring can transform your approach to fashion.</p>

      <h2>The Environmental Impact</h2>
      <p>The fashion industry is one of the world's largest polluters. By altering and maintaining existing garments instead of buying new ones, you're directly contributing to reducing fashion waste and environmental impact.</p>

      <h2>Reviving Vintage and Thrifted Finds</h2>
      <p>Found a beautiful vintage piece that's not quite your size? Professional alterations can transform thrift store treasures into perfectly fitted, unique additions to your wardrobe. This approach combines sustainability with individual style.</p>

      <h2>Quality Over Quantity</h2>
      <p>Investing in fewer, higher-quality pieces that are tailored to fit you perfectly is more sustainable than constantly buying ill-fitting fast fashion. Well-fitted clothes look better, feel better, and last longer.</p>

      <h2>Common Sustainable Alterations</h2>
      <ul>
        <li>Resizing garments after weight changes instead of buying new</li>
        <li>Updating outdated styles to current trends</li>
        <li>Repairing damaged items to extend their life</li>
        <li>Converting garments (e.g., long dresses to midi length)</li>
      </ul>

      <h2>The Cost-Benefit Analysis</h2>
      <p>While alterations require an upfront investment, they're often far more economical than replacing garments. A $50 alteration can save a $200 dress or transform a $20 thrift find into a designer-looking piece.</p>

      <h2>Our Commitment to Sustainability</h2>
      <p>At Nimble Needle, we're passionate about sustainable fashion. We encourage our clients to think creatively about their existing wardrobes and offer consultations on how alterations can breathe new life into forgotten garments.</p>

      <p>Join us in making fashion more sustainable, one alteration at a time. Bring in your clothes for a consultation and discover the transformation possibilities!</p>
    `,
    author: {
      name: "Michael Chen",
      role: "Sustainability Advocate",
      avatar: "/testimonials/michael.webp"
    },
    date: "2025-05-20",
    readTime: "6 min read",
    category: "Sustainability",
    tags: ["sustainable fashion", "eco-friendly", "vintage clothing", "upcycling"],
    featuredImage: "/promise-image.webp",
    published: true
  },
  {
    id: "4",
    slug: "perfect-suit-fit-guide",
    title: "The Perfect Suit: A Guide to Professional Suit Alterations",
    excerpt: "Understanding suit alterations can make the difference between looking good and looking exceptional. Here's what you need to know.",
    content: `
      <p>A well-fitted suit is a powerful tool in any professional's wardrobe. Even the most expensive suit won't look its best without proper tailoring. Here's our comprehensive guide to achieving the perfect suit fit through professional alterations.</p>

      <h2>Key Areas for Suit Alterations</h2>
      
      <h3>1. Jacket Shoulders</h3>
      <p>The shoulder seam should sit exactly where your shoulder ends. While shoulder alterations are complex, they're crucial for a proper fit. If the shoulders don't fit, consider a different size.</p>

      <h3>2. Jacket Length</h3>
      <p>The jacket should cover your backside and fall to about your knuckles when your arms hang naturally. We can adjust length, but dramatic changes may affect the jacket's proportions.</p>

      <h3>3. Sleeve Length</h3>
      <p>Proper sleeve length shows about 1/4 to 1/2 inch of shirt cuff. This is one of the most common and impactful alterations we perform.</p>

      <h3>4. Jacket Body</h3>
      <p>The jacket should follow your body's contours without being too tight. We can take in or let out the sides and back seams for the perfect silhouette.</p>

      <h3>5. Trouser Hemming</h3>
      <p>The break (where trousers meet shoes) is a matter of preference:</p>
      <ul>
        <li>No break: Modern, shows more shoe</li>
        <li>Slight break: Classic, versatile</li>
        <li>Full break: Traditional, more fabric pooling</li>
      </ul>

      <h3>6. Trouser Waist and Seat</h3>
      <p>Trousers should sit comfortably at your natural waist without a belt. We can adjust both waist and seat for comfort and appearance.</p>

      <h2>The Nimble Needle Difference</h2>
      <p>Our master tailors understand that every body is unique. We take multiple measurements and consider your lifestyle and preferences to create a suit that not only fits perfectly but moves with you throughout your day.</p>

      <h2>Investment in Success</h2>
      <p>Professional suit alterations typically range from $100-300, depending on the work needed. This investment transforms an off-the-rack suit into a custom-fitted garment that boosts your confidence and professional image.</p>

      <p>Book your suit alteration consultation today and experience the difference a perfectly fitted suit can make!</p>
    `,
    author: {
      name: "David Rodriguez",
      role: "Senior Tailor",
      avatar: "/testimonials/david.webp"
    },
    date: "2025-05-10",
    readTime: "8 min read",
    category: "Men's Fashion",
    tags: ["suits", "men's alterations", "professional wear", "tailoring"],
    featuredImage: "/services/suits.webp",
    published: true
  },
  {
    id: "5",
    slug: "zipper-repair-prevention-tips",
    title: "Zipper Care 101: Prevention Tips and When to Seek Repair",
    excerpt: "Zippers are essential but often overlooked. Learn how to maintain them properly and recognize when professional repair is needed.",
    content: `
      <p>Zippers are one of the most used yet underappreciated components of our clothing and accessories. A broken zipper can render a favorite jacket unwearable or a essential bag useless. Here's everything you need to know about zipper care and repair.</p>

      <h2>Common Zipper Problems</h2>
      <ul>
        <li><strong>Stuck Zipper:</strong> Often caused by fabric caught in teeth or corrosion</li>
        <li><strong>Separated Zipper:</strong> When teeth don't mesh properly</li>
        <li><strong>Missing Teeth:</strong> Damage that usually requires replacement</li>
        <li><strong>Broken Slider:</strong> The most common issue, but often easily fixed</li>
      </ul>

      <h2>Prevention Tips</h2>
      
      <h3>1. Keep Zippers Clean</h3>
      <p>Dirt and debris are zipper enemies. Regularly clean zipper teeth with a soft brush, especially on bags and outdoor gear.</p>

      <h3>2. Lubricate Regularly</h3>
      <p>Use appropriate lubricants:</p>
      <ul>
        <li>Graphite pencil for metal zippers</li>
        <li>Soap or candle wax for plastic zippers</li>
        <li>Specialized zipper lubricant for heavy-duty applications</li>
      </ul>

      <h3>3. Don't Force It</h3>
      <p>If a zipper resists, stop and investigate. Forcing can cause permanent damage. Check for caught fabric or misaligned teeth.</p>

      <h3>4. Proper Storage</h3>
      <p>Store items with zippers partially open to reduce stress on the slider and teeth.</p>

      <h2>When to Seek Professional Repair</h2>
      <p>While some zipper issues can be DIY fixes, these situations call for professional help:</p>
      <ul>
        <li>Zipper replacement on expensive or delicate items</li>
        <li>Multiple missing teeth</li>
        <li>Damage to the fabric around the zipper</li>
        <li>Vintage or specialty zippers</li>
      </ul>

      <h2>Our Zipper Repair Services</h2>
      <p>At Nimble Needle, we repair and replace zippers on:</p>
      <ul>
        <li>Jackets and coats</li>
        <li>Dresses and skirts</li>
        <li>Bags and luggage</li>
        <li>Boots and shoes</li>
        <li>Cushion covers and upholstery</li>
      </ul>

      <p>Don't let a broken zipper sideline your favorite items. Bring them to Nimble Needle for expert repair that will have them working like new!</p>
    `,
    author: {
      name: "James Wilson",
      role: "Repair Specialist",
      avatar: "/testimonials/james.webp"
    },
    date: "2025-04-25",
    readTime: "6 min read",
    category: "Repair Tips",
    tags: ["zipper repair", "maintenance", "clothing care", "repairs"],
    featuredImage: "/services/zipper repair.jpg",
    published: true
  },
  {
    id: "6",
    slug: "seasonal-wardrobe-refresh",
    title: "Seasonal Wardrobe Refresh: Alterations for Changing Seasons",
    excerpt: "Transform your wardrobe for each season with strategic alterations. Save money and stay stylish year-round.",
    content: `
      <p>As seasons change, so do our wardrobe needs. Instead of buying entirely new wardrobes, strategic alterations can help you transition your favorite pieces throughout the year. Here's how to refresh your wardrobe seasonally through smart tailoring.</p>

      <h2>Spring Transitions</h2>
      <p>As we move from winter to spring:</p>
      <ul>
        <li><strong>Shorten sleeves:</strong> Convert long-sleeve dresses and tops to 3/4 or short sleeves</li>
        <li><strong>Lighten up:</strong> Remove linings from jackets for lighter wear</li>
        <li><strong>Hem adjustments:</strong> Shorten winter dresses for a fresh spring look</li>
      </ul>

      <h2>Summer Adaptations</h2>
      <p>Prepare for warmer weather:</p>
      <ul>
        <li><strong>Convert pants to shorts:</strong> Transform unused pants into custom-length shorts</li>
        <li><strong>Open up necklines:</strong> Adjust high necklines for better ventilation</li>
        <li><strong>Streamline silhouettes:</strong> Take in loose clothing for a breezier fit</li>
      </ul>

      <h2>Fall Preparations</h2>
      <p>Transitioning to cooler weather:</p>
      <ul>
        <li><strong>Layer-friendly alterations:</strong> Adjust armholes to accommodate layers</li>
        <li><strong>Length adjustments:</strong> Ensure proper hem lengths with boots</li>
        <li><strong>Add details:</strong> Consider adding decorative elements for fall richness</li>
      </ul>

      <h2>Winter Modifications</h2>
      <p>Preparing for cold weather:</p>
      <ul>
        <li><strong>Coat adjustments:</strong> Ensure proper fit over heavy sweaters</li>
        <li><strong>Add linings:</strong> Line lighter jackets for extra warmth</li>
        <li><strong>Cuff adjustments:</strong> Modify sleeves to accommodate gloves</li>
      </ul>

      <h2>Year-Round Essentials</h2>
      <p>Some alterations work for any season:</p>
      <ul>
        <li>Taking in or letting out for weight fluctuations</li>
        <li>Adjusting rises on pants for comfort</li>
        <li>Replacing worn elastic in favorite pieces</li>
        <li>Reinforcing stress points before they tear</li>
      </ul>

      <h2>Budget-Friendly Fashion</h2>
      <p>Seasonal alterations typically cost a fraction of buying new clothes. A $30-50 alteration can give new life to multiple pieces, stretching your fashion budget while maintaining a fresh, current look.</p>

      <p>Visit Nimble Needle for a seasonal wardrobe consultation. We'll help you identify which pieces can be transformed for the upcoming season!</p>
    `,
    author: {
      name: "Emily Martinez",
      role: "Fashion Consultant",
      avatar: "/testimonials/emily.webp"
    },
    date: "2025-04-10",
    readTime: "7 min read",
    category: "Fashion Tips",
    tags: ["seasonal fashion", "wardrobe planning", "budget fashion", "alterations"],
    featuredImage: "/craftsmanship-image.webp",
    published: true
  },
  {
    id: "7",
    slug: "what-to-expect-at-your-wedding-dress-alteration-appointment",
    title: "What to Expect at Your Wedding Dress Alteration Appointment",
    excerpt: "Planning a wedding is exciting yet overwhelming. Learn exactly what to expect at your wedding dress alteration appointment to ensure your gown fits perfectly for your special day.",
    content: `
      <p>Planning a wedding is an exciting yet often overwhelming experience, and one of the most important aspects of that journey is finding the perfect wedding dress. Once you've found your dream gown, the next step is ensuring it fits you flawlessly. Here's what you can expect at your wedding dress alteration appointment:</p>

      <h2>1. Initial Consultation</h2>
      <p>When you arrive for your alteration appointment, the first thing you'll do is meet with your tailor. This initial consultation is crucial for discussing your vision and any specific concerns you may have about the fit of your dress. Be prepared to communicate your preferences, whether it's adjusting the hemline, taking in the bodice, or adding additional support to the straps. This is also a great time to discuss your wedding date, as it will influence the timeline for alterations.</p>

      <h2>2. Fitting Process</h2>
      <p>The fitting process involves trying on your dress and having the tailor assess the areas that need adjustment. This is where you'll discuss the specifics of what alterations are needed and get a professional opinion on what's possible with your particular gown.</p>

      <h2>3. Discussing Alterations</h2>
      <p>After the fitting, your tailor will explain the alterations that can be made. Common adjustments include:</p>
      <ul>
        <li><strong>Hem length:</strong> Depending on your shoes and personal preference, the hem may need to be shortened or lengthened.</li>
        <li><strong>Bodice adjustments:</strong> Taking in or letting out the bodice for a snug or more comfortable fit.</li>
        <li><strong>Strap alterations:</strong> Adjusting the straps for better support or style.</li>
        <li><strong>Adding or removing embellishments:</strong> Personalizing your dress with lace, beading, or other details.</li>
      </ul>
      <p>Your tailor will provide suggestions based on their expertise, but ultimately, the decisions are yours.</p>

      <h2>4. Timeline and Follow-Up Fittings</h2>
      <p>During your appointment, your tailor will also discuss the timeline for your alterations. Depending on the complexity of the changes and how far in advance your wedding is, you may need multiple fittings. Typically, you can expect at least two to three appointments: the initial fitting, a second fitting after the alterations have been made, and a final fitting closer to your wedding date.</p>

      <h2>5. Final Touches</h2>
      <p>In your final fitting, the tailor will make any last-minute adjustments to ensure that your dress fits like a glove. This is also a good time to try on your complete bridal look, including shoes and accessories, to see how everything comes together.</p>

      <h2>Choose Nimble Needle Tailoring for Your Wedding Dress Alterations!</h2>
      <p>Your wedding dress alteration appointment is a vital part of your bridal journey. It's your chance to ensure that your dress not only looks stunning but also feels comfortable on your big day. Our expert tailors have many years of experience in wedding dress alterations and will make sure that your gown fits perfectly.</p>
      
      <p>Schedule your appointment or stop by our locations in Preston & Riverside, Ottawa, today and let us help you make your wedding dreams come true!</p>
    `,
    author: {
      name: "Alan Charlton",
      role: "Master Tailor",
      avatar: "/testimonials/david.webp"
    },
    date: "2025-06-13",
    readTime: "6 min read",
    category: "Wedding",
    tags: ["wedding dress", "alterations", "bridal", "fitting", "consultation"],
    featuredImage: "/services/WeddingDress Alterations.jpeg",
    published: true
  },
  {
    id: "8",
    slug: "clothing-alterations-can-a-tailor-fix-any-clothing-issue",
    title: "Clothing Alterations: Can a Tailor Fix Any Clothing Issue?",
    excerpt: "Discover the wide range of clothing alterations possible through professional tailoring. Learn what issues can be fixed and how expert alterations can transform your wardrobe.",
    content: `
      <p>Do you have a new form-fitting dress that doesn't fit your form just right, or a suit jacket with sleeves that are too long? What about a pair of pants with a waistband that sits on your hips or way above your belly button? A professional tailor can help. In fact, expert clothing alterations can transform these frustrating wardrobe issues into perfectly tailored garments that look and feel like they were made just for you.</p>

      <h2>What Can a Tailor Fix?</h2>
      <p>Tailors do much more than just hem pants and shorten sleeves. They fix all kinds of clothing issues. Whether it's adjusting a dress to flatter your shape or tailoring a suit for a sharp, polished look, skilled clothing alterations can solve a wide range of common wardrobe issues. Here's a closer look at what's possible with professional alterations:</p>

      <h3>Repairs and Customizations</h3>
      <p>In addition to fixing the fit of most clothing, tailors can repair tears, replace broken zippers or buttons, and customize garments by adding features such as pockets or removing pleats. These services extend the life of your clothes and keep them looking fresh and modern.</p>

      <h3>Clothing Alterations</h3>
      <p>From everyday pants and shirts to jackets and skirts, clothing alterations can include taking in or letting out seams, adjusting waistbands, shortening or lengthening hems, and modifying sleeves. For example, if your pants are too long or your shirt sleeves don't hit the right spot, a tailor can fix that to give you a polished look.</p>

      <h3>Dress Alterations</h3>
      <p>Dresses often require personalized and precise work to enhance your silhouette. Skilled tailors can adjust the fit by adding or removing darts, replacing zippers, altering necklines, and even changing sleeve styles. Whether it's a casual dress or a special occasion gown, dress alterations ensure you feel comfortable and confident.</p>

      <h3>Suit Alterations</h3>
      <p>Suits are all about structure and fit. Tailors can taper jacket sides, shorten sleeves, adjust trouser waistbands, and hem pants to create a sharp, tailored look. While some suit alterations like resizing shoulders are complex and sometimes not possible, most adjustments can be done to improve comfort and style without compromising the suit's integrity.</p>

      <h2>Are There Limits?</h2>
      <p>While tailors can fix a wide variety of issues through clothing alterations, some changes are limited by the garment's construction and fabric. Major structural alterations, like completely resizing a suit or drastically changing a garment's style, may not be feasible or cost-effective. It's always best to consult with your tailor to understand what's possible for your specific clothing item.</p>

      <h2>Ready to Experience the Perfect Fit?</h2>
      <p>If you're looking for expert clothing alterations and tailoring services in Ottawa, visit Nimble Needle Tailoring at either of our locations at 141 Preston Street or 3681 Riverside Dr. Our skilled team will bring your wardrobe to its full potential through expert craftsmanship and friendly service.</p>
      
      <p>Contact us or visit our store about your tailoring concerns. We are your one-stop shop for all your tailoring and clothing alteration needs in Ottawa. We can serve you in English, Arabic, and Kurdish 7 days a week.</p>
    `,
    author: {
      name: "Alan Charlton",
      role: "Master Tailor",
      avatar: "/testimonials/david.webp"
    },
    date: "2025-06-13",
    readTime: "7 min read",
    category: "Alterations",
    tags: ["clothing alterations", "tailoring", "dress alterations", "suit alterations", "repairs"],
    featuredImage: "/services/alterations.webp",
    published: true
  }
];

// Helper functions for blog operations
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category && post.published);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag) && post.published);
}

export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(p => p.id !== post.id && p.published)
    .filter(p => 
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.filter(p => p.published).map(post => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set(blogPosts.filter(p => p.published).flatMap(post => post.tags));
  return Array.from(tags);
}