// src/utils/userProfile.js
import { db } from '../firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth'; // ✅ Added

const getUserId = () => auth.currentUser?.uid;

const getUserRef = () => {
  const uid = getUserId();
  if (!uid) throw new Error('User not authenticated');
  return doc(db, 'users', uid);
};

export const getUserProfile = async () => {
  try {
    const ref = getUserRef();
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
};

export const saveUserProfile = async (profileData) => {
  try {
    const ref = getUserRef();
    await setDoc(ref, {
      ...profileData,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // ✅ Sync Firebase Auth displayName with username
    if (auth.currentUser && profileData.username) {
      await updateProfile(auth.currentUser, {
        displayName: profileData.username,
      });
    }
    await auth.currentUser.reload();
  } catch (err) {
    console.error('Error saving profile:', err);
  }
};

export const deleteUserProfile = async () => {
  try {
    const ref = getUserRef();
    await deleteDoc(ref);
  } catch (err) {
    console.error('Error deleting profile:', err);
  }
};

export const ensureUserProfile = async () => {
  try {
    const ref = getUserRef();
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      await setDoc(ref, {
        username: auth.currentUser?.displayName || 'New User',
        bio: '',
        createdAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error('Error ensuring profile exists:', err);
  }
};
