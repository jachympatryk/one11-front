import styles from './lineup-list.module.scss';
import { useNavigate } from 'react-router-dom';
import { TeamLineupModel } from '../../../../models/lineup.ts';

export const LineupList = ({ lineups }: { lineups: TeamLineupModel[] }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {lineups?.map((lineup) => (
          <li
            key={lineup.id}
            className={styles.lineup}
            onClick={() => navigate(`${lineup.id}`)}
          >
            <p>{lineup.name}</p>
            <p>{lineup.formationName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
