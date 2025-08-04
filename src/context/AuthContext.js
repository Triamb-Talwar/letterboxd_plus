import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // your configured firebase auth instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ Mark loading as false when auth check completes
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.clear(); // ✅ Clears stored lists/reviews etc. from previous users
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children} {/* ✅ Only render children after auth status is known */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
