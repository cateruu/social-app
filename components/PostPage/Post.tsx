import { MouseEvent } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

import { useUser } from '@auth0/nextjs-auth0';

import { PostType } from '../Feed/Feed';

import styles from './Post.module.css';
import { FiTrash2 } from 'react-icons/fi';

type Post = {
  post: PostType;
  id: string;
};

const Post = ({ post, id }: Post) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  return (
    <section className={styles.post}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <Image
            src={post.profilePic}
            alt={post.username}
            width={50}
            height={50}
            className={styles.profilePic}
          />
          <p className={styles.username}>{post.username}</p>
        </div>
        {user?.sub === post?.id && (
          <div className={styles.delete}>
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
      <div className={styles.container}>
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
      </div>
    </section>
  );
};

export default Post;
