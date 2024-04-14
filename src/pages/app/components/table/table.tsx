import { useDetails } from '../../details.context.tsx';
import styles from './table.module.scss';

export const Table = () => {
    const { tableData } = useDetails();

    if (tableData.length === 0) {
        return <p>Ładowanie tabli...</p>;
    }

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
                    {tableData.map((team) => (
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
