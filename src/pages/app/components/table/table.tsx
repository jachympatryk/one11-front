import styles from './table.module.scss';
import { TableModel } from '../../../../models/table.ts';

export const Table = ({ table }: { table: TableModel[] }) => {
  const teamName = 'Ks Nowa Jastrząbka-Żukowice';

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nazwa Drużyny</th>
            <th>M.</th>
            <th>Pkt.</th>
            <th>Z.</th>
            <th>R.</th>
            <th>P.</th>
            <th>Bramki</th>
          </tr>
        </thead>
        <tbody>
          {table?.map((team) => (
            <tr
              key={team.rank}
              className={
                team.name.toLowerCase() === teamName.toLowerCase()
                  ? styles.highlighted
                  : ''
              }
            >
              <td>{team.rank}</td>
              <td>{team.name}</td>
              <td>{team.matches}</td>
              <td>{team.points}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalsForAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
