import Image from 'next/image';
import Moment from 'react-moment';
import styles from './Comment.module.css';

import { Comment } from './Comments';

type Props = {
  content: Comment;
};

const Comment = ({ content }: Props) => {
  return (
    <div className={styles.comment}>
      <div className={styles.avatarContainer}>
        <Image
          src={content.profilePic}
          alt={content.username}
          width={50}
          height={50}
          className={styles.profilePic}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.usernameContainer}>
          <h4 className={styles.username}>{content.username}</h4>
          <Moment fromNow className={styles.time}>
            {content?.timestamp?.toDate()}
          </Moment>
        </div>
        <p className={styles.text}>{content.comment}</p>
        {content.image && (
          <div className={styles.imageContainer}>
            <Image
              src={content.image}
              alt={content.username}
              layout='fill'
              className={styles.image}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
