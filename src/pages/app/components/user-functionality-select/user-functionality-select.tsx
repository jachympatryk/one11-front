import { useApp } from '../../app.context.tsx';
import styles from './user-functionality-select.module.scss';

export const UserFunctionalitySelect = () => {
    const { userPlayers, userFunctionaries, userSelectedFunctionality } =
        useApp();

    console.log(userPlayers, userFunctionaries);

    return (
        <div className={styles.wrapper}>
            {userPlayers?.map(({ player }) => (
                <div key={player.id}>{player.name} - p</div>
            ))}

            {userFunctionaries?.map(({ functionary }) => (
                <div key={functionary.id}>{functionary.name} - f</div>
            ))}
        </div>
    );
};
