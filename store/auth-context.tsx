import { createContext, useContext, useEffect, useState } from 'react';

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase';

type Props = {
  children: React.ReactNode;
};

// type AuthType = {
//   user: any;
//   signup: (email: string, password: string) => Promise<UserCredential>;
//   login: (email: string, password: string) => Promise<UserCredential>;
//   logout: () => void;
// };

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
        });
      } else {
        setUser(null);
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
    setUser(null);
    await signOut(auth);
  };

  const AuthValue = {
    user: user,
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
