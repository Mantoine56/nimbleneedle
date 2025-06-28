import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Places API key not configured' },
        { status: 500 }
      );
    }

    if (!placeId) {
      return NextResponse.json(
        { error: 'Google Place ID not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,formatted_address,formatted_phone_number&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === 'OK') {
      const result = data.result;
      const formattedReviews = (result.reviews || []).map((review, index) => ({
        id: `google_${index}`,
        name: review.author_name,
        rating: review.rating,
        text: review.text,
        avatar: review.profile_photo_url,
        timeAgo: formatRelativeTime(review.time),
        date: new Date(review.time * 1000).toLocaleDateString(),
        source: 'Google',
        verified: true
      }));

      return NextResponse.json({
        businessInfo: {
          name: result.name,
          rating: result.rating,
          totalReviews: result.user_ratings_total,
          address: result.formatted_address,
          phone: result.formatted_phone_number
        },
        reviews: formattedReviews,
        success: true
      });
    } else {
      return NextResponse.json(
        { error: `Google Places API error: ${data.status}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

function formatRelativeTime(timestamp) {
  const now = Date.now();
  const reviewTime = timestamp * 1000;
  const diffInMs = now - reviewTime;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
} 