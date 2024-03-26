import {
    createContext,
    useContext,
    ReactNode,
    FunctionComponent,
    useState,
    useEffect,
} from 'react';
import { PlayerModel } from '../../models/player';
import { FunctionaryModel } from '../../models/functionary';
import { AppPage } from './app.page.tsx';
import { useQuery } from 'react-query';
import {
    fetchUserByAuthId,
    fetchUserFunctionary,
    fetchUserPlayers,
} from '../../server/user/user.server.ts';

interface UserContextType {
    userFunctionaries: { userFunctionary: FunctionaryModel }[];
    userPlayers: { userPlayer: PlayerModel }[];
    userSelectedFunctionality: FunctionaryModel | PlayerModel | null;
    isDataLoading: boolean;
}

const AppContext = createContext<UserContextType | undefined>(undefined);

export const AppProvider: FunctionComponent<{ children: ReactNode }> = ({
    children,
}) => {
    const [userAuthId, setUserAuthId] = useState<string | null>(null);
    const [userSelectedFunctionality, setUserSelectedFunctionality] = useState<
        FunctionaryModel | PlayerModel | null
    >(null);

    const { data } = useQuery(
        ['user', userAuthId],
        () => fetchUserByAuthId(userAuthId as string),
        { enabled: !!userAuthId }
    );

    const userId = data?.id;

    const { data: userFunctionaries, isLoading: userFunctionariesLoading } =
        useQuery(
            ['functionaries', userId],
            () => fetchUserFunctionary(userId as number),
            { enabled: !!userId }
        );
    const { data: userPlayers, isLoading: userPlayersLoading } = useQuery(
        ['players', userId],
        () => fetchUserPlayers(userId as number),
        { enabled: !!userId }
    );

    const isDataLoading = userFunctionariesLoading || userPlayersLoading;

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
        const storageKey = 'sb-kdosiyhnmjybkohjncjx-auth-token';
        const storedData = localStorage.getItem(storageKey);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const userId = parsedData?.user?.id;
            setUserAuthId(userId);
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                userFunctionaries: userFunctionaries ? userFunctionaries : [],
                userPlayers: userPlayers ? userPlayers : [],
                userSelectedFunctionality,
                isDataLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useUser must be used within an AppProvider');
    }
    return context;
};

export const AppWrapper: FunctionComponent<{ children: ReactNode }> = ({}) => {
    return (
        <AppProvider>
            <AppPage />
        </AppProvider>
    );
};
