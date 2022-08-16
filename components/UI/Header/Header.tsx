import { useContext } from 'react';

import styles from './Header.module.css';

import { ThemeContext } from '../../../store/theme-context';

import Theme from './Theme';

const Header = () => {
  const themeCtx = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <h1
        className={`${styles.name} ${
          themeCtx.theme === 'light' ? styles.light : null
        }`}
      >
        Social
      </h1>
      <div className={styles.container}>
        <Theme />
      </div>
    </header>
  );
};

export default Header;
