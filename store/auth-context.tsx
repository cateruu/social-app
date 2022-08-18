import { createContext, useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: Props) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
