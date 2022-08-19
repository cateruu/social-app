import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from './Post.module.css';

import { PostType } from './Feed';

interface Post {
  id: string;
  post: PostType;
  postPage: any;
}

const Post: NextPage<Post> = ({ id, post, postPage }) => {
  return (
    <div className={styles.post}>
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
      </div>
    </div>
  );
};

export default Post;
