import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
}

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios
        .get('/profile') 
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              navigate("/login");
            } else {
              console.error("API Error:", error.response.data);
            }
          } else {
            console.error("Unexpected Error:", error.message);
          }
        });
    }
  }, [user, navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
