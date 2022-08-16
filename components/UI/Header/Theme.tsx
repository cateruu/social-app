import { useContext } from 'react';
import { NextPage } from 'next';

import styles from './Theme.module.css';

import { ThemeContext } from '../../../store/theme-context';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const Theme: NextPage = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <div className={styles.theme} onClick={themeCtx.changeTheme}>
      {themeCtx.theme === 'dark' && <BsFillSunFill />}
      {themeCtx.theme === 'light' && <BsFillMoonFill />}
    </div>
  );
};

export default Theme;
