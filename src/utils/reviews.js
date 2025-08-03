import { db, auth } from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';

const getUserId = () => {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');
  return uid;
};

const getReviewRef = (itemId) => {
  const uid = getUserId();
  return doc(db, 'users', uid, 'reviews', String(itemId));
};

// Save review
export const saveReview = async (itemId, reviewText) => {
  const ref = getReviewRef(itemId);
  await setDoc(ref, {
    review: reviewText,
    updatedAt: new Date().toISOString()
  }, { merge: true });
};

// Get review
export const getReview = async (itemId) => {
  try {
    const ref = getReviewRef(itemId);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? snapshot.data().review || '' : '';
  } catch (err) {
    console.error('Error fetching review:', err);
    return '';
  }
};

// Save rating
export const saveRating = async (itemId, rating) => {
  const ref = getReviewRef(itemId);
  await setDoc(ref, {
    rating,
    updatedAt: new Date().toISOString()
  }, { merge: true });
};

// Get rating
export const getRating = async (itemId) => {
  try {
    const ref = getReviewRef(itemId);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? snapshot.data().rating || 0 : 0;
  } catch (err) {
    console.error('Error fetching rating:', err);
    return 0;
  }
};

// Delete review (optional helper)
export const deleteReview = async (itemId) => {
  const ref = getReviewRef(itemId);
  await deleteDoc(ref);
};
