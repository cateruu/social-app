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

const PostPage = () => {
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
      <section className={styles.input}>
        <PostInput type='comment' id={id as string} />
      </section>
      <Comments id={id as string} />
    </>
  );
};

export default PostPage;
