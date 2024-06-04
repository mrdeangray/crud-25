import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState({ displayName: "DGray" });
  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider);
  };

  // useEffect(() => {
  //   const unsubscribed = onAuthStateChanged(auth, (u) => setCurrUser(u));
  //   return () => unsubscribed();
  // }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currUser, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
