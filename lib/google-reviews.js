// Google Places API integration for real reviews
class GoogleReviewsAPI {
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.placeId = process.env.GOOGLE_PLACE_ID; // We'll need to find this
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
  }

  async getPlaceDetails() {
    try {
      const response = await fetch(
        `${this.baseUrl}/details/json?place_id=${this.placeId}&fields=name,rating,reviews,user_ratings_total,formatted_address,formatted_phone_number&key=${this.apiKey}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK') {
        return {
          businessInfo: {
            name: data.result.name,
            rating: data.result.rating,
            totalReviews: data.result.user_ratings_total,
            address: data.result.formatted_address,
            phone: data.result.formatted_phone_number
          },
          reviews: this.formatReviews(data.result.reviews || [])
        };
      } else {
        throw new Error(`Google Places API error: ${data.status}`);
      }
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return null;
    }
  }

  formatReviews(reviews) {
    return reviews.map((review, index) => ({
      id: `google_${index}`,
      name: review.author_name,
      rating: review.rating,
      text: review.text,
      avatar: review.profile_photo_url,
      timeAgo: this.formatRelativeTime(review.time),
      date: new Date(review.time * 1000).toLocaleDateString(),
      source: 'Google',
      verified: true
    }));
  }

  formatRelativeTime(timestamp) {
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

  // Search for place ID by business name and address
  async findPlaceId(businessName, address) {
    try {
      const query = `${businessName} ${address}`;
      const response = await fetch(
        `${this.baseUrl}/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name&key=${this.apiKey}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.candidates.length > 0) {
        return data.candidates[0].place_id;
      }
      
      return null;
    } catch (error) {
      console.error('Error finding place ID:', error);
      return null;
    }
  }
}

export default GoogleReviewsAPI; 