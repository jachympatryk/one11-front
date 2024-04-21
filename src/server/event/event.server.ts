import { fetchFromBackend } from '../server.ts'; // Zakładam, że obsługuje również metody POST

export interface EventModel {
  id?: number;
  name: string;
  event_type: string;
  created_by: string;
  start_time: Date;
  end_time?: Date;
  line_up?: string;
  opponent?: string;
  collection_time?: Date;
  own_transport?: boolean;
  description_before?: string;
  description_after?: string;
  teamId: number;
}

export const createEvent = async (
  eventData: EventModel
): Promise<EventModel | null> => {
  try {
    const response = await fetchFromBackend<EventModel>('events/', {
      method: 'POST',
      body: eventData,
    });
    console.log('Event created successfully:', response);
    return response;
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

export interface AttendanceModel {
  eventId: number;
  playerId: number;
  status: string; // Może być typu enum, jeśli masz zdefiniowane
}

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
