import styles from './Header.module.css';

import Theme from './Theme';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>Social</h1>
      <div className={styles.container}>
        <Theme />
      </div>
    </header>
  );
};

export default Header;
