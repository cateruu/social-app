import { useState } from 'react';
import { NextPage } from 'next';

import styles from './Theme.module.css';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const Theme: NextPage = () => {
  const [theme, setTheme] = useState<string>('dark');

  const changeThemeHandler = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={styles.theme} onClick={changeThemeHandler}>
      {theme === 'dark' && <BsFillSunFill />}
      {theme === 'light' && <BsFillMoonFill />}
    </div>
  );
};

export default Theme;
