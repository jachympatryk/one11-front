import styles from './lineup-builders.module.scss';
import { FootballPitch } from './football-pitch/football-pitch.tsx';

export const LineupBuilder = () => {
  return (
    <div className={styles.container}>
      <FootballPitch />
    </div>
  );
};
