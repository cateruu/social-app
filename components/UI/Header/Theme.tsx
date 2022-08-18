import { NextPage } from 'next';

import styles from './Theme.module.css';

import { useTheme } from '../../../store/theme-context';

import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const Theme: NextPage = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className={styles.theme} onClick={changeTheme}>
      {theme === 'dark' && <BsFillSunFill />}
      {theme === 'light' && <BsFillMoonFill />}
    </div>
  );
};

export default Theme;
