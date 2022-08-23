import { useEffect, useState } from 'react';

import {
  collection,
  CollectionReference,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

import styles from './Feed.module.css';

import Post from './Post';

export interface PostType {
  id: string;
  image: string;
  profilePic: string;
  text: string;
  timestamp: Timestamp;
  username: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<PostType>[] | null>(
    null
  );

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, 'posts') as CollectionReference<PostType>,
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <section className={styles.feed}>
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
    </section>
  );
};

export default Feed;
