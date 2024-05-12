import { LineupBuilder } from '../../components/lineup-builder/lineup-builder.tsx';
import styles from './lineup.module.scss';

export const Lineup = () => {
  return (
    <div className={styles.container}>
      <LineupBuilder />
    </div>
  );
};
