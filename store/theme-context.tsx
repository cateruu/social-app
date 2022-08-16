import { createContext, useState } from 'react';
import { NextPage } from 'next';

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<string>('dark');

const ThemeContextProvider: NextPage<Props> = (props) => {
  const [theme, setTheme] = useState<string>('dark');

  const changeThemeHandler = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const contextValue: string = theme;

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
