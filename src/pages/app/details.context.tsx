import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useApp } from './app.context.tsx';
import { useQuery } from 'react-query';
import { getTeamDetails } from '../../server/team/team.server.ts';
import { EventModel } from '../../models/event.ts';
import { PlayerModel } from '../../models/player.ts';

interface DetailsContextType {
    events: EventModel[];
    players: PlayerModel[];
    eventsLoading: boolean;
    playersFiltered: 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'STRIKER' | '';
    setPlayersFiltered: React.Dispatch<
        React.SetStateAction<
            '' | 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'STRIKER'
        >
    >;
    userIsPlayer: boolean;
}

const DetailsContext = createContext<DetailsContextType | undefined>(undefined);

export const DetailsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { userSelectedFunctionality } = useApp();

    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);
    const [playersFiltered, setPlayersFiltered] = useState<
        'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'STRIKER' | ''
    >('');

    const { data: teamDetails, isLoading: eventsLoading } = useQuery(
        ['teams', userSelectedFunctionality?.teamId],
        () => getTeamDetails(userSelectedFunctionality?.teamId),
        { enabled: !!userSelectedFunctionality?.teamId }
    );

    useEffect(() => {
        if (teamDetails) {
            setEvents(teamDetails.events);
            setPlayers(teamDetails.players);
        }
    }, [teamDetails]);

    useEffect(() => {
        setPlayersFiltered('');
    }, [userSelectedFunctionality]);

    const value = useMemo(
        () => ({
            teamDetails,
            events,
            players,
            playersFiltered,
            setPlayersFiltered,
        }),
        [userSelectedFunctionality, events, players, playersFiltered]
    );

    return (
        <DetailsContext.Provider value={value}>
            {children}
        </DetailsContext.Provider>
    );
};

export const useDetails = () => {
    const context = useContext(DetailsContext);
    if (context === undefined) {
        throw new Error('useDetails must be used within a DetailsProvider');
    }
    return context;
};
