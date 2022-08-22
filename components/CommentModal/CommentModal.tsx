import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeCommentModal } from '../../features/commentModalSlice';

import styles from './CommentModal.module.css';

import { IoMdClose } from 'react-icons/io';

const CommentModal = () => {
  const dispatch = useAppDispatch();
  const { postInfo } = useAppSelector((state) => state.commentModal);

  return (
    <>
      <div
        className={styles.bg}
        onClick={() => dispatch(closeCommentModal())}
      ></div>
      <div className={styles.reply}>
        <IoMdClose />
      </div>
    </>
  );
};

export default CommentModal;
