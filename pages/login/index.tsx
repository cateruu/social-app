import { FormEvent, useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

import { useTheme } from '../../store/theme-context';

import Head from 'next/head';

import styles from '../../styles/Auth.module.css';

const LoginPage: NextPage = () => {
  const themeCtx = useTheme();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    console.log(emailRef.current?.value);
    console.log(passwordRef.current?.value);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name='description'
          content='Login to the best social app on earth'
        />
      </Head>
      <section className={styles.auth}>
        <h1
          className={`${styles.header} ${
            themeCtx.theme === 'light' && styles.lightHeader
          }`}
        >
          Login
        </h1>
        <form className={styles.form} onSubmit={submitHandler}>
          <input
            type='email'
            placeholder='Email'
            className={`${styles.input} ${
              themeCtx.theme === 'light' && styles.lightInput
            }`}
            ref={emailRef}
          />
          <input
            type='password'
            placeholder='Password'
            className={`${styles.input} ${
              themeCtx.theme === 'light' && styles.lightInput
            }`}
            ref={passwordRef}
          />
          <button className={styles.submit}>Login</button>
        </form>
        <Link href='/signup'>
          <span className={styles.link}>Dont have an account? Sign up</span>
        </Link>
      </section>
    </>
  );
};

export default LoginPage;
