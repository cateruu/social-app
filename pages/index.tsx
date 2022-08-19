import { useUser } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Head from 'next/head';

import PostInput from '../components/PostInput/PostInput';
import PostLogin from '../components/PostLogin/PostLogin';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Social App</title>
        <meta name='description' content='The best social app on earth.' />
      </Head>
      {!user ? <PostLogin /> : <PostInput />}
    </>
  );
};

export default Home;
