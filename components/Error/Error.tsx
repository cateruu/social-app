import { useAppSelector } from '../../app/hooks';

import styles from './Error.module.css';

import { motion } from 'framer-motion';

const Error = () => {
  const { text } = useAppSelector((state) => state.error);

  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: 20 }}
      exit={{ x: -400 }}
      className={styles.error}
    >
      {text}
    </motion.div>
  );
};

export default Error;
