import React, { useEffect, useState } from 'react';
import {
  parseISO,
  format,
  isSameMonth,
  startOfWeek,
  addWeeks,
  isSameWeek,
} from 'date-fns';
import { pl } from 'date-fns/locale';
import styles from './events-list.module.scss';
import { monthNames } from '../../../../constants/data.ts';
import { EventModel } from '../../../../models/event.ts';
import { EventCard } from '../event-card/event-card.tsx';

interface EventsByDay {
  [day: string]: EventModel[];
}

interface EventsByMonth {
  [month: string]: EventsByDay;
}

interface EventsListProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isCurrentWeek?: boolean;
  isNextWeek?: boolean;
  events: EventModel[];
}

export const EventsList: React.FC<EventsListProps> = ({
  currentMonth,
  isCurrentWeek,
  isNextWeek,
  events,
}) => {
  const [eventsGroupedByMonthAndDay, setEventsGroupedByMonthAndDay] =
    useState<EventsByMonth>({});

  useEffect(() => {
    if (events && events.length !== 0) {
      const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      const nextWeekStart = addWeeks(currentWeekStart, 1);

      const filteredEvents = events.filter((event) => {
        const eventDate = event?.start_time;
        if (isCurrentWeek) {
          return isSameWeek(eventDate, currentWeekStart, { weekStartsOn: 1 });
        } else if (isNextWeek) {
          return isSameWeek(eventDate, nextWeekStart, { weekStartsOn: 1 });
        }
        return isSameMonth(eventDate, currentMonth);
      });

      const newEventsGroupedByMonthAndDay: EventsByMonth =
        filteredEvents.reduce<EventsByMonth>((acc, event) => {
          const month = format(event?.start_time, 'yyyy-MM', { locale: pl });
          const day = format(event?.start_time, 'EEEE dd.MM', { locale: pl });

          acc[month] = acc[month] || {};
          acc[month][day] = acc[month][day] || [];
          acc[month][day].push(event);
          return acc;
        }, {});

      setEventsGroupedByMonthAndDay(newEventsGroupedByMonthAndDay);
    }
  }, [events, currentMonth, isCurrentWeek, isNextWeek]);

  if (Object.keys(eventsGroupedByMonthAndDay).length === 0) {
    return <div className={styles.noEvents}>Brak wydarzeń do wyświetlenia</div>;
  }

  if (!events) return null;

  const sortedMonths = Object.keys(eventsGroupedByMonthAndDay).sort();

  const planName = isCurrentWeek
    ? 'Plan na bieżący tydzień'
    : isNextWeek
      ? 'Plan na następny tydzień'
      : 'Plan na miesiąc';

  return (
    <div className={styles.container}>
      <p className={styles.sectionTitle}>{planName}</p>
      <div className={styles.eventsWrapper}>
        {sortedMonths.map((month) => {
          const date = parseISO(`${month}-01`);
          const monthName = monthNames[date.getMonth()];
          const year = date.getFullYear();

          return (
            <div key={month} className={styles.monthWrapper}>
              {!isCurrentWeek && !isNextWeek && (
                <p className={styles.monthName}>{`${monthName} ${year}`}</p>
              )}
              {Object.keys(eventsGroupedByMonthAndDay[month])
                .map((dayKey) => {
                  const dayNumberMatch = dayKey.match(/\d+/);
                  if (!dayNumberMatch) return null;
                  const dayNumber = dayNumberMatch[0];
                  const date = parseISO(`${month}-${dayNumber}`);
                  return { dayKey, date };
                })
                .filter(
                  (item): item is { dayKey: string; date: Date } =>
                    item !== null
                )
                .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sortujemy tylko obiekty z pełnymi właściwościami
                .map(({ dayKey }) => (
                  <div key={dayKey} className={styles.dayWrapper}>
                    <p className={styles.dayName}>{dayKey}</p>
                    <ul className={styles.eventsList}>
                      {eventsGroupedByMonthAndDay[month][dayKey]
                        .sort(
                          (a, b) =>
                            new Date(a?.start_time).getTime() -
                            new Date(b?.start_time).getTime()
                        )
                        .map((event) => (
                          <EventCard event={event} key={event.id} />
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
