import { useUser } from '@auth0/nextjs-auth0';
import { AnimatePresence } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector } from '../app/hooks';
import CommentModal from '../components/CommentModal/CommentModal';
import Error from '../components/Error/Error';
import Feed from '../components/Feed/Feed';

import PostInput from '../components/PostInput/PostInput';
import PostLogin from '../components/PostLogin/PostLogin';

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const { isOpen } = useAppSelector((state) => state.commentModal);
  const { errorOpen } = useAppSelector((state) => state.error);

  if (isLoading)
    return (
      <div className='loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Social App</title>
        <meta name='description' content='The best social app on earth.' />
      </Head>
      <AnimatePresence>{errorOpen && <Error />}</AnimatePresence>
      {isOpen && <CommentModal />}
      {!user ? <PostLogin /> : <PostInput type='post' />}
      <Feed />
    </>
  );
};

export default Home;
