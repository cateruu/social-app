import { FormEvent, useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import { useTheme } from '../../store/theme-context';

import styles from '../../styles/Auth.module.css';
import Head from 'next/head';

const SignupPage: NextPage = () => {
  const { theme } = useTheme();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
  };

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
            theme === 'light' && styles.lightHeader
          }`}
        >
          Sign up
        </h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <input
            type='text'
            placeholder='Username'
            className={`${styles.input} ${
              theme === 'light' && styles.lightInput
            }`}
            ref={usernameRef}
          />
          <input
            type='email'
            placeholder='Email'
            className={`${styles.input} ${
              theme === 'light' && styles.lightInput
            }`}
            ref={emailRef}
          />
          <input
            type='password'
            placeholder='Password'
            className={`${styles.input} ${
              theme === 'light' && styles.lightInput
            }`}
            ref={passwordRef}
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
