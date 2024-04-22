import { fetchFromBackend } from '../server.ts';
import {
  AttendanceModel,
  CreateEventModel,
  EventModel,
} from '../../models/event.ts';

export const createEvent = async (
  eventData: CreateEventModel
): Promise<CreateEventModel | null> => {
  try {
    const response = await fetchFromBackend<CreateEventModel>('events/', {
      method: 'POST',
      body: eventData,
    });
    console.log('Event created successfully:', response);
    return response; // Zwracamy bezpośrednio obiekt z odpowiedzi
  } catch (error) {
    console.error('Failed to create event:', error);
    return null;
  }
};

export const getEvent = async (eventId: number): Promise<EventModel | null> => {
  try {
    const response = await fetchFromBackend<EventModel>(`events/${eventId}`, {
      method: 'GET',
    });
    console.log('Event retrieved successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to retrieve event:', error);
    return null;
  }
};

export const updateAttendance = async (
  eventId: number,
  playerId: number,
  status: string
): Promise<AttendanceModel | null> => {
  try {
    const response = await fetchFromBackend<AttendanceModel>(
      `events/${eventId}/attendances/${playerId}`,
      {
        method: 'PUT',
        body: { status: status },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Attendance updated successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to update attendance:', error);
    return null;
  }
};
