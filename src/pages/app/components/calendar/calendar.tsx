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

import styles from './calendar.module.scss';
import { DayCell } from '../day-cell/day-cell.tsx';
import { useDetails } from '../../details.context.tsx';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { monthNames } from '../../../../constants/data.ts';
import { ModalComponent } from '../../../../components/modal/modal.tsx';

export const Calendar: React.FC = () => {
  const { events } = useDetails();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDay = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 1,
  });
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

  // Zmiana formatowania miesiąca
  // Zmiana formatowania miesiąca
  const monthName =
    monthNames[(currentMonth.getMonth() + 1) as keyof typeof monthNames];
  const year = currentMonth.getFullYear();

  return (
    <div className={styles.container}>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <p>To jest treść modalu</p>
      </ModalComponent>

      {/*<button*/}
      {/*    onClick={() => {*/}
      {/*        setIsModalOpen(true);*/}
      {/*    }}*/}
      {/*>*/}
      {/*    dodaj nowe*/}
      {/*</button>*/}
      <div className={styles.calendarHeader}>
        <button className={styles.button} onClick={previousMonth}>
          <MdNavigateBefore />
        </button>
        <div>{`${monthName} ${year}`}</div>{' '}
        <button className={styles.button} onClick={nextMonth}>
          <MdNavigateNext />
        </button>
      </div>
      <div className={styles.daysLegend}>
        {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'].map((dayName) => (
          <div
            className={`${styles.dayItem} ${
              dayName === 'Sob' || dayName === 'Niedz' ? styles.dayItemWeek : ''
            }`}
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
