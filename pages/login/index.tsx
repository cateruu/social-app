import { useContext } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import { ThemeContext } from '../../store/theme-context';

import styles from '../../styles/Auth.module.css';

const LoginPage: NextPage = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <section className={styles.auth}>
      <h1
        className={`${styles.header} ${
          themeCtx.theme === 'light' && styles.lightHeader
        }`}
      >
        Login
      </h1>
      <form className={styles.form}>
        <input
          type='email'
          placeholder='Email'
          className={`${styles.input} ${
            themeCtx.theme === 'light' && styles.lightInput
          }`}
        />
        <input
          type='password'
          placeholder='Password'
          className={`${styles.input} ${
            themeCtx.theme === 'light' && styles.lightInput
          }`}
        />
        <button className={styles.submit}>Login</button>
      </form>
      <Link href='/signup'>
        <span className={styles.link}>Dont have an account? Sign up</span>
      </Link>
    </section>
  );
};

export default LoginPage;
