import styles from './loader.module.scss';
import { IoMdFootball } from 'react-icons/io';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <IoMdFootball className={styles.icon} />
    </div>
  );
};
