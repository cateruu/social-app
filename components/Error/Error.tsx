import { useAppSelector } from '../../app/hooks';
import styles from './Error.module.css';

const Error = () => {
  const { text } = useAppSelector((state) => state.error);

  return <div className={styles.error}>Login in to perform that action!</div>;
};

export default Error;
