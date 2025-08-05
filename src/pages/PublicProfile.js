import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/PublicProfile.css';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setProfile(null);
        } else {
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();

          const listsRef = collection(db, 'users', userDoc.id, 'lists');
          const listsSnap = await getDocs(listsRef);

          let lists = {};
          listsSnap.forEach(doc => {
            lists[doc.id] = doc.data();
          });

          const sortedLists = Object.fromEntries(
            Object.entries(lists).sort(([, a], [, b]) => {
              const dateA = new Date(a.updatedAt || 0);
              const dateB = new Date(b.updatedAt || 0);
              return dateB - dateA;
            })
          );

          userData.lists = sortedLists;
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
    <div className="public-profile-container">
      <div className="profile-header">
        <h2>{profile.username}</h2>
        <p>{profile.bio}</p>
      </div>

      {profile.lists && Object.keys(profile.lists).length > 0 ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{profile.username}'s Lists</h3>
          <div className="user-lists">
            {Object.entries(profile.lists).map(([listId, list]) => (
              <div className="list-container" key={listId}>
                <div className="list-title">{list.name || 'Untitled List'}</div>
                {Array.isArray(list.items) && list.items.length > 0 ? (
                  list.items.map((item, index) => (
                    <div className="media-item" key={index}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title || 'Media'}
                        />
                      )}
                      <div style={{ marginTop: 5, fontSize: '0.9rem' }}>
                        {item.title || 'Untitled'} ({item.type || 'Unknown'})
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: 'italic', color: '#666', textAlign: 'center' }}>
                    This list has no items.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>This user has no public lists.</p>
      )}
    </div>
  );
};

export default PublicProfile;
