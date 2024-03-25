import { Navbar } from '../landing/components/navbar';
import { useQuery } from 'react-query';
import {
    fetchUserFunctionary,
    fetchUserPlayers,
} from '../../server/user/user.server.ts';

export const AppPage = () => {
    const userId = 1;

    const {
        data: userFunctionaries,
        isLoading: functionariesIsLoading,
        error: functionariesError,
    } = useQuery(['functionaries', userId], () => fetchUserFunctionary(userId));

    const {
        data: userPlayers,
        isLoading: playersIsLoading,
        error: playersError,
    } = useQuery(['players', userId], () => fetchUserPlayers(userId));

    console.log(userFunctionaries);
    console.log(userPlayers);

    const isLoading = functionariesIsLoading || playersIsLoading;
    const error = functionariesError || playersError;

    const userIsPlayer = (userPlayers?.length || 0) > 0;
    const userIsFunctionary = (userFunctionaries?.length || 0) > 0;

    return (
        <div>
            <Navbar />
            <div>App page</div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error</div>}

            {!isLoading && !error && userIsPlayer && <div>User is player</div>}
            {!isLoading && !error && userIsFunctionary && (
                <div>User is functionary</div>
            )}
        </div>
    );
};
