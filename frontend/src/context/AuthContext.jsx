import { createContext, useContext, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

function readUser() {
  const raw = localStorage.getItem("smartstudy_user");
  return raw ? JSON.parse(raw) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [token, setToken] = useState(localStorage.getItem("smartstudy_token"));

  const persistSession = (session) => {
    localStorage.setItem("smartstudy_token", session.token);
    localStorage.setItem("smartstudy_user", JSON.stringify(session.user));
    setToken(session.token);
    setUser(session.user);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      async login(payload) {
        const session = await authService.login(payload);
        persistSession(session);
      },
      async register(payload) {
        const session = await authService.register(payload);
        persistSession(session);
      },
      logout() {
        localStorage.removeItem("smartstudy_token");
        localStorage.removeItem("smartstudy_user");
        setToken(null);
        setUser(null);
      }
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
