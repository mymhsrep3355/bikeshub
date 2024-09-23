"use client";

import { createContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    const protectedRoutes = ["/Seller", "/Buyer", "/Chats", "/Orders", "/profile", "/ads", "/stores"];

    if (!token) {
      if (protectedRoutes.includes(pathname) || pathname === "/") {
        router.push("/auth");
      }
    } else if (user) {
      if (user.userType === "seller" && pathname !== "/Seller" && !pathname.startsWith("/ads")) { //to solve redirection issues
        router.push("/Seller");
      } else if (user.userType === "buyer" && pathname !== "/Buyer") {
        router.push("/Buyer");
      }
    }
  }, [token, user, pathname, router, loading]);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(userToken);

    if (userData.type === "seller") {
      router.push("/Seller");
    } else if (userData.type === "buyer") {
      router.push("/Buyer");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
