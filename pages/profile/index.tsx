import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import { useAppSelector } from '../../app/hooks';
import CommentModal from '../../components/CommentModal/CommentModal';

import Feed from '../../components/Feed/Feed';
import Profile from '../../components/ProfilePage/Profile';

const ProfilePage = () => {
  const { isOpen } = useAppSelector((state) => state.commentModal);

  return (
    <>
      {isOpen && <CommentModal />}
      <Profile />
      <Feed type='profile' />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default ProfilePage;
