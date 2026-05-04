import { createContext, useContext, useState } from 'react';

// Comptes de démonstration
const DEMO_ACCOUNTS = [
  { id: 'u1', name: 'Souleymane Traoré', email: 'souleymane@civicvote.ml', password: 'Souleymane', role: 'USER'  },
  { id: 'u2', name: 'Ibrahim Coulibaly',  email: 'ibore@civicvote.ml',      password: 'Ibrahim',    role: 'ADMIN' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cv_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  function login(email, password) {
    const found = DEMO_ACCOUNTS.find(
      (u) => u.email === email.trim() && u.password === password
    );
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('cv_user', JSON.stringify(safeUser));
      return { success: true, role: safeUser.role };
    }
    return { success: false };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('cv_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
