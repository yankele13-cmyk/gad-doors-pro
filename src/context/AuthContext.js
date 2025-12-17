'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ===== RBAC: Liste des emails autorisés comme admin =====
  // Chargé depuis .env.local pour la sécurité
  const ALLOWED_ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(email => email.trim());

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // RBAC CHECK: Vérifier si l'email est dans la liste des admins autorisés
      if (!ALLOWED_ADMIN_EMAILS.includes(userCredential.user.email)) {
        // Si non autorisé, déconnecter immédiatement et rejeter
        await signOut(auth);
        return { success: false, error: 'Accès non autorisé. Vous n\'êtes pas administrateur.' };
      }

      return { success: true };
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Login error:', error);
      }
      let errorMessage = 'Erreur de connexion';
      if (error.code === 'auth/invalid-credential') errorMessage = 'Email ou mot de passe incorrect';
      if (error.code === 'auth/too-many-requests') errorMessage = 'Trop de tentatives, réessayez plus tard';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-neutral-900">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
