import React, { BaseSyntheticEvent, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { useTheme } from '../../store/theme-context';

import styles from './PostInput.module.css';

import { db, storage } from '../../config/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

import TextareaAutosize from 'react-textarea-autosize';
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { IEmojiData } from 'emoji-picker-react';
import { useUser } from '@auth0/nextjs-auth0';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

const PostInput: NextPage = () => {
  const { theme } = useTheme();

  const { user, error, isLoading } = useUser();

  const [textInput, setTextInput] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const imagePickerRef = useRef<HTMLInputElement | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: user?.sub,
      username: user?.nickname,
      profilePic: user?.picture,
      text: textInput,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedImage) {
      await uploadString(imageRef, selectedImage, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        });
      });
    }

    setLoading(false);
    setTextInput('');
    setSelectedImage(null);
    setShowEmojis(false);
  };

  const addImageToPost = (e: BaseSyntheticEvent) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedImage(readerEvent.target.result);
    };
  };

  const addEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    setTextInput((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <section className={`${styles.input} ${theme === 'light' && styles.light}`}>
      <div className={styles.avatarContainer}>
        <Image
          src={user?.picture}
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
          className={`${styles.text} ${theme === 'light' && styles.light}`}
        />
        {selectedImage && (
          <div className={styles.selectedImageContainer}>
            <Image
              src={selectedImage}
              layout='fill'
              quality={100}
              alt='user image'
              className={styles.selectedImage}
            />
            <IconContext.Provider value={{ className: styles.deleteImage }}>
              <MdCancel onClick={() => setSelectedImage(null)} />
            </IconContext.Provider>
          </div>
        )}
        {!loading && (
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
                  accept='.jpg,.jpeg,.png'
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
            <button
              className={styles.button}
              disabled={!textInput.trim() && !selectedImage}
              onClick={sendPost}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostInput;
