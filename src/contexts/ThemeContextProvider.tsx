import { FC, createContext, useCallback, useEffect, useState } from "react";
import { Props } from "../interfaces/Types";

export interface IThemeContext {
  light: boolean;
  setTheme: (t: boolean) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  light: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeContextProvider: FC<Props> = ({ children }: Props) => {
  const [light, setLight] = useState<boolean>(false);

  // toggles the theme state
  const toggleTheme = () => setLight((prevState) => !prevState);

  //  Get the theme colorMode from Browser local storage and update the theme-context.
  useEffect(() => {
    setLight(() => {
      // if there's a value in the local storage, set it.
      const value = localStorage.getItem("colorMode");
      if (value) return JSON.parse(value);
      // if not take the light theme
      return light;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // saves/updates the theme color mode in local storage
  useEffect(() => localStorage.setItem("colorMode", String(light)), [light]);

  return (
    <ThemeContext.Provider
      value={{
        light,
        setTheme: useCallback((t: boolean) => setLight(t), []),
        toggleTheme: useCallback(() => toggleTheme(), []),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
