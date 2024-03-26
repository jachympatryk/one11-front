import { useApp } from '../app.context.tsx';

export const UserFunctionalitySelect = () => {
    const { userPlayers, userFunctionaries, userSelectedFunctionality } =
        useApp();

    console.log(userPlayers, userFunctionaries);

    return (
        <div>
            {userPlayers?.map(({ player }) => (
                <div key={player.id}>{player.name} - p</div>
            ))}

            {userFunctionaries?.map(({ functionary }) => (
                <div key={functionary.id}>{functionary.name} - f</div>
            ))}
        </div>
    );
};
