import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  role: "user" | "moderator" | "admin";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Event enthusiast who loves bringing people together.",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: "1",
        name: "John Doe",
        email,
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
        bio: "Event enthusiast who loves bringing people together.",
        role: "user",
      });
      setLoading(false);
    }, 1500);
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: "1",
        name: userData.name,
        email: userData.email,
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
        bio: "New to the community and excited to explore local events!",
        role: "user",
      });
      setLoading(false);
    }, 1500);
  };

  const logout = async () => {
    setUser(null);
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...profileData });
    }
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };
}
