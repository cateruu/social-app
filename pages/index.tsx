import type { NextPage } from 'next';
import Head from 'next/head';

import PostInput from '../components/PostInput/PostInput';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Social App</title>
        <meta name='description' content='The best social app on earth.' />
      </Head>
      <PostInput />
    </>
  );
};

export default Home;
