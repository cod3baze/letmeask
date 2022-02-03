import React, { createContext, useContext, useState } from "react";

import { auth, Firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type AuthContextData = {
  user: User;
  /**
   * sign with google using popUp window.
   * - after login, set user info on App Global State
   */
  signInWithGoogle(): Promise<void>;
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInWithGoogle(): Promise<void> {
    const provider = new Firebase.auth.GoogleAuthProvider();

    try {
      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid, email } = result.user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google account.");
        }

        setUser({
          id: uid,
          name: displayName,
          email: String(email),
          avatar: photoURL,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthProvider = () => useContext(AuthContext);
