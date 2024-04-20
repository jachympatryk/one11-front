import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useApp } from './app.context.tsx';
import { useQuery } from 'react-query';
import {
  getTeamDetails,
  TeamDetailsResponse,
} from '../../server/team/team.server.ts';
import { EventModel } from '../../models/event.ts';
import { PlayerModel, PlayerPosition } from '../../models/player.ts';
import { TableModel } from '../../models/table.ts';

interface DetailsContextType {
  events: EventModel[];
  players: PlayerModel[];
  playersFiltered: PlayerPosition | '';
  setPlayersFiltered: React.Dispatch<React.SetStateAction<PlayerPosition | ''>>;
  userIsPlayer: boolean;
  tableData: TableModel[];
  isTeamDetailsLoading: boolean;
}

const DetailsContext = createContext<DetailsContextType | undefined>(undefined);

export const DetailsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userSelectedFunctionality } = useApp();

  const [events, setEvents] = useState<EventModel[]>([]);
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [tableData, setTableData] = useState<TableModel[]>([]);
  const [playersFiltered, setPlayersFiltered] = useState<PlayerPosition | ''>(
    ''
  );
  const [userIsPlayer, setUserIsPlayer] = useState<boolean>(false);

  const {
    data: teamDetails,
    isLoading: isTeamDetailsLoading,
    refetch: refetchTeamDetails,
  } = useQuery<TeamDetailsResponse | null>(
    ['teams', userSelectedFunctionality?.teamId],
    () =>
      userSelectedFunctionality?.teamId
        ? getTeamDetails(userSelectedFunctionality?.teamId)
        : null,
    {
      enabled: !!userSelectedFunctionality?.teamId,
    }
  );

  useEffect(() => {
    if (teamDetails) {
      setEvents(teamDetails.events);
      setPlayers(teamDetails.players);
      setTableData(teamDetails.table);
    }
  }, [teamDetails]);

  useEffect(() => {
    setPlayersFiltered('');

    if (
      userSelectedFunctionality &&
      'position' in userSelectedFunctionality &&
      userSelectedFunctionality.position
    ) {
      setUserIsPlayer(true);
    } else {
      setUserIsPlayer(false);
    }
  }, [userSelectedFunctionality]);

  const value = useMemo(
    () => ({
      teamDetails,
      events,
      players,
      playersFiltered,
      setPlayersFiltered,
      tableData,
      userIsPlayer,
      isTeamDetailsLoading,
      refetchTeamDetails,
    }),
    [
      userSelectedFunctionality,
      events,
      players,
      playersFiltered,
      isTeamDetailsLoading,
      userIsPlayer,
    ]
  );

  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
};

export const useDetails = () => {
  const context = useContext(DetailsContext);
  if (context === undefined) {
    throw new Error('useDetails must be used within a DetailsProvider');
  }
  return context;
};
