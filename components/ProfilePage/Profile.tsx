import { useUser } from '@auth0/nextjs-auth0';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './Profile.module.css';

const Profile = () => {
  const { user, error, isLoading } = useUser();

  const router = useRouter();
  const { username } = router.query;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className={styles.profile}>
      <Image
        src={user?.picture!}
        alt={user?.username as string}
        width={100}
        height={100}
        className={styles.image}
      />
      <p className={styles.username}>{user?.username as string}</p>
    </section>
  );
};

export default Profile;
