import { Formik, Form, Field } from 'formik';
import { useCreateEventMutation } from '../../../../../../services/events/eventApi.ts';
import { EventType } from '../../../../../../models/event.ts';
// import { trainingSchema } from './training-event-form.constants.ts';
import { useGetLocationsByClubIdQuery } from '../../../../../../services/locations/locationsApi.ts';
import { useUser } from '../../../../../../hooks/userUser.ts';
import { useTeamEvents } from '../../../../../../hooks/useEvents.ts';
import styles from '../match-event-form/match-event-form.module.scss';

export const TrainingEventForm = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [createEvent, { isLoading, isError }] = useCreateEventMutation();
  const { selectedFunctionary } = useUser();
  const { refetchEvents } = useTeamEvents();

  const { data: locations } = useGetLocationsByClubIdQuery(1);

  return (
    <Formik
      initialValues={{
        name: '',
        event_type: 'TRAINING',
        start_time: '',
        end_time: '',
        description_before: '',
        locationId: '',
      }}
      // validationSchema={trainingSchema}
      onSubmit={async (values, actions) => {
        const formattedValues = {
          ...values,
          created_at: new Date(),
          start_time: values.start_time
            ? new Date(values.start_time)
            : new Date(),
          end_time: values.end_time ? new Date(values.end_time) : undefined,
          event_type: values.event_type as EventType,
          locationId: parseInt(values.locationId),
          teamId: selectedFunctionary?.teamId as number,
        };

        try {
          await createEvent(formattedValues).unwrap();
          closeModal();
          actions.resetForm();
          await refetchEvents();
        } catch (error) {
          console.error('Error creating event:', error);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.eventFormContainer}>
          <div className={styles.fieldWrapper}>
            <label htmlFor="name">Nazwa wydarzenia - opcjonalnie</label>
            <Field
              name="name"
              type="text"
              placeholder="Nazwa wydarzenia"
              className={styles.input}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="start_time">Czas rozpoczęcia</label>
            <Field
              name="start_time"
              type="datetime-local"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="end_time">Czas zakończenia - opcjonalnie</label>
            <Field
              name="end_time"
              type="datetime-local"
              className={styles.input}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="description_before">Opis - opcjonalnie</label>
            <Field
              name="description_before"
              as="textarea"
              placeholder="Opis"
              className={styles.textarea}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="locationId">Lokalizacja</label>
            <Field
              as="select"
              name="locationId"
              required
              className={styles.select}
            >
              <option value="">Wybierz lokalizację</option>
              {locations?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </Field>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={styles.submitButton}
          >
            Dodaj Wydarzenie
          </button>

          {isError && (
            <p className={styles.error}>
              Wystąpił błąd przy tworzeniu wydarzenia
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};
