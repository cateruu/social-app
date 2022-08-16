import { useContext, useState } from 'react';
import Image from 'next/image';

import { ThemeContext } from '../../store/theme-context';

import styles from './PostInput.module.css';

import TextareaAutosize from 'react-textarea-autosize';

const PostInput = () => {
  const themeCtx = useContext(ThemeContext);

  const [textInput, setTextInput] = useState<string>('');

  return (
    <section
      className={`${styles.input} ${
        themeCtx.theme === 'light' ? styles.light : null
      }`}
    >
      <div className={styles.avatarContainer}>
        <Image
          src='https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg'
          alt='avatar'
          width={50}
          height={50}
          className={styles.avatar}
        />
      </div>
      <div className={styles.textContainer}>
        <TextareaAutosize
          placeholder='Tell me something...'
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className={`${styles.text} ${
            themeCtx.theme === 'light' ? styles.lightText : null
          }`}
        />
      </div>
    </section>
  );
};

export default PostInput;
