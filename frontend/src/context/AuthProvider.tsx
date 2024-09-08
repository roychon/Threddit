import { createContext, useEffect, useState, ReactNode } from 'react';
import { checkAuthStatus } from '../helpers/backendCommicators';
import { Types } from 'mongoose';

interface User {
  username: string;
  _id: Types.ObjectId;
  gradient: string;
}

interface UserAuth {
  user: User | null;
  isLoggedIn: boolean | null;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<UserAuth | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initialAuthCheck = async () => {
      try {
        const res = await checkAuthStatus();
        const { username, id, gradient } = res.data;
        console.log(gradient)
        setIsLoggedIn(true);
        setUser({ username, _id: id, gradient });
      } catch (e) {
        setIsLoggedIn(false);
      }
    };
    initialAuthCheck();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
