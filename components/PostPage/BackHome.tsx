import Link from 'next/link';

import styles from './BackHome.module.css';

import { IoArrowBackOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const BackHome = () => {
  return (
    <IconContext.Provider value={{ className: styles.back }}>
      <Link href='/'>
        <IoArrowBackOutline />
      </Link>
    </IconContext.Provider>
  );
};

export default BackHome;
