import { useContext } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import { ThemeContext } from '../../store/theme-context';

import styles from '../../styles/Auth.module.css';
import Head from 'next/head';

const SignupPage: NextPage = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta
          name='description'
          content='Sign up to the best social app on earth'
        />
      </Head>
      <section className={styles.auth}>
        <h1
          className={`${styles.header} ${
            themeCtx.theme === 'light' && styles.lightHeader
          }`}
        >
          Sign up
        </h1>
        <form className={styles.form}>
          <input
            type='text'
            placeholder='Username'
            className={`${styles.input} ${
              themeCtx.theme === 'light' && styles.lightInput
            }`}
          />
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
          <input
            type='password'
            placeholder='Confirm password'
            className={`${styles.input} ${
              themeCtx.theme === 'light' && styles.lightInput
            }`}
          />
          <button className={styles.submit}>Sign up</button>
        </form>
        <Link href='/login'>
          <span className={styles.link}>Already have an account? Login</span>
        </Link>
      </section>
    </>
  );
};

export default SignupPage;
