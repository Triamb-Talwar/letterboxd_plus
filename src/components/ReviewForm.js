import React, { useState } from 'react';

const ReviewForm = ({ onSave, existingReview }) => {
  const [stars, setStars] = useState(existingReview?.stars || 0);
  const [text, setText] = useState(existingReview?.text || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ stars, text });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>⭐ Your Rating:</label>
      <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
        {[0, 1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n} Star{n !== 1 && 's'}</option>
        ))}
      </select>

      <label>📝 Your Review:</label>
      <textarea
        placeholder="Write your thoughts..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Save Review</button>
    </form>
  );
};

export default ReviewForm;
