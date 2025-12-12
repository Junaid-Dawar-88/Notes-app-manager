import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: number; name: string; email: string } | null;

interface AuthContextType {
  user: User;
  token: string | null;
  setAuth: (user: User, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setAuth: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("notes_auth");
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        setUser(obj.user);
        setToken(obj.token ?? null);
      } catch {
        localStorage.removeItem("notes_auth");
      }
    }
  }, []);

  const setAuth = (u: User, t?: string) => {
    setUser(u);
    if (t) setToken(t);
    localStorage.setItem("notes_auth", JSON.stringify({ user: u, token: t }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("notes_auth");
  };

  return <AuthContext.Provider value={{ user, token, setAuth, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
