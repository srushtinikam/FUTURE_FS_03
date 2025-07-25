// context/AuthContext.js

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase";

// Create the context
const AuthContext = createContext();

// Provide context to the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/avatar.png");
  const isAdmin = user?.email === "srushtinikam8042@gmail.com"; // replace with your real admin email
 
  useEffect(() => {
    // Listen for auth state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
     
    });

    // Load profile image from localStorage
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    
    }
    return () => unsubscribe();
  }, []);


  // Auth actions
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("profileImage");
    setProfileImage("/avatar.png");
    setUser(null);
  };
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        resetPassword,
        profileImage,
        setProfileImage,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth
export function useAuth() {
  return useContext(AuthContext);
}
export const isAdminUser = (user) => user?.email === "srushtinikam8042@gmail.com";

