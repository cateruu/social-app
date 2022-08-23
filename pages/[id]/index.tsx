import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { doc, DocumentReference, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

import styles from './PostPage.module.css';

import { PostType } from '../../components/Feed/Feed';
import Post from '../../components/PostPage/Post';

import BackHome from '../../components/PostPage/BackHome';
import PostInput from '../../components/PostInput/PostInput';

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
      <BackHome />
      {!post && <div>Loading...</div>}
      {post && <Post post={post} id={id as string} />}
      <section className={styles.input}>
        <PostInput type='comment' />
      </section>
    </>
  );
};

export default PostPage;
