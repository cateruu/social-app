import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeCommentModal } from '../../features/commentModalSlice';

import styles from './CommentModal.module.css';

import { IoMdClose } from 'react-icons/io';
import Moment from 'react-moment';

import PostInput from '../PostInput/PostInput';
import { Timestamp } from 'firebase/firestore';

const CommentModal = () => {
  const dispatch = useAppDispatch();
  const { postInfo, postId } = useAppSelector((state) => state.commentModal);

  const date = new Timestamp(
    postInfo?.timestamp.seconds!,
    postInfo?.timestamp.nanoseconds!
  );

  return (
    <>
      <div
        className={styles.bg}
        onClick={() => dispatch(closeCommentModal())}
      ></div>
      <div className={styles.reply}>
        <div className={styles.close}>
          <IoMdClose onClick={() => dispatch(closeCommentModal())} />
        </div>
        <div className={styles.post}>
          <div className={styles.profilePicContainer}>
            <Image
              src={postInfo?.profilePic!}
              alt={postInfo?.username}
              width={50}
              height={50}
              className={styles.profilePic}
            />
            <div className={styles.line}></div>
          </div>
          <div className={styles.container}>
            <div className={styles.usernameContainer}>
              <h4 className={styles.username}>{postInfo?.username}</h4>
              <Moment fromNow className={styles.time}>
                {date.toDate()}
              </Moment>
            </div>
            <div>
              {postInfo?.text && (
                <p className={styles.text}>{postInfo?.text}</p>
              )}
              {postInfo?.image && (
                <a
                  href={postInfo.image}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.imageUrl}
                >
                  check image
                </a>
              )}
            </div>
            <p className={styles.replying}>Replying to {postInfo?.username}</p>
          </div>
        </div>
        <PostInput type='comment' id={postId} />
      </div>
    </>
  );
};

export default CommentModal;
