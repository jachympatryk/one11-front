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
import { handleCsvExport } from './calendar.constants.ts';
import { IoToday } from 'react-icons/io5';

interface CalendarComponentProps {
  currentDate: Date;
  setCurrentDateInParams: (date: Date) => void;
  events: EventModel[];
}

export const Calendar: React.FC<CalendarComponentProps> = ({
  currentDate,
  setCurrentDateInParams,
  events,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startDay = startOfMonth(currentDate);
  const endDay = endOfMonth(currentDate);

  const days = useMemo(() => {
    const start = startOfWeek(startDay, { weekStartsOn: 1 });
    const end = endOfWeek(endDay, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [startDay, endDay]);

  const eventsForDay = useMemo(
    () => (day: Date) => {
      return events.filter((event) =>
        isSameDay(new Date(event.start_time), day)
      );
    },
    [events]
  );

  const monthName = monthNames[startDay.getMonth() + 1];

  const year = currentDate.getFullYear();

  return (
    <div className={styles.container}>
      <button
        onClick={() => setCurrentDateInParams(new Date())}
        className={styles.floatingButtonToday}
      >
        <IoToday />
      </button>

      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.floatingButton}
      >
        <MdAdd />
      </button>

      <button
        onClick={() =>
          handleCsvExport({ currentDate, endDay, events, startDay })
        }
        className={styles.floatingButtonCsv}
      >
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
          onClick={() => setCurrentDateInParams(addMonths(currentDate, -1))}
        >
          <MdNavigateBefore />
        </button>
        <div>{`${monthName} ${year}`}</div>
        <button
          className={styles.button}
          onClick={() => setCurrentDateInParams(addMonths(currentDate, 1))}
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
            currentDate={currentDate}
          />
        ))}
      </div>
    </div>
  );
};
