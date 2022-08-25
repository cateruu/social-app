import Link from 'next/link';
import { useRouter } from 'next/router';

import { useUser } from '@auth0/nextjs-auth0';

import styles from './Header.module.css';

import { useTheme } from '../../../app/theme-context';

import { BsFillPersonFill } from 'react-icons/bs';

import Theme from './Theme';

const Header = () => {
  const { theme } = useTheme();
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const username = user?.username;

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
            className={styles.profile}
            onClick={() => router.push(`/user/${username}`)}
          >
            <BsFillPersonFill />
          </button>
        )}
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
