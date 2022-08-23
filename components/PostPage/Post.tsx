import { MouseEvent, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

import { useUser } from '@auth0/nextjs-auth0';

import { PostType } from '../Feed/Feed';

import styles from './Post.module.css';
import { FiTrash2 } from 'react-icons/fi';

import { postCreationTime } from '../../utils/postCreationTime';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Post = {
  post: PostType;
  id: string;
};

const Post = ({ post, id }: Post) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const [liked, setLiked] = useState<boolean>(false);
  const [likesArr, setLikesArr] = useState<DocumentData[]>([]);

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikesArr(snapshot.docs);
    });
  }, [id]);

  useEffect(
    () => setLiked(likesArr.findIndex((like) => user?.sub === like.id) !== -1),
    [likesArr, user]
  );

  const likePost = async () => {
    if (user) {
      if (liked) {
        await deleteDoc(doc(db, 'posts', id!, 'likes', user?.sub!));
      } else {
        await setDoc(doc(db, 'posts', id!, 'likes', user?.sub!), {
          username: user?.nickname,
        });
      }
    } else {
      console.error('please login');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <article className={styles.post}>
      <section className={styles.header}>
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
      </section>
      <section className={styles.container}>
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
      </section>
      <section className={styles.date}>
        {postCreationTime(post.timestamp)}
      </section>
      <section className={styles.buttons}>
        <div
          className={`${styles.iconContainer} ${liked && styles.liked}`}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            likePost();
          }}
        >
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          {likesArr.length > 0 && (
            <span className={styles.amount}>{likesArr.length}</span>
          )}
        </div>
      </section>
    </article>
  );
};

export default Post;
