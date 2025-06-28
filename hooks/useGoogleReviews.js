import { useState, useEffect } from 'react';

export function useGoogleReviews() {
  const [reviews, setReviews] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setReviews(data.reviews);
          setBusinessInfo(data.businessInfo);
          setError(null);
        } else {
          throw new Error(data.error || 'Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
        
        // Fallback to empty state rather than mock data
        setReviews([]);
        setBusinessInfo(null);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return {
    reviews,
    businessInfo,
    loading,
    error,
    hasReviews: reviews.length > 0
  };
} 