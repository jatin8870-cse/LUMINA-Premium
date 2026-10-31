import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as auth from '../api/authService';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('lumina-token')));
  useEffect(() => { if (!localStorage.getItem('lumina-token')) return setLoading(false); auth.me().then(r => setUser(r.data.data)).catch(() => localStorage.removeItem('lumina-token')).finally(() => setLoading(false)); }, []);
  const login = async data => { const r = await auth.login(data); localStorage.setItem('lumina-token', r.data.data.token); setUser(r.data.data.user); return r.data.data.user; };
  const register = async data => { const r = await auth.register(data); localStorage.setItem('lumina-token', r.data.data.token); setUser(r.data.data.user); return r.data.data.user; };
  const logout = () => { localStorage.removeItem('lumina-token'); setUser(null); };
  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
