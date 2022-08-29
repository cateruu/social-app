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

export default ProfilePage;
