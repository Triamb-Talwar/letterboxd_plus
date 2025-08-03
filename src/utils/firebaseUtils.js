// utils/firebaseUtils.js
import { db } from '../firebase';
import {
  doc, setDoc, getDoc, deleteDoc,
  collection, getDocs, updateDoc
} from 'firebase/firestore';

// 🔧 Save user profile to Firestore
export const saveUserProfile = async (uid, data) => {
  const ref = doc(db, 'users', uid);
  await setDoc(ref, data, { merge: true });
};

// 🔍 Fetch user profile from Firestore
export const getUserProfile = async (uid) => {
  const ref = doc(db, 'users', uid);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};

// 🎯 Custom List Firestore Utils
export const saveCustomList = async (uid, listId, data) => {
  const ref = doc(db, 'users', uid, 'lists', listId);
  await setDoc(ref, {
    ...data,
    createdAt: new Date().toISOString()
  });
};

export const getCustomLists = async (uid) => {
  const ref = collection(db, 'users', uid, 'lists');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCustomList = async (uid, listId, updatedData) => {
  const ref = doc(db, 'users', uid, 'lists', listId);
  await updateDoc(ref, updatedData);
};

export const deleteCustomList = async (uid, listId) => {
  const ref = doc(db, 'users', uid, 'lists', listId);
  await deleteDoc(ref);
};

//
// 💬 REVIEW UTILS
//

// Save or update a review (mediaType can be "Movies" or "TV")
export const saveReview = async (uid, itemId, reviewData) => {
  const ref = doc(db, 'users', uid, 'reviews', itemId.toString());
  await setDoc(ref, {
    ...reviewData,
    updatedAt: new Date().toISOString()
  });
};

// Get a single review for a specific item
export const getReview = async (uid, itemId) => {
  const ref = doc(db, 'users', uid, 'reviews', itemId.toString());
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? snapshot.data() : null;
};

// Get all reviews (for "My Reviews" page, if needed later)
export const getAllReviews = async (uid) => {
  const ref = collection(db, 'users', uid, 'reviews');
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Delete a review
export const deleteReview = async (uid, itemId) => {
  const ref = doc(db, 'users', uid, 'reviews', itemId.toString());
  await deleteDoc(ref);
};
