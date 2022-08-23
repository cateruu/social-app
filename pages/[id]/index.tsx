import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { doc, DocumentReference, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

import { PostType } from '../../components/Feed/Feed';
import Post from '../../components/PostPage/Post';

import BackHome from '../../components/PostPage/BackHome';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<PostType | undefined>(undefined);

  useEffect(
    () =>
      onSnapshot(
        doc(db, 'posts', id! as string) as DocumentReference<PostType>,
        (snapshot) => {
          setPost(snapshot.data());
        }
      ),
    [id]
  );

  return (
    <>
      <BackHome />
      {post && <Post post={post} id={id as string} />}
    </>
  );
};

export default PostPage;
