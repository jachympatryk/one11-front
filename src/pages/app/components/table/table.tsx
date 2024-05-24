import styles from './table.module.scss';
import { TableModel } from '../../../../models/table.ts';

export const Table = ({ table }: { table: TableModel[] }) => {
  // const downloadImage = async () => {
  //   const tableElement = document.querySelector(
  //     `.${styles.container} table`
  //   ) as HTMLElement;
  //   if (tableElement) {
  //     const canvas = await html2canvas(tableElement);
  //     const image = canvas
  //       .toDataURL('image/png')
  //       .replace('image/png', 'image/octet-stream');
  //     const link = document.createElement('a');
  //     link.download = 'table_snapshot.png'; // Nazwa pliku do pobrania
  //     link.href = image;
  //     link.click();
  //   }
  // };

  return (
    <div className={styles.container}>
      {/*<button onClick={downloadImage} className={styles.floatingButton}>*/}
      {/*  <MdDownload />*/}
      {/*</button>*/}

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
            <tr key={team.rank}>
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
