import { useDetails } from '../../details.context.tsx';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import styles from './events-list.module.scss';
import { monthNames } from '../../../../constants/data.ts';
import { EventModel } from '../../../../models/event.ts';
import { EventCard } from '../event-card/event-card.tsx';

export const EventsList = () => {
  const { events } = useDetails();

  const eventsGroupedByMonthAndDay: EventModel[] = events.reduce(
    (acc, event) => {
      const month = format(parseISO(event.start_time), 'yyyy-MM', {
        locale: pl,
      });
      const day = format(parseISO(event.start_time), 'EEEE dd.MM', {
        locale: pl,
      });
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][day]) {
        acc[month][day] = [];
      }
      acc[month][day].push(event);
      return acc;
    },
    {}
  );

  const sortedMonths = Object.keys(eventsGroupedByMonthAndDay).sort();

  return (
    <div className={styles.container}>
      <p>Plan</p>
      <div className={styles.eventsWrapper}>
        {sortedMonths.map((month) => {
          const date = parseISO(`${month}-01`); // Tworzymy datę z pierwszego dnia miesiąca, aby móc wykorzystać getMonth()
          const monthName = monthNames[date.getMonth() + 1]; // Używamy getMonth() + 1, aby uzyskać poprawny miesiąc z mapy
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
                            new Date(a.start_time) - new Date(b.start_time)
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
