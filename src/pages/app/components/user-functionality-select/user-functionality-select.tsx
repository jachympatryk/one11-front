import { useApp } from '../../app.context.tsx';
import styles from './user-functionality-select.module.scss';
import { PlayerModel } from '../../../../models/player.ts';
import { FunctionaryModel } from '../../../../models/functionary.ts';

export const UserFunctionalitySelect = () => {
  const { userPlayers, setUserSelectedFunctionality, userFunctionaries } =
    useApp();

  const handleOnClick = (functionality: PlayerModel | FunctionaryModel) => {
    setUserSelectedFunctionality(functionality);
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
            <p>
              {player.player.name} {player.player.surname}
            </p>
            <p>{player.player.position}</p>
          </li>
        ))}

        {userFunctionaries?.map((functionary) => (
          <li
            className={styles.item}
            onClick={() => handleOnClick(functionary.functionary)}
            key={functionary.functionaryId}
          >
            <p>
              {functionary.functionary.name} {functionary.functionary.surname}
            </p>
            <p>{functionary.functionary.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
