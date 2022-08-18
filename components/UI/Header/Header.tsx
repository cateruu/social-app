import Link from 'next/link';

import styles from './Header.module.css';

import { useTheme } from '../../../store/theme-context';
import { useAuth } from '../../../store/auth-context';

import Theme from './Theme';

const Header = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 className={`${styles.name} ${theme === 'light' && styles.light}`}>
          Social
        </h1>
      </Link>
      <div className={styles.container}>
        <Theme />
        {user && (
          <button
            className={`${styles.button} ${styles.logout}`}
            onClick={logout}
          >
            Logout
          </button>
        )}
        {!user && (
          <Link href='/login'>
            <button className={`${styles.button} ${styles.login}`}>
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
