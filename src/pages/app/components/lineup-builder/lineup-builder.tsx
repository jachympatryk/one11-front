import styles from './lineup-builders.module.scss';
import { FootballPitch } from './football-pitch/football-pitch.tsx';

export const LineupBuilder = ({
  refetchLineups,
}: {
  refetchLineups: () => Promise<void>;
}) => {
  return (
    <div className={styles.container}>
      <FootballPitch refetchLineups={refetchLineups} />
    </div>
  );
};
