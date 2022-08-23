import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { doc, DocumentReference, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

import styles from './PostPage.module.css';

import { PostType } from '../../components/Feed/Feed';
import Post from '../../components/PostPage/Post';

import BackHome from '../../components/PostPage/BackHome';
import PostInput from '../../components/PostInput/PostInput';
import Comments from '../../components/PostPage/Comments';
import { useTheme } from '../../app/theme-context';
import { useUser } from '@auth0/nextjs-auth0';

const PostPage = () => {
  const { theme } = useTheme();

  const { user, error, isLoading } = useUser();

  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<PostType | undefined>(undefined);

  useEffect(
    () =>
      onSnapshot(
        doc(db, 'posts', id! as string) as DocumentReference<PostType>,
        (snapshot) => {
          setPost(snapshot.data());
        }
      ),
    [id]
  );

  return (
    <>
      <Head>
        <title>
          {post?.username} on Social: {`"${post?.text}"`}
        </title>
        <meta name='description' content='Post page on Social app' />
      </Head>
      <BackHome />
      {!post && <div>Loading...</div>}
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
