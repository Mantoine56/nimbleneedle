import { NextResponse } from 'next/server';

/**
 * API Route to fetch Google Reviews using Google Places API
 * Fetches real business reviews and formats them for use in the application
 */
export async function GET() {
  try {
    // Get API credentials from environment variables
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    // Validate that credentials are available
    if (!apiKey || !placeId) {
      console.error('Google Places API credentials not configured');
      return NextResponse.json(
        { error: 'API key or Place ID not configured' },
        { status: 500 }
      );
    }

    // Fetch place details including reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,formatted_address,formatted_phone_number&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the Google Places API returned a successful response
    if (data.status === 'OK') {
      const result = data.result;
      
      // Format reviews for our application - Filter to only 5-star reviews
      const formattedReviews = (result.reviews || [])
        .filter(review => review.rating === 5) // Only show 5-star reviews
        .map((review, index) => ({
          id: `google_${index}`,
          name: review.author_name,
          rating: review.rating,
          text: review.text,
          avatar: review.profile_photo_url || '/testimonials/default-avatar.webp',
          timeAgo: formatRelativeTime(review.time),
          verified: true,
          service: inferServiceType(review.text) // Try to infer service type from review text
        }));

      // Return structured response with business info and reviews
      return NextResponse.json({
        businessInfo: {
          name: result.name,
          rating: result.rating,
          totalReviews: result.user_ratings_total,
          address: result.formatted_address,
          phone: result.formatted_phone_number
        },
        reviews: formattedReviews,
        heroReviews: formattedReviews.slice(0, 4), // First 4 reviews for hero section
        detailedReviews: formattedReviews.slice(0, 6).map(review => ({
          ...review,
          date: formatDateString(review.timeAgo)
        })), // First 6 reviews for detailed section
        success: true
      });
    } else {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json(
        { error: `Google Places API error: ${data.status}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * Convert Unix timestamp to relative time string
 * @param {number} timestamp - Unix timestamp from Google Places API
 * @returns {string} Human-readable relative time
 */
function formatRelativeTime(timestamp) {
  const diffInDays = Math.floor((Date.now() - timestamp * 1000) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

/**
 * Convert relative time to a more formal date string for detailed reviews
 * @param {string} timeAgo - Relative time string
 * @returns {string} Formatted date string
 */
function formatDateString(timeAgo) {
  // For detailed reviews, we'll use the same format but could be enhanced
  return timeAgo;
}

/**
 * Try to infer service type from review text
 * @param {string} reviewText - The review text
 * @returns {string} Inferred service type
 */
function inferServiceType(reviewText) {
  const text = reviewText.toLowerCase();
  
  // Keywords to service mapping
  const serviceKeywords = {
    'Wedding Dress Alterations': ['wedding', 'bride', 'bridal', 'wedding dress'],
    'Suit Alterations': ['suit', 'business', 'formal', 'blazer', 'jacket'],
    'Tailoring': ['tailor', 'custom', 'bespoke', 'fit'],
    'Dress Alterations': ['dress', 'gown', 'evening wear'],
    'Pants Alterations': ['pants', 'trousers', 'hem', 'waist'],
    'Zipper Repair': ['zipper', 'zip', 'repair'],
    'Seamstress Services': ['sewing', 'mending', 'repair']
  };

  // Check for service keywords in review text
  for (const [service, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return service;
    }
  }

  // Default service type if no specific keywords found
  return 'Clothing Alterations';
} 