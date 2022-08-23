import { MouseEvent, useEffect, useState } from 'react';

import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './Post.module.css';

import { PostType } from './Feed';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

import { useTheme } from '../../app/theme-context';
import { useUser } from '@auth0/nextjs-auth0';
import Moment from 'react-moment';
import { useAppDispatch } from '../../app/hooks';
import { openCommentModal } from '../../features/commentModalSlice';

interface Post {
  id: string;
  post: PostType;
  postPage?: any;
}

const Post: NextPage<Post> = ({ id, post }) => {
  const { theme } = useTheme();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { user, error, isLoading } = useUser();

  const [liked, setLiked] = useState<boolean>(false);
  const [likesArr, setLikesArr] = useState<DocumentData[]>([]);
  const [commentsArr, setCommentsArr] = useState<DocumentData[]>([]);

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikesArr(snapshot.docs);
    });
  }, [id]);

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => {
      setCommentsArr(snapshot.docs);
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
    <section
      className={`${styles.post} ${theme === 'light' && styles.light}`}
      onClick={() => router.push(`/${id}`)}
    >
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
        <div className={styles.usernameContainer}>
          <h4 className={styles.username}>{post.username}</h4>
          <Moment fromNow className={styles.time}>
            {post?.timestamp?.toDate()}
          </Moment>
        </div>
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
          <div
            className={styles.iconContainer}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              dispatch(
                openCommentModal({
                  post: {
                    ...post,
                    timestamp: post.timestamp.toDate().getTime(),
                  },
                  postId: id,
                })
              );
            }}
          >
            <FaRegComment />
            {commentsArr.length > 0 && (
              <span className={styles.amount}>{commentsArr.length}</span>
            )}
          </div>
          {user?.sub === post?.id && (
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
