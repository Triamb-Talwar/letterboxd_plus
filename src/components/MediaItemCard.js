// src/components/MediaItemCard.js
import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import { getReview } from '../utils/reviews';
import SkeletonReview from './SkeletonReview'; // ← import the skeleton
import '../App.css';
import '../styles/MediaItemCard.css';

const MediaItemCard = ({ item }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [savedReview, setSavedReview] = useState('');
  const [loadingReview, setLoadingReview] = useState(true); // ← new

  useEffect(() => {
    const fetchReview = () => {
      const review = getReview(item.id);
      if (review) {
        setSavedReview(review);
      }
      setLoadingReview(false); // ← done loading
    };

    // Simulate async delay (optional but realistic UX)
    setTimeout(fetchReview, 400); // 400ms fake delay
  }, [item.id]);

  const handleReviewSubmit = () => {
    const newReview = getReview(item.id);
    setSavedReview(newReview);
    setShowReviewForm(false);
  };

  return (
    <div className="book-card">
      {item.image ? (
        <img src={item.image} alt={item.title} className="media-image" />
      ) : (
        <div className="no-cover">No Cover</div>
      )}

      <h3>{item.title}</h3>

      {loadingReview ? (
        <SkeletonReview />
      ) : savedReview ? (
        <div className="saved-review">
          <strong>Your Review:</strong>
          <p>{savedReview}</p>
        </div>
      ) : null}

      <button onClick={() => setShowReviewForm(!showReviewForm)}>
        {showReviewForm ? 'Cancel' : savedReview ? 'Edit Review' : 'Add Review'}
      </button>

      {showReviewForm && (
        <ReviewForm itemId={item.id} onSubmit={handleReviewSubmit} />
      )}
    </div>
  );
};

export default MediaItemCard;
