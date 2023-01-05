import { createContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "";
type Username = string;
export type UserNameType = string;

export type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export type UsernameContextType = {
  username: Username;
  setUsername: React.Dispatch<React.SetStateAction<Theme>>;
};

type ContextProvider = {
  children: React.ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);
export const UserNameContext = createContext("" as UserNameType);

export const ThemeContextProvider = ({ children }: ContextProvider) => {
  const [theme, setTheme] = useState<Theme>("");

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("theme"));
    if (item) {
      setTheme(item);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const UserNameContextProvider = ({ children }: ContextProvider) => {
  const [username, setUsername] = useState<Username>("");
  return (
    <UserNameContext.Provider value={{ username, setUsername }}>
      {children}
    </UserNameContext.Provider>
  );
};
