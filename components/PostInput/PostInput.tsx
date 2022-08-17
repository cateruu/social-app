import { useContext, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { ThemeContext } from '../../store/theme-context';

import styles from './PostInput.module.css';

import TextareaAutosize from 'react-textarea-autosize';
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { IEmojiData } from 'emoji-picker-react';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

const PostInput: NextPage = () => {
  const themeCtx = useContext(ThemeContext);

  const [textInput, setTextInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>(
    null
  );
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const imagePickerRef = useRef<HTMLInputElement | null>(null);

  const addImageToPost = () => {};
  const addEmoji = (event: MouseEvent, emojiObject: IEmojiData) => {
    setTextInput((prevText) => prevText + emojiObject.emoji);
  };

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
        {selectedFile && (
          <div className={styles.selectedImageContainer}>
            <Image
              src={selectedFile}
              layout='fill'
              quality={100}
              alt='user image'
              className={styles.selectedImage}
            />
            <IconContext.Provider value={{ className: styles.deleteImage }}>
              <MdCancel />
            </IconContext.Provider>
          </div>
        )}
        <div className={styles.buttons}>
          <div className={styles.inserts}>
            <div
              className={styles.iconContainer}
              onClick={() => imagePickerRef.current?.click()}
            >
              <IconContext.Provider value={{ className: styles.icon }}>
                <BsCardImage />
              </IconContext.Provider>
              <input
                type='file'
                hidden
                onChange={addImageToPost}
                ref={imagePickerRef}
              />
            </div>
            <div
              className={styles.iconContainer}
              onClick={() => setShowEmojis(!showEmojis)}
            >
              <IconContext.Provider value={{ className: styles.icon }}>
                <BsEmojiSmile />
              </IconContext.Provider>
            </div>
            {showEmojis && <Picker onEmojiClick={addEmoji} />}
          </div>
          {!textInput && (
            <div className={`${styles.button} ${styles.fake}`}>Post</div>
          )}
          {textInput && <button className={styles.button}>Post</button>}
        </div>
      </div>
    </section>
  );
};

export default PostInput;
