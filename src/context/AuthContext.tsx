import { User } from "firebase/auth";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthProviderProps {
  value: {
    user: User | null;
  };
  children: ReactNode;
}
const AuthContext = createContext(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
}


export function useAuthValue() {
  return useContext(AuthContext);
}
