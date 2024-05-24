import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store.ts';
import { PlayerModel } from '../models/player.ts';
import { FunctionaryModel } from '../models/functionary.ts';
import {
  setUserId,
  setUserSelectedFunctionary,
} from '../services/user/userSlice.ts';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userId);
  const selectedFunctionary = useSelector(
    (state: RootState) => state.user.selectedFunctionary
  );

  const isUserPlayer = useSelector(
    (state: RootState) => state.user.isUserPlayer
  );

  const updateUserId = (id: number | null) => {
    dispatch(setUserId(id));
  };

  const updateSelectedFunctionary = (
    functionary: FunctionaryModel | PlayerModel | null
  ) => {
    dispatch(setUserSelectedFunctionary(functionary));
  };

  return {
    userId,
    selectedFunctionary,
    updateUserId,
    updateSelectedFunctionary,
    isUserPlayer,
  };
};
