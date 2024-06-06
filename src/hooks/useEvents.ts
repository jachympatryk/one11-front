import {
  useGetEventQuery,
  useGetTeamEventsQuery,
} from '../services/events/eventApi.ts';
import { useUser } from './userUser.ts';

export const useTeamEvents = () => {
  const { selectedFunctionary } = useUser();

  const teamId = selectedFunctionary?.teamId as number;

  const {
    data: events,
    isLoading: isEventsLoading,
    isError: isEventsError,
    isSuccess: isEventsSuccess,
    refetch: refetchEvents,
  } = useGetTeamEventsQuery(teamId, {
    skip: !teamId,
  });

  return {
    events,
    isEventsLoading,
    isEventsError,
    isEventsSuccess,
    refetchEvents,
  };
};

export const useEvent = (eventNumber: number) => {
  const {
    data: event,
    isLoading: isEventLoading,
    refetch: refetchEvent,
    isSuccess: isEventSuccess,
  } = useGetEventQuery(eventNumber, {
    skip: eventNumber === 0,
  });

  return {
    event,
    isEventLoading,
    refetchEvent,
    isEventSuccess,
  };
};
