import Image from 'next/image';
import Moment from 'react-moment';
import { useTheme } from '../../app/theme-context';
import { CommentType } from '../../utils/types';
import styles from './Comment.module.css';

type Props = {
  content: CommentType;
};

const Comment = ({ content }: Props) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.comment} ${theme === 'light' && styles.light}`}>
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
