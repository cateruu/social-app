import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useTheme } from '../../app/theme-context';

import styles from './Profile.module.css';

const Profile = () => {
  const { user, error, isLoading } = useUser();
  const { theme } = useTheme();

  if (isLoading)
    return (
      <div className='loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <section
      className={`${styles.profile} ${theme === 'light' && styles.light}`}
    >
      <Image
        src={user?.picture!}
        alt={user?.username as string}
        width={100}
        height={100}
        className={styles.image}
      />
      <p
        className={`${styles.username} ${
          theme === 'light' && styles.lightUsername
        }`}
      >
        {user?.username as string}
      </p>
    </section>
  );
};

export default Profile;
