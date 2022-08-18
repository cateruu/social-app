import { createContext, useContext, useEffect, useState } from 'react';

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
} from 'firebase/auth';

import { auth, db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

type Props = {
  children: React.ReactNode;
};

type AuthType = {
  userAuth: User | null;
  signup: (email: string, password: string) => Promise<UserCredential> | void;
  login: (email: string, password: string) => Promise<UserCredential> | void;
  logout: () => void;
};

const AuthContext = createContext<AuthType>({
  userAuth: null,
  signup: (email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: Props) => {
  const [userAuth, setUserAuth] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUserAuth({
          uid: user?.uid,
          email: user?.email,
        });
      } else {
        setUserAuth(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUserAuth(null);
    await signOut(auth);
  };

  const AuthValue: AuthType = {
    userAuth: userAuth,
    signup: signup,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={AuthValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
