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
import { CommentType } from '../../utils/types';

type Props = {
  id: string;
};

const Comments = ({ id }: Props) => {
  const { theme } = useTheme();

  const [comments, setComments] = useState<
    QueryDocumentSnapshot<CommentType>[] | null
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
          ) as CollectionReference<CommentType>,
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
