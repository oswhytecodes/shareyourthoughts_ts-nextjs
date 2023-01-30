import { createContext, useState, useEffect } from "react";

type ContextProvider = {
  children: React.ReactNode;
};
type Theme = "light" | "dark" | "";

type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeContextProvider = ({ children }: ContextProvider) => {
  const [theme, setTheme] = useState<Theme>("");

  useEffect(() => {
    let item = JSON.parse(localStorage.getItem("theme")!);
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

// type Username = string;
// export type UserNameType = string;
// export const UserNameContext = createContext("" as UserNameType);

// export const UserNameContextProvider = ({ children }: ContextProvider) => {
//   const [username, setUsername] = useState<string>("");
//   return (
//     <UserNameContext.Provider value={{ username, setUsername }}>
//       {children}
//     </UserNameContext.Provider>
//   );
// };
