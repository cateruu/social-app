import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import PostInput from '../components/PostInput/PostInput';
import PostLogin from '../components/PostLogin/PostLogin';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
};
