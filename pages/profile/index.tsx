import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAppSelector } from '../../app/hooks';
import CommentModal from '../../components/CommentModal/CommentModal';

import Feed from '../../components/Feed/Feed';
import Profile from '../../components/ProfilePage/Profile';

const ProfilePage = () => {
  const { isOpen } = useAppSelector((state) => state.commentModal);
  const { user, error, isLoading } = useUser();

  return (
    <>
      <Head>
        <title>{user?.username as string} profile page</title>
        <meta
          name='description'
          content={`Profile page of ${user?.username} on Social App`}
        />
        <meta
          name='keywords'
          content='Social app, social, social media, profile page'
        />
        <meta name='author' content='Paweł Kromołowski' />
      </Head>
      {isOpen && <CommentModal />}
      <Profile />
      <Feed type='profile' />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default ProfilePage;
