import styles from './match-weeks.module.scss';
import { MatchWeeksModel } from '../../../../models/table.ts';

export const MatchWeeks = ({
  matchWeeks,
}: {
  matchWeeks: MatchWeeksModel[];
}) => {
  return (
    <div className={styles.container}>
      {matchWeeks.map((week, index) => (
        <div key={index} className={styles.week}>
          <h2>{week.weekInfo}</h2>
          <ul className={styles.matches}>
            {week.matches.map((match, matchIndex) => (
              <li key={matchIndex} className={styles.match}>
                <div>{match.dateTime}</div>
                <div className={styles.teams}>
                  <span className={styles.homeTeam}>{match.homeTeam}</span>
                  <span className={styles.score}>{match.score}</span>
                  <span className={styles.awayTeam}>{match.awayTeam}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
