import { db } from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  // Handle Memory Leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Register
  const createUser = async data => {
    checkIfIsCancelled();
    setError(null);

    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      });

      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage = 'A Senha precisa conter pelo menos 6 caracteres';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'Email já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro. Por favor tente mais tarde.';
      }
      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // Login

  const login = async data => {
    checkIfIsCancelled();
    setError(null);

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'Usuário não encontrado.';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Senha Incorreta.';
      } else {
        systemErrorMessage = 'Ocorreu um erro. Tente mais tarde.';
      }
      setError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };
};
