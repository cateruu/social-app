import {
  deleteDoc,
  doc,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from './Post.module.css';

import { PostType } from './Feed';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

import { useTheme } from '../../store/theme-context';
import { useUser } from '@auth0/nextjs-auth0';
import { MouseEvent } from 'react';
import { db } from '../../config/firebase';
import { useRouter } from 'next/router';

interface Post {
  id: string;
  post: PostType;
  postPage: any;
}

const Post: NextPage<Post> = ({ id, post, postPage }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section className={`${styles.post} ${theme === 'light' && styles.light}`}>
      <div className={styles.profilePicContainer}>
        <Image
          src={post.profilePic}
          alt={id}
          width={40}
          height={40}
          className={styles.profilePic}
        />
      </div>
      <div className={styles.container}>
        <h4 className={styles.username}>{post.username}</h4>
        <p className={styles.text}>{post.text}</p>
        {post.image && (
          <div className={styles.imageContainer}>
            <Image
              src={post.image}
              alt={post.username}
              layout='fill'
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.actionsContainer}>
          <div className={styles.iconContainer}>
            <AiOutlineHeart />
            <span className={styles.amount}>777</span>
          </div>
          <div className={styles.iconContainer}>
            <FaRegComment />
            <span className={styles.amount}>777</span>
          </div>
          {user?.sub === post.id && (
            <div className={`${styles.iconContainer} ${styles.delete}`}>
              <FiTrash2
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, 'posts', id));
                  router.push('/');
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Post;
