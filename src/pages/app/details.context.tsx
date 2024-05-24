// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import { useApp } from './app.context.tsx';
// import { useQuery } from 'react-query';
// import { getTeamDetails } from '../../server/team/team.server.ts';
// import { EventModel } from '../../models/event.ts';
// import { PlayerModel } from '../../models/player.ts';
// import { TableModel } from '../../models/table.ts';
// import { TeamDetailsResponse } from '../../models/team.ts';
//
// interface DetailsContextType {
//   events: EventModel[];
//   players: PlayerModel[];
//   tableData: TableModel[];
//   isUserPlayer: boolean;
//   isTeamDetailsLoading: boolean;
//   refetchTeamDetails: () => void;
//   teamDataFetch: boolean;
// }
//
// const DetailsContext = createContext<DetailsContextType | undefined>(undefined);
//
// const DetailsProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { userSelectedFunctionality } = useApp();
//
//   const [events, setEvents] = useState<EventModel[]>([]);
//   const [players, setPlayers] = useState<PlayerModel[]>([]);
//   const [tableData, setTableData] = useState<TableModel[]>([]);
//   const [teamDataFetch, setTeamDataFetch] = useState<boolean>(false);
//   const [isUserPlayer, setIsUserPlayer] = useState<boolean>(false);
//
//   const {
//     data: teamDetails,
//     isLoading: isTeamDetailsLoading,
//     refetch: refetchTeamDetails,
//   } = useQuery<TeamDetailsResponse | null>(
//     ['teams', userSelectedFunctionality?.teamId],
//     () =>
//       userSelectedFunctionality?.teamId
//         ? getTeamDetails(userSelectedFunctionality?.teamId)
//         : null,
//     {
//       enabled: !!userSelectedFunctionality?.teamId,
//     }
//   );
//
//   console.log(teamDetails);
//
//   useEffect(() => {
//     if (userSelectedFunctionality) {
//       setIsUserPlayer('position' in userSelectedFunctionality);
//     }
//   }, [userSelectedFunctionality]);
//
//   useEffect(() => {
//     if (teamDetails) {
//       setTeamDataFetch(true);
//       setEvents(teamDetails.events);
//       setPlayers(teamDetails.players);
//       setTableData(teamDetails.table);
//     }
//   }, [teamDetails]);
//
//   const value = useMemo(
//     () => ({
//       teamDetails,
//       events,
//       players,
//       tableData,
//       isUserPlayer,
//       isTeamDetailsLoading,
//       refetchTeamDetails,
//       teamDataFetch,
//     }),
//     [userSelectedFunctionality, events, players]
//   );
//
//   return (
//     <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
//   );
// };
//
// const useDetails = () => {
//   const context = useContext(DetailsContext);
//   if (context === undefined) {
//     throw new Error('useDetails must be used within a DetailsProvider');
//   }
//   return context;
// };
