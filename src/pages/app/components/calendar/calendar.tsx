import React, { useState, useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  isSameDay,
} from 'date-fns';
import Papa from 'papaparse';
import styles from './calendar.module.scss';
import { DayCell } from '../day-cell/day-cell.tsx';
import { monthNames } from '../../../../constants/data.ts';
import { ModalComponent } from '../../../../components/modal/modal.tsx';
import { AddEvent } from '../../form/add-event/add-event.tsx';
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdAdd,
  MdDownload,
} from 'react-icons/md';
import { EventModel } from '../../../../models/event.ts';

interface CalendarComponentProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  events: EventModel[];
}

export const Calendar: React.FC<CalendarComponentProps> = ({
  currentMonth,
  setCurrentMonth,
  events,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startDay = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const endDay = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const days = useMemo(
    () => eachDayOfInterval({ start: startDay, end: endDay }),
    [startDay, endDay]
  );

  const eventsForDay = useMemo(
    () => (day: Date) => {
      return (
        events?.filter((event) => isSameDay(new Date(event.start_time), day)) ||
        []
      );
    },
    [events]
  );

  const handleCsvExport = () => {
    if (!events) return;
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
      `${monthNames[currentMonth.getMonth()]}-${currentMonth.getFullYear()}-events.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const monthName = monthNames[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.floatingButton}
      >
        <MdAdd />
      </button>
      <button onClick={handleCsvExport} className={styles.floatingButtonCsv}>
        <MdDownload />
      </button>
      <ModalComponent
        className={styles.modal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dodaj nowe wydarzenie"
      >
        <AddEvent closeModal={() => setIsModalOpen(false)} />
      </ModalComponent>
      <div className={styles.calendarHeader}>
        <button
          className={styles.button}
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        >
          <MdNavigateBefore />
        </button>
        <div>{`${monthName} ${year}`}</div>
        <button
          className={styles.button}
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <MdNavigateNext />
        </button>
      </div>
      <div className={styles.daysLegend}>
        {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'].map((dayName) => (
          <div
            key={dayName}
            className={`${styles.dayItem} ${['Sob', 'Niedz'].includes(dayName) ? styles.dayItemWeekend : ''}`}
          >
            {dayName}
          </div>
        ))}
      </div>
      <div className={styles.daysWrapper}>
        {days.map((day) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            events={eventsForDay(day)}
          />
        ))}
      </div>
    </div>
  );
};
