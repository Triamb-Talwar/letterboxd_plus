import React, { useState, useEffect } from 'react';
import { saveReview, getReview, saveRating, getRating } from '../utils/reviews';
import '../styles/ReviewForm.css';

const ReviewForm = ({ itemId, onSubmit }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExistingData = async () => {
      const existingReview = await getReview(itemId);
      const existingRating = await getRating(itemId);
      setText(existingReview || '');
      setRating(existingRating || 0);
      setLoading(false);
    };

    fetchExistingData();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveReview(itemId, text);
    await saveRating(itemId, rating);
    alert('Review & Rating saved!');
    if (onSubmit) onSubmit(); // callback to update parent
  };

  if (loading) return <p>Loading review form...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
      />
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              color: star <= rating ? 'gold' : 'gray',
              fontSize: '20px',
            }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit">Save Review</button>
    </form>
  );
};

export default ReviewForm;
