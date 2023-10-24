import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState<string | null >(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<import("firebase/auth").User | null>(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data: any) => {
    checkIfIsCancelled();
    setLoading(true);

    try {
      const { user: newUser } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(newUser, {
        displayName: data.displayName,
      });
      setUser(newUser);
      setLoading(false);
      return newUser;
    } catch (error: any) {
      console.log(error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    user,
    error,
    loading,
    setUser,
  };
};
