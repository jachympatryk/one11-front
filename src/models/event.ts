export interface EventModel {
  id: number;
  name: string;
  event_type: EventType; // Tutaj zakładam, że EventType to wcześniej zdefiniowany typ lub enum
  created_at: Date;
  created_by: string;
  start_time: Date;
  end_time?: Date; // Oznaczony jako opcjonalny (?), ponieważ posiada znak zapytania w definicji modelu
  line_up?: string; // Opcjonalny
  opponent?: string; // Opcjonalny
  collection_time?: Date; // Opcjonalny
  own_transport?: boolean; // Opcjonalny
  description_before?: string; // Opcjonalny
  description_after?: string; // Opcjonalny
  teamId: number; // Zakładam, że to jest zawsze wymagane, nie ma znaku zapytania
  attendances: AttendanceModel[];
}

export type CreateEventModel = Omit<EventModel, 'id'>;

export type EventType =
  | 'TRAINING'
  | 'MATCH'
  | 'TOURNAMENT'
  | 'MEETING'
  | 'OTHER';

export interface AttendanceModel {
  eventId: number;
  playerId: number;
  status: AttendanceStatus;
}

export type AttendanceStatus = 'PENDING' | 'CONFIRMED' | 'ABSENT' | 'LATE';
