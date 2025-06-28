# 🌟 Real Google Reviews Implementation Guide

## Overview
This guide will help you replace the mock reviews in your hero section with real Google reviews using the Google Places API.

## 📋 Step 1: Get Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API** (New)
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Restrict your API key to the Places API for security

## 🔍 Step 2: Find Your Google Place ID

1. Edit `scripts/find-place-id.js` and replace `YOUR_GOOGLE_PLACES_API_KEY` with your actual API key
2. Run the script:
   ```bash
   node scripts/find-place-id.js
   ```
3. Copy the Place ID that gets printed

## 🔧 Step 3: Environment Configuration

Create a `.env.local` file in your project root:

```env
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
GOOGLE_PLACE_ID=your_actual_place_id_here
```

## 📝 Step 4: API Route Implementation

Create `app/api/reviews/route.js`:

```javascript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return NextResponse.json(
        { error: 'API key or Place ID not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
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
        verified: true
      }));

      return NextResponse.json({
        businessInfo: {
          name: result.name,
          rating: result.rating,
          totalReviews: result.user_ratings_total
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
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

function formatRelativeTime(timestamp) {
  const diffInDays = Math.floor((Date.now() - timestamp * 1000) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}
```

## 🎯 Step 5: Update Your Hero Component

Replace the mock `heroReviews` array in `app/page.tsx` with real data:

```javascript
import { useState, useEffect } from 'react';

export default function Home() {
  const [heroReviews, setHeroReviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Remove the mock heroReviews array and add this useEffect:
  useEffect(() => {
    async function fetchRealReviews() {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        
        if (data.success) {
          setHeroReviews(data.reviews);
          setBusinessInfo(data.businessInfo);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    }

    fetchRealReviews();
  }, []);

  // Update the Google Reviews header section:
  // Replace the hardcoded "4.9 • 500+ reviews" with:
  {businessInfo ? (
    <span className="text-white/80 text-sm ml-2">
      {businessInfo.rating} • {businessInfo.totalReviews}+ reviews
    </span>
  ) : (
    <span className="text-white/80 text-sm ml-2">Loading...</span>
  )}

  // Your existing hero reviews rendering code will work as-is!
}
```

## 🚀 Step 6: Test Your Implementation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your homepage - you should see real Google reviews!

3. Check the browser console for any errors

4. Test the API endpoint directly: `http://localhost:3000/api/reviews`

## 🔧 Alternative Approaches

### Option 1: Third-Party Services
- **Trustpilot API**: More reliable for reviews
- **ReviewTrackers**: Aggregates multiple review sources
- **Podium**: Customer messaging and review management

### Option 2: Manual Curation
- Manually copy real reviews from Google
- Store in a JSON file or database
- Update periodically

### Option 3: Server-Side Generation
- Fetch reviews at build time
- Cache them for better performance
- Regenerate periodically with ISR (Incremental Static Regeneration)

## 📊 Expected API Response

```json
{
  "businessInfo": {
    "name": "Nimble Needle Tailoring",
    "rating": 4.9,
    "totalReviews": 908
  },
  "reviews": [
    {
      "id": "google_0",
      "name": "Sarah Johnson",
      "rating": 5,
      "text": "Amazing work! They made my dress fit like it was custom made for me.",
      "avatar": "https://lh3.googleusercontent.com/...",
      "timeAgo": "2 days ago",
      "verified": true
    }
  ],
  "success": true
}
```

## ⚠️ Important Notes

1. **API Limits**: Google Places API has usage limits and costs
2. **Rate Limiting**: Implement caching to avoid hitting limits
3. **Privacy**: Google reviews include real user data
4. **Updates**: Reviews update periodically, not real-time
5. **Fallbacks**: Always have fallback content if API fails

## 🎯 Quick Start

1. Get your API key
2. Run `node scripts/find-place-id.js` 
3. Add environment variables
4. Create the API route
5. Update your component
6. Test and deploy!

Your hero section will now display real Google reviews with the 4.9-star rating and 908+ reviews! 