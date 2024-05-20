import React, { useState } from 'react';
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
import { useDetails } from '../../details.context.tsx';
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdAdd,
  MdDownload,
} from 'react-icons/md';
import { monthNames } from '../../../../constants/data.ts';
import { ModalComponent } from '../../../../components/modal/modal.tsx';
import { AddEvent } from '../../form/add-event/add-event.tsx';

interface CalendarComponentProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export const Calendar: React.FC<CalendarComponentProps> = ({
  currentMonth,
  setCurrentMonth,
}) => {
  const { events } = useDetails();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const startDay = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const endDay = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const previousMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const eventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start_time), day));
  };

  const monthName = monthNames[currentMonth.getMonth()];
  const year = currentMonth.getFullYear();

  const handleCsv = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.start_time);
      return eventDate >= monthStart && eventDate <= monthEnd;
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

    const csv = Papa.unparse(csvData, {
      quotes: true,
      delimiter: ';',
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${monthName}-${year}-events.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.floatingButton}
      >
        <MdAdd />
      </button>
      <button onClick={handleCsv} className={styles.floatingButtonCsv}>
        <MdDownload />
      </button>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddEvent closeModal={() => setIsModalOpen(false)} />
      </ModalComponent>
      <div className={styles.calendarHeader}>
        <button className={styles.button} onClick={previousMonth}>
          <MdNavigateBefore />
        </button>
        <div>{`${monthName} ${year}`}</div>
        <button className={styles.button} onClick={nextMonth}>
          <MdNavigateNext />
        </button>
      </div>
      <div className={styles.daysLegend}>
        {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'].map((dayName) => (
          <div
            className={`${styles.dayItem} ${dayName === 'Sob' || dayName === 'Niedz' ? styles.dayItemWeek : ''}`}
            key={dayName}
          >
            {dayName}
          </div>
        ))}
      </div>
      <div className={styles.daysWrapper}>
        {days.map((day) => (
          <DayCell day={day} key={day.toString()} events={eventsForDay(day)} />
        ))}
      </div>
    </div>
  );
};
