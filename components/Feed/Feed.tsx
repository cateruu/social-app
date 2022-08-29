import { useEffect, useState } from 'react';

import {
  collection,
  CollectionReference,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

import styles from './Feed.module.css';

import Post from './Post';
import { useUser } from '@auth0/nextjs-auth0';

export interface PostType {
  id: string;
  image: string;
  profilePic: string;
  text: string;
  timestamp: Timestamp;
  username: string;
}

type Props = {
  type?: string;
};

const Feed = ({ type }: Props) => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<PostType>[] | null>(
    null
  );
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    let queryRef;
    if (type === 'profile' && user) {
      queryRef = query(
        collection(db, 'posts') as CollectionReference<PostType>,
        where('username', '==', user?.username)
      );
    } else {
      queryRef = query(
        collection(db, 'posts') as CollectionReference<PostType>,
        orderBy('timestamp', 'desc')
      );
    }

    return onSnapshot(queryRef, (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, [type, user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className={styles.feed}>
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
      {posts?.length! < 1 && type === 'profile' ? (
        <p>You have no posts</p>
      ) : null}
    </section>
  );
};

export default Feed;
