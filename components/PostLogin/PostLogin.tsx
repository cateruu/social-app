import Link from 'next/link';
import styles from './PostLogin.module.css';

const PostLogin = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>You have to be logged in to post</p>
      <Link href='/api/auth/login'>
        <button className={styles.button}>Login</button>
      </Link>
    </div>
  );
};

export default PostLogin;
