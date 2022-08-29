import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import Feed from '../../components/Feed/Feed';
import Profile from '../../components/ProfilePage/Profile';

const ProfilePage = () => {
  return (
    <>
      <Profile />
      <Feed type='profile' />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

export default ProfilePage;
