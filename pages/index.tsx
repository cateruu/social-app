import type { NextPage } from 'next';
import Head from 'next/head';

import { useAuth } from '../store/auth-context';

import PostInput from '../components/PostInput/PostInput';
import PostLogin from '../components/PostLogin/PostLogin';

const Home: NextPage = () => {
  const { userAuth } = useAuth();

  return (
    <>
      <Head>
        <title>Social App</title>
        <meta name='description' content='The best social app on earth.' />
      </Head>
      {userAuth && <PostInput />}
      {!userAuth && <PostLogin />}
    </>
  );
};

export default Home;
