import Image from 'next/image';

import styles from './PostInput.module.css';

const PostInput = () => {
  return (
    <section className={styles.input}>
      <div className={styles.avatarContainer}>
        <Image
          src='https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg'
          alt='avatar'
          width={40}
          height={40}
          className={styles.avatar}
        />
      </div>
    </section>
  );
};

export default PostInput;
