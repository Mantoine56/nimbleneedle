const https = require('https');

// Replace with your Google Places API key
const API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY';

async function findPlaceId() {
  const businessName = 'Nimble Needle Tailoring';
  const address = '141 Preston St, Ottawa, ON';
  const query = `${businessName} ${address}`;
  
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,formatted_address&key=${API_KEY}`;
  
  console.log('🔍 Searching for Nimble Needle Tailoring...');
  console.log('Query:', query);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.candidates.length > 0) {
      console.log('✅ Found business!');
      console.log('Place ID:', data.candidates[0].place_id);
      console.log('Name:', data.candidates[0].name);
      console.log('Address:', data.candidates[0].formatted_address);
      
      // Now get the details including reviews
      await getPlaceDetails(data.candidates[0].place_id);
    } else {
      console.log('❌ Business not found. Status:', data.status);
      console.log('Response:', data);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total,formatted_address,formatted_phone_number&key=${API_KEY}`;
  
  console.log('\n📋 Getting place details...');
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const result = data.result;
      console.log('✅ Place details found!');
      console.log('Name:', result.name);
      console.log('Rating:', result.rating);
      console.log('Total Reviews:', result.user_ratings_total);
      console.log('Address:', result.formatted_address);
      console.log('Phone:', result.formatted_phone_number);
      
      if (result.reviews && result.reviews.length > 0) {
        console.log(`\n⭐ Found ${result.reviews.length} reviews:`);
        result.reviews.forEach((review, index) => {
          console.log(`\nReview ${index + 1}:`);
          console.log('Author:', review.author_name);
          console.log('Rating:', review.rating);
          console.log('Text:', review.text.substring(0, 100) + '...');
          console.log('Time:', new Date(review.time * 1000).toLocaleDateString());
        });
        
        console.log('\n🎯 To use these reviews in your app:');
        console.log('1. Add these environment variables to your .env.local:');
        console.log(`GOOGLE_PLACES_API_KEY=${API_KEY}`);
        console.log(`GOOGLE_PLACE_ID=${placeId}`);
        
        console.log('\n2. The API will return real reviews in this format:');
        console.log(JSON.stringify({
          businessInfo: {
            name: result.name,
            rating: result.rating,
            totalReviews: result.user_ratings_total
          },
          reviews: result.reviews.slice(0, 2).map(review => ({
            name: review.author_name,
            rating: review.rating,
            text: review.text,
            timeAgo: formatRelativeTime(review.time)
          }))
        }, null, 2));
      } else {
        console.log('❌ No reviews found for this place');
      }
    } else {
      console.log('❌ Error getting place details:', data.status);
    }
  } catch (error) {
    console.error('❌ Error:', error);
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

// Instructions
console.log('📋 Google Places API Setup Instructions:');
console.log('1. Go to https://console.cloud.google.com/');
console.log('2. Create a new project or select an existing one');
console.log('3. Enable the Places API');
console.log('4. Create an API key');
console.log('5. Replace YOUR_GOOGLE_PLACES_API_KEY above with your actual key');
console.log('6. Run this script with: node scripts/find-place-id.js');
console.log('\n' + '='.repeat(50));

if (API_KEY !== 'YOUR_GOOGLE_PLACES_API_KEY') {
  findPlaceId();
} else {
  console.log('⚠️  Please set your Google Places API key first!');
} 