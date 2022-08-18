import { useTheme } from '../../store/theme-context';

import styles from './Layout.module.css';

import Header from '../UI/Header/Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { theme } = useTheme();

  return (
    <div className={styles.layout}>
      <Header />
      <main>{props.children}</main>
      <style jsx global>
        {`
          body {
            background: ${theme === 'dark' ? '#15202b' : '#fff'};
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
