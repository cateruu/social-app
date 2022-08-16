import { useContext, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';

import { ThemeContext } from '../../store/theme-context';

import styles from './PostInput.module.css';

import TextareaAutosize from 'react-textarea-autosize';
import { BsCardImage } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

const PostInput: NextPage = () => {
  const themeCtx = useContext(ThemeContext);

  const [textInput, setTextInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>(
    null
  );

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
          maxRows={10}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className={`${styles.text} ${
            themeCtx.theme === 'light' ? styles.lightText : null
          }`}
        />
        <div className={styles.selectedImageContainer}>
          <Image
            src='https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg'
            layout='fill'
            quality={100}
            alt='user image'
            className={styles.selectedImage}
          />
          {/* <MdCancel /> */}
        </div>
        {/* <div className={styles.buttons}>
          <div className={styles.inserts}>
            <input type='file' />
          </div>
          {!textInput && (
            <div className={`${styles.button} ${styles.fake}`}>Post</div>
          )}
          {textInput && <button className={styles.button}>Post</button>}
        </div> */}
      </div>
    </section>
  );
};

export default PostInput;
