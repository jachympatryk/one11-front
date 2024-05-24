import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FunctionaryModel } from '../../models/functionary.ts';
import { PlayerModel } from '../../models/player.ts';

interface UserState {
  userId: number | null;
  userAuthId: string | null;
  selectedFunctionary: FunctionaryModel | PlayerModel | null;
  isUserPlayer: boolean;
}

const initialState: UserState = {
  userAuthId: null,
  userId: null,
  selectedFunctionary: null,
  isUserPlayer: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<number | null>) {
      state.userId = action.payload;
    },
    setUserAuthId(state, action: PayloadAction<string | null>) {
      state.userAuthId = action.payload;
    },
    setUserSelectedFunctionary(
      state,
      action: PayloadAction<FunctionaryModel | PlayerModel | null>
    ) {
      state.selectedFunctionary = action.payload;
    },
    setIsUserPlayer(state, action: PayloadAction<boolean>) {
      state.isUserPlayer = action.payload;
    },
  },
});

export const {
  setUserId,
  setUserAuthId,
  setUserSelectedFunctionary,
  setIsUserPlayer,
} = userSlice.actions;
export default userSlice.reducer;
