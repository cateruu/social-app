import Link from 'next/link';

import styles from './BackHome.module.css';

import { IoArrowBackOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { useTheme } from '../../app/theme-context';

const BackHome = () => {
  const { theme } = useTheme();

  return (
    <IconContext.Provider
      value={{
        className: `${styles.back} ${theme === 'light' && styles.light}`,
      }}
    >
      <Link href='/'>
        <IoArrowBackOutline />
      </Link>
    </IconContext.Provider>
  );
};

export default BackHome;
