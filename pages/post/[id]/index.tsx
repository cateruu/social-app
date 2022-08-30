import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { doc, DocumentReference, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

import styles from './PostPage.module.css';

import Post from '../../../components/PostPage/Post';

import BackHome from '../../../components/PostPage/BackHome';
import PostInput from '../../../components/PostInput/PostInput';
import Comments from '../../../components/PostPage/Comments';
import { useTheme } from '../../../app/theme-context';
import { useUser } from '@auth0/nextjs-auth0';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../../app/hooks';
import Error from '../../../components/Error/Error';
import { PostType } from '../../../utils/types';

const PostPage = () => {
  const { theme } = useTheme();

  const { errorOpen } = useAppSelector((state) => state.error);

  const { user, error, isLoading } = useUser();

  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<PostType | undefined>(undefined);

  useEffect(() => {
    if (id) {
      onSnapshot(
        doc(db, 'posts', id! as string) as DocumentReference<PostType>,
        (snapshot) => {
          setPost(snapshot.data());
        }
      );
    }
  }, [id]);

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
        <title>
          {post?.username} on Social: {`"${post?.text}"`}
        </title>
        <meta name='description' content='Post page on Social app' />
        <meta
          name='keywords'
          content='Social app, social, social media, post'
        />
        <meta name='author' content='Paweł Kromołowski' />
      </Head>
      <AnimatePresence>{errorOpen && <Error />}</AnimatePresence>
      <BackHome />
      {!post && (
        <div className='loading'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {post && <Post post={post} id={id as string} />}
      <section
        className={`${styles.input} ${theme === 'light' && styles.light}`}
      >
        {user && <PostInput type='comment' id={id as string} />}
        {!user && (
          <p
            className={`${styles.info} ${
              theme === 'light' && styles.lightInfo
            }`}
          >
            Login to reply
          </p>
        )}
      </section>
      <Comments id={id as string} />
    </>
  );
};

export default PostPage;
