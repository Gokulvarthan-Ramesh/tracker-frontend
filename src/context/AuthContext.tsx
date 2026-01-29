import { createContext, useState, type ReactNode, } from "react";

/** Context shape */
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

/** Provider props */
interface AuthProviderProps {
  children: ReactNode;
}

/** Create context */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Provider */
export default function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
