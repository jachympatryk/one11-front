import styles from './players-buttons.module.scss';
import { useDetails } from '../../details.context.tsx';

export const PlayersButtons = () => {
    const { players, playersFiltered, setPlayersFiltered } = useDetails();

    const isActive = (filter) =>
        playersFiltered === filter ? styles.activeButton : '';

    const hasPlayers = (position) =>
        players.some((player) => player.position === position);

    const anyPlayers = players.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <button
                    onClick={() => setPlayersFiltered('')}
                    className={`${styles.button} ${isActive('')}`}
                    disabled={!anyPlayers}
                >
                    Wszyscy
                </button>
                <button
                    onClick={() => setPlayersFiltered('GOALKEEPER')}
                    className={`${styles.button} ${isActive('GOALKEEPER')}`}
                    disabled={!anyPlayers || !hasPlayers('GOALKEEPER')}
                >
                    Bramkarze
                </button>
                <button
                    onClick={() => setPlayersFiltered('DEFENDER')}
                    className={`${styles.button} ${isActive('DEFENDER')}`}
                    disabled={!anyPlayers || !hasPlayers('DEFENDER')}
                >
                    Obrońcy
                </button>
                <button
                    onClick={() => setPlayersFiltered('MIDFIELDER')}
                    className={`${styles.button} ${isActive('MIDFIELDER')}`}
                    disabled={!anyPlayers || !hasPlayers('MIDFIELDER')}
                >
                    Pomocnicy
                </button>
                <button
                    onClick={() => setPlayersFiltered('STRIKER')}
                    className={`${styles.button} ${isActive('STRIKER')}`}
                    disabled={!anyPlayers || !hasPlayers('STRIKER')}
                >
                    Napastnicy
                </button>
            </div>
            <div>Admin buttons</div>
        </div>
    );
};
