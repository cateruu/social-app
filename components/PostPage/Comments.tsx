import { Key, useEffect, useState } from 'react';

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

import styles from './Comments.module.css';

import { uuid } from 'uuidv4';

import Comment from './Comment';
import { useTheme } from '../../app/theme-context';

export type Comment = {
  id: string;
  username: string;
  profilePic: string;
  comment: string;
  image?: string;
  timestamp: Timestamp;
};

type Props = {
  id: string;
};

const Comments = ({ id }: Props) => {
  const { theme } = useTheme();

  const [comments, setComments] = useState<
    QueryDocumentSnapshot<Comment>[] | null
  >(null);

  useEffect(() => {
    if (id) {
      onSnapshot(
        query(
          collection(
            db,
            'posts',
            id!,
            'comments'
          ) as CollectionReference<Comment>,
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      );
    }
  }, [id]);

  return (
    <section
      className={`${styles.comments} ${theme === 'light' && styles.light}`}
    >
      {comments?.map((comment) => (
        <Comment key={uuid()} content={comment.data()} />
      ))}
    </section>
  );
};

export default Comments;
