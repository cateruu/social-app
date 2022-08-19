import styles from './PostLogin.module.css';

const PostLogin = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>You have to be logged in to post</p>
      <a href='/api/auth/login'>
        <button className={styles.button}>Login</button>
      </a>
    </div>
  );
};

export default PostLogin;
