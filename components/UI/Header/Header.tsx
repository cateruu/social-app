import Link from 'next/link';

import styles from './Header.module.css';

import { useTheme } from '../../../store/theme-context';

import Theme from './Theme';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 className={`${styles.name} ${theme === 'light' && styles.light}`}>
          Social
        </h1>
      </Link>
      <div className={styles.container}>
        <Theme />
        <a href='/api/auth/login'>
          <button className={`${styles.button} ${styles.login}`}>Login</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
