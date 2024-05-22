import { useApp } from '../../app.context.tsx';
import styles from './user-functionality-select.module.scss';
import { PlayerModel } from '../../../../models/player.ts';
import { FunctionaryModel } from '../../../../models/functionary.ts';
import { mapFunctionaryPosition } from '../../../../utils/mapFunctionaryPosition.ts';

export const UserFunctionalitySelect = () => {
  const { userPlayers, setUserSelectedFunctionality, userFunctionaries } =
    useApp();

  const handleOnClick = (functionality: PlayerModel | FunctionaryModel) => {
    setUserSelectedFunctionality(functionality);
    localStorage.setItem(
      'userSelectedFunctionality',
      JSON.stringify(functionality)
    );
  };

  console.log(userPlayers);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {userPlayers?.map((player) => (
          <li
            className={styles.item}
            onClick={() => handleOnClick(player.player)}
            key={player.playerId}
          >
            <p>Zawodnik</p>
            <p>
              {player.player.name} {player.player.surname}
            </p>
          </li>
        ))}

        {userFunctionaries?.map((functionary) => (
          <li
            className={styles.item}
            onClick={() => handleOnClick(functionary.functionary)}
            key={functionary.functionaryId}
          >
            <p>{mapFunctionaryPosition(functionary.functionary.role)}</p>
            <p>
              {functionary.functionary.name} {functionary.functionary.surname}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
