import { useEffect } from 'react';
import styles from './user-functionality-select.module.scss';
import { PlayerModel } from '../../../../models/player.ts';
import { FunctionaryModel } from '../../../../models/functionary.ts';
import { mapFunctionaryPosition } from '../../../../utils/mapFunctionaryPosition.ts';
import {
  useGetUserFunctionariesQuery,
  useGetUserPlayersQuery,
} from '../../../../services/user/userApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';
import { useDispatch } from 'react-redux';
import { setIsUserPlayer } from '../../../../services/user/userSlice.ts';

export const UserFunctionalitySelect = () => {
  const { userId, updateSelectedFunctionary } = useUser();
  const dispatch = useDispatch();

  const {
    data: functionaries,
    isSuccess: isFunctionariesSuccess,
    refetch: refetchFunctionaries,
  } = useGetUserFunctionariesQuery(userId as number, { skip: !userId });

  const {
    data: players,
    isSuccess: isPlayersSuccess,
    refetch: refetchPlayers,
  } = useGetUserPlayersQuery(userId as number, { skip: !userId });

  useEffect(() => {
    if (userId) {
      refetchFunctionaries();
      refetchPlayers();
    }
  }, [userId, refetchFunctionaries, refetchPlayers]);

  const handleOnClick = (functionality: PlayerModel | FunctionaryModel) => {
    updateSelectedFunctionary(functionality);

    if ('position' in functionality) {
      dispatch(setIsUserPlayer(!!functionality.position));
    }

    localStorage.setItem(
      'userSelectedFunctionality',
      JSON.stringify(functionality)
    );
  };

  useEffect(() => {
    if (isPlayersSuccess && players?.length === 1) {
      handleOnClick(players[0].player);
    } else if (isFunctionariesSuccess && functionaries?.length === 1) {
      handleOnClick(functionaries[0].functionary);
    }
  }, [isPlayersSuccess, players, isFunctionariesSuccess, functionaries]);

  const fetchingSuccess = isFunctionariesSuccess && isPlayersSuccess;

  return (
    <div className={styles.container}>
      {fetchingSuccess && (
        <ul className={styles.list}>
          {players?.map((player) => (
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

          {functionaries?.map((functionary) => (
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
      )}
    </div>
  );
};
