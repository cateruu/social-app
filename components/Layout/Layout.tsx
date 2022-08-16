import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default Layout;
