import styles from './full-screen-loader.module.scss';

export const FullScreenLoader = () => (
  <div className={styles.fullScreenLoader}>
    <div className={styles.loader}></div>
  </div>
);
