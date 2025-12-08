import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      
      const { token, user: userData } = response.data; 
      
      const userToSave = { id: response.data.id, username: response.data.username };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userToSave));
      
      setUser(userToSave);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Erro ao logar" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};