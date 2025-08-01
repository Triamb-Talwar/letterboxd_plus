// src/utils/reviews.js

export const saveReview = (itemId, reviewText) => {
  localStorage.setItem(`review-${itemId}`, reviewText);
};

export const getReview = (itemId) => {
  return localStorage.getItem(`review-${itemId}`) || '';
};

export const saveRating = (itemId, rating) => {
  localStorage.setItem(`rating-${itemId}`, rating.toString());
};

export const getRating = (itemId) => {
  return parseInt(localStorage.getItem(`rating-${itemId}`)) || 0;
};
