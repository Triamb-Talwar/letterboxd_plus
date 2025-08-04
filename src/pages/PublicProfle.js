import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username.toLowerCase()));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setProfile(null);
        } else {
          const userData = snapshot.docs[0].data();
          setProfile(userData);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found.</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <div style={{ textAlign: 'center' }}>
        {profile.photoURL && (
          <img
            src={profile.photoURL}
            alt={`${profile.username}'s avatar`}
            style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 10 }}
          />
        )}
        <h2>{profile.username}</h2>
        <p>{profile.bio}</p>
      </div>

      {profile.lists && Object.keys(profile.lists).length > 0 ? (
        <div style={{ marginTop: 20 }}>
          <h3>{profile.username}'s Lists</h3>
          {Object.entries(profile.lists).map(([listId, list]) => (
            <div key={listId} style={{ border: '1px solid #ccc', padding: 10, borderRadius: 8, marginBottom: 10 }}>
              <h4>{list.name || 'Untitled List'}</h4>
              <ul>
                {(list.items || []).map((item, index) => (
                  <li key={index}>
                    {item.title} ({item.type})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>This user has no public lists.</p>
      )}
    </div>
  );
};

export default PublicProfile;
