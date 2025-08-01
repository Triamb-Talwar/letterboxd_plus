import React, { useState, useEffect } from 'react';
import { saveReview, getReview, saveRating, getRating } from '../utils/reviews';
import '../styles/ReviewForm.css';

const ReviewForm = ({ itemId }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setText(getReview(itemId));
    setRating(getRating(itemId));
  }, [itemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveReview(itemId, text);
    saveRating(itemId, rating);
    alert('Review & Rating saved!');
  };

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
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray', fontSize: '20px' }}
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
