"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, sendPasswordResetEmail, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async () => {
    if (!user?.email) return;
    await sendPasswordResetEmail(auth, user.email);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    resetPassword,
  };
}
