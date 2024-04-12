import { useDetails } from '../../details.context.tsx';
import styles from './players-list.module.scss';
import { mapPositionName } from '../../../../utils/mapPositionName.ts';

export const PlayersList = () => {
    const { players, playersFiltered } = useDetails();

    const positionOrder = {
        GOALKEEPER: 1,
        DEFENDER: 2,
        MIDFIELDER: 3,
        STRIKER: 4,
    };

    const playersByPosition = players.reduce((acc, player) => {
        const { position } = player;
        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push(player);
        return acc;
    }, {});

    const filteredPositions = playersFiltered
        ? [playersFiltered]
        : Object.keys(playersByPosition);

    const sortedPositions = filteredPositions.sort((a, b) => {
        return positionOrder[a] - positionOrder[b];
    });

    return (
        <div className={styles.container}>
            {sortedPositions.map((position) => (
                <div key={position} className={styles.positionGroup}>
                    <div className={styles.positionWrapper}>
                        <p>{mapPositionName(position, true)}</p>
                        <div className={styles.underline} />
                    </div>
                    <ul className={styles.playersList}>
                        {playersByPosition[position].map((player) => (
                            <li key={player.id} className={styles.player}>
                                <div className={styles.playerNumber}>
                                    {player.number}
                                </div>
                                <p>
                                    {player.name} {player.surname}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
