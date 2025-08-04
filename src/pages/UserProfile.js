import React, { useEffect, useState } from 'react';
import { getUserProfile, saveUserProfile, ensureUserProfile } from '../utils/userProfile';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

const UserProfile = () => {
  const [profile, setProfile] = useState({ username: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await ensureUserProfile();
        const data = await getUserProfile();
        if (data) setProfile({ username: data.username || '', bio: data.bio || '' });
      } catch (err) {
        console.error('Error loading user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Ensure we only save fields with non-empty values
    const updates = {};
    if (profile.username.trim()) updates.username = profile.username.trim();
    if (profile.bio.trim()) updates.bio = profile.bio.trim();

    // Update Firestore with the new data
    await saveUserProfile(updates);
    setEditing(false);
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
    if (confirm) {
      try {
        const uid = auth.currentUser.uid;

        // 1. Delete user profile from Firestore
        await deleteDoc(doc(db, 'users', uid));

        // 2. Delete all customLists created by the user
        const q = query(collection(db, 'customLists'), where('userId', '==', uid));
        const snapshot = await getDocs(q);
        const deletions = snapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
        await Promise.all(deletions);

        // 3. Delete the user from Firebase Auth
        await auth.currentUser.delete();

        navigate('/');
      } catch (error) {
        alert('Error deleting account. You might need to re-authenticate.');
        console.error(error);
      }
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!auth.currentUser) return <p>Please sign in to view your profile.</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {auth.currentUser.email}</p>

      {editing ? (
        <>
          <div>
            <label>Username:</label><br />
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <label>Bio:</label><br />
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <button onClick={handleSave} style={{ marginTop: 10, marginRight: 10 }}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <button onClick={() => setEditing(true)} style={{ marginRight: 10 }}>Edit</button>
          <button onClick={handleDelete}>Delete Account</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
