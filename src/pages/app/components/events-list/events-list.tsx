import { useDetails } from '../../details.context.tsx';
import { format, parseISO } from 'date-fns';
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

export const EventsList = () => {
  const { events } = useDetails();

  const eventsGroupedByMonthAndDay: EventsByMonth =
    events.reduce<EventsByMonth>((acc, event) => {
      const month = format(event.start_time, 'yyyy-MM', {
        locale: pl,
      });
      const day = format(event.start_time, 'EEEE dd.MM', {
        locale: pl,
      });

      acc[month] = acc[month] || {};
      acc[month][day] = acc[month][day] || [];
      acc[month][day].push(event);
      return acc;
    }, {});

  const sortedMonths = Object.keys(eventsGroupedByMonthAndDay).sort();

  return (
    <div className={styles.container}>
      <p>Plan</p>
      <div className={styles.eventsWrapper}>
        {sortedMonths.map((month) => {
          const date = parseISO(`${month}-01`); // Tworzymy datę z pierwszego dnia miesiąca, aby móc wykorzystać getMonth()
          const monthName = monthNames[date.getMonth() + 1];
          const year = date.getFullYear(); // Pobieramy rok

          return (
            <div key={month} className={styles.monthWrapper}>
              <p className={styles.monthName}>{`${monthName} ${year}`}</p>{' '}
              {Object.keys(eventsGroupedByMonthAndDay[month])
                .sort()
                .map((day) => (
                  <div key={day} className={styles.dayWrapper}>
                    <p className={styles.dayName}>{day}</p>
                    <ul className={styles.eventsList}>
                      {eventsGroupedByMonthAndDay[month][day]
                        .sort(
                          (a, b) =>
                            new Date(a.start_time).getTime() -
                            new Date(b.start_time).getTime()
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
