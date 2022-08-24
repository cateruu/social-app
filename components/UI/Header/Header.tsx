import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

import styles from './Header.module.css';

import { useTheme } from '../../../app/theme-context';

import Theme from './Theme';

const Header = () => {
  const { theme } = useTheme();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <header className={styles.header}>
      <Link href='/'>
        <h1 className={`${styles.name} ${theme === 'light' && styles.light}`}>
          Social
        </h1>
      </Link>
      <div className={styles.container}>
        <Theme />
        {!user && (
          <Link href='/api/auth/login'>
            <button className={`${styles.button} ${styles.login}`}>
              Login
            </button>
          </Link>
        )}
        {user && (
          <Link href='/api/auth/logout'>
            <button className={`${styles.button} ${styles.logout}`}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
