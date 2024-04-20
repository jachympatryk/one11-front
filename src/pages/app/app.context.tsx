import React, {
  createContext,
  useContext,
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { PlayerModel } from '../../models/player';
import { FunctionaryModel } from '../../models/functionary';
import { AppPage } from './app.page.tsx';
import { useQuery } from 'react-query';
import {
  fetchUserByAuthId,
  fetchUserFunctionary,
  fetchUserPlayers,
  UserFunctionaryResponse,
  UserPlayerResponse,
} from '../../server/user/user.server.ts';
import { useNavigate } from 'react-router-dom';
import { DetailsProvider } from './details.context.tsx';

interface UserContextType {
  userFunctionaries: UserFunctionaryResponse[];
  userPlayers: UserPlayerResponse[];
  userSelectedFunctionality: FunctionaryModel | PlayerModel | null;
  setUserSelectedFunctionality: React.Dispatch<
    React.SetStateAction<FunctionaryModel | PlayerModel | null>
  >;
  isDataLoading: boolean;
  isDataFetched: boolean;
  isUserPlayer: boolean;
}

const AppContext = createContext<UserContextType | undefined>(undefined);

export const AppProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [userAuthId, setUserAuthId] = useState<string | null>(null);
  const [userSelectedFunctionality, setUserSelectedFunctionality] = useState<
    FunctionaryModel | PlayerModel | null
  >(null);
  const [isUserPlayer, setIsUserPlayer] = useState<boolean>(false);

  useEffect(() => {
    if (userSelectedFunctionality) {
      setIsUserPlayer('position' in userSelectedFunctionality);
    }
  }, [userSelectedFunctionality]);

  const { data } = useQuery(
    ['user', userAuthId],
    () => fetchUserByAuthId(userAuthId as string),
    { enabled: !!userAuthId }
  );

  const userId = data?.id;

  const {
    data: userFunctionaries = [],
    isSuccess: isSuccessFunctionaries,
    isLoading: userFunctionariesLoading,
  } = useQuery(
    ['functionaries', userId],
    () => fetchUserFunctionary(userId as number),
    { enabled: !!userId }
  );

  const {
    data: userPlayers = [],
    isSuccess: isSuccessPlayers,
    isLoading: userPlayersLoading,
  } = useQuery(['players', userId], () => fetchUserPlayers(userId as number), {
    enabled: !!userId,
  });

  console.log('userFunctionaries', userFunctionaries);

  const isDataLoading = userFunctionariesLoading || userPlayersLoading;
  const isDataFetched = isSuccessFunctionaries && isSuccessPlayers;

  useEffect(() => {
    if (!isDataLoading) {
      let selectedFunctionality = null;

      if (userFunctionaries && userFunctionaries.length > 0) {
        selectedFunctionality = userFunctionaries[0].functionary;
      } else if (userPlayers && userPlayers.length > 0) {
        selectedFunctionality = userPlayers[0].player;
      }

      setUserSelectedFunctionality(selectedFunctionality);
    }
  }, [userFunctionaries, userPlayers, isDataLoading]);

  useEffect(() => {
    const storageKey = 'sb-ycmehlfqsqzknuxtowdl-auth-token';
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const userId = parsedData?.user?.id;
      if (userId) {
        setUserAuthId(userId);
      } else {
        navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      userFunctionaries,
      userPlayers,
      userSelectedFunctionality,
      isDataLoading,
      isDataFetched,
      isUserPlayer,
      setUserSelectedFunctionality,
    }),
    [
      userFunctionaries,
      userPlayers,
      userSelectedFunctionality,
      isDataLoading,
      isDataFetched,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AppProvider');
  }
  return context;
};

export const AppWrapper: FunctionComponent = () => {
  return (
    <AppProvider>
      <DetailsProvider>
        <AppPage />
      </DetailsProvider>
    </AppProvider>
  );
};
