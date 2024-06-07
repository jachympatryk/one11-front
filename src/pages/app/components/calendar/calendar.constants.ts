import Papa from 'papaparse';
import { monthNames } from '../../../../constants/data.ts';
import { EventModel } from '../../../../models/event.ts';

export const handleCsvExport = ({
  events,
  startDay,
  endDay,
  currentDate,
}: {
  events: EventModel[];
  startDay: Date;
  endDay: Date;
  currentDate: Date;
}) => {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start_time);
    return eventDate >= startDay && eventDate <= endDay;
  });

  const csvData = filteredEvents.map((event) => ({
    ID: event.id,
    Name: event.name,
    Event_Type: event.event_type,
    Start_Time: event.start_time,
    End_Time: event.end_time,
    Created_At: event.created_at,
    Created_By: event.created_by,
  }));

  const csv = Papa.unparse(csvData, { quotes: true, delimiter: ';' });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `${monthNames[currentDate.getMonth() + 1]}-${currentDate.getFullYear()}-events.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
