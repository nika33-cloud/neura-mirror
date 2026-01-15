import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const baseUrl = "/api";
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/auth/validate`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          setUserData(res.data.user);
        } else {
          setUserData(null);
        }
      } catch {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    validateUser();
  }, []);

  const logout = async () => {
    await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
