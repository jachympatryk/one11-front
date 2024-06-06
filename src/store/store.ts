import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/user/userApi.ts';
import userReducer from '../services/user/userSlice.ts';
import { eventsApi } from '../services/events/eventApi.ts';
import { teamApi } from '../services/team/teamApi.ts';
import { lineupsApi } from '../services/lineups/lineupsApi.ts';
import { conversationsApi } from '../services/conversations/conversationsApi.ts';
import { messagesApi } from '../services/messagesApi/messagesApi.ts';
import { locationsApi } from '../services/locations/locationsApi.ts';

const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [lineupsApi.reducerPath]: lineupsApi.reducer,
    [conversationsApi.reducerPath]: conversationsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      eventsApi.middleware,
      teamApi.middleware,
      lineupsApi.middleware,
      conversationsApi.middleware,
      messagesApi.middleware,
      locationsApi.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
