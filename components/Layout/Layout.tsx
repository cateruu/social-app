import styles from './Layout.module.css';

import Header from '../UI/Header/Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
