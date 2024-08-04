import styles from './match-weeks.module.scss';
import { MatchWeeksModel } from '../../../../models/table.ts';

export const MatchWeeks = ({
  matchWeeks,
}: {
  matchWeeks: MatchWeeksModel[];
}) => {
  const teamName = 'Ks Nowa Jastrząbka-Żukowice';

  return (
    <div className={styles.container}>
      {matchWeeks.map((week, index) => (
        <div key={index} className={styles.week}>
          <h2>{week.weekInfo}</h2>
          <ul className={styles.matches}>
            {week.matches.map((match, matchIndex) => {
              const matchClass =
                match.homeTeam.toLowerCase() === teamName.toLowerCase() ||
                match.awayTeam.toLowerCase() === teamName.toLowerCase()
                  ? styles.highlighted
                  : '';

              return (
                <li
                  key={matchIndex}
                  className={`${styles.match} ${matchClass}`}
                >
                  <div>{match.dateTime}</div>
                  <div className={styles.teams}>
                    <span className={styles.homeTeam}>{match.homeTeam}</span>
                    <span className={styles.score}>{match.score}</span>
                    <span className={styles.awayTeam}>{match.awayTeam}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
