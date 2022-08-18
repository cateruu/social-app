import { createContext, useContext, useState } from 'react';
import { NextPage } from 'next';

type Props = {
  children: React.ReactNode;
};

type ThemeType = {
  theme: string;
  changeTheme: () => void;
};

const ThemeContext = createContext<ThemeType>({
  theme: 'dark',
  changeTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider: NextPage<Props> = (props) => {
  const [theme, setTheme] = useState<string>('dark');

  const changeThemeHandler = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const contextValue: ThemeType = {
    theme: theme,
    changeTheme: changeThemeHandler,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
