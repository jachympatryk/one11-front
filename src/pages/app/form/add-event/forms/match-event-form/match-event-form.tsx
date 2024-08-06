import { Formik, Form, Field } from 'formik';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../../../../../services/events/eventApi.ts';
import { EventModel, EventType } from '../../../../../../models/event.ts';
import { matchSchema } from './match-event-form.contants.ts';
import { useGetLocationsByClubIdQuery } from '../../../../../../services/locations/locationsApi.ts';
import { useGetTeamLineupsQuery } from '../../../../../../services/team/teamApi.ts';
import { useUser } from '../../../../../../hooks/userUser.ts';
import { useTeamEvents } from '../../../../../../hooks/useEvents.ts';
import styles from './match-event-form.module.scss';
import { useConditionalEventRefetch } from '../../add-event.contstants.ts';

export const MatchEventForm = ({
  closeModal,
  eventToEdit,
}: {
  closeModal: () => void;
  eventToEdit?: EventModel;
}) => {
  const [createEvent, { isLoading: isCreating, isError: isCreateError }] =
    useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateEventMutation();
  const { selectedFunctionary } = useUser();
  const { refetchEvents } = useTeamEvents();
  const { refetchEvent } = useConditionalEventRefetch(eventToEdit);

  const { data: locations } = useGetLocationsByClubIdQuery(1);
  const { data: lineups } = useGetTeamLineupsQuery(
    selectedFunctionary?.teamId as number,
    {
      skip: !selectedFunctionary?.teamId,
    }
  );

  const initialValues = {
    name: eventToEdit?.name || '',
    event_type: 'MATCH',
    start_time: eventToEdit?.start_time
      ? new Date(eventToEdit.start_time).toISOString().slice(0, 16)
      : '',
    end_time: eventToEdit?.end_time
      ? new Date(eventToEdit.end_time).toISOString().slice(0, 16)
      : '',
    lineupId: eventToEdit?.lineupId?.toString() || '',
    opponent: '',
    collection_time: eventToEdit?.collection_time
      ? new Date(eventToEdit.collection_time).toISOString().slice(0, 16)
      : '',
    own_transport: eventToEdit?.own_transport || false,
    description_before: eventToEdit?.description_before || '',
    teamId: eventToEdit?.teamId?.toString() || '',
    locationId: eventToEdit?.locationId?.toString() || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={matchSchema}
      onSubmit={async (values, actions) => {
        const formattedValues = {
          ...values,
          created_at: new Date(),
          start_time: values.start_time
            ? new Date(values.start_time)
            : new Date(),
          end_time: values.end_time ? new Date(values.end_time) : undefined,
          collection_time: values.collection_time
            ? new Date(values.collection_time)
            : undefined,
          event_type: values.event_type as EventType,
          locationId: parseInt(values.locationId),
          lineupId: parseInt(values.lineupId),
          teamId: selectedFunctionary?.teamId as number,
        };

        try {
          if (eventToEdit) {
            await updateEvent({
              eventId: eventToEdit.id,
              updateData: formattedValues,
            }).unwrap();
          } else {
            await createEvent(formattedValues).unwrap();
          }
          closeModal();
          actions.resetForm();
          await refetchEvents();
        } catch (error) {
          console.error('Error submitting event:', error);
        } finally {
          if (refetchEvent) refetchEvent();
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
            <label htmlFor="lineupId">Skład - opcjonalnie</label>
            <Field as="select" name="lineupId" className={styles.select}>
              <option value="">Wybierz skład</option>
              {lineups?.map((lineup) => (
                <option key={lineup.id} value={lineup.id}>
                  {lineup.name}
                </option>
              ))}
            </Field>
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="locationId">Lokalizacja</label>
            <Field as="select" name="locationId" className={styles.select}>
              <option value="">Wybierz lokalizację</option>
              {locations?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </Field>
          </div>

          <div className={styles.fieldWrapper}>
            <label htmlFor="own_transport">Własny transport</label>
            <Field
              name="own_transport"
              type="checkbox"
              className={styles.checkbox}
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
            <label htmlFor="collection_time">Czas zbiórki - opcjonalnie</label>
            <Field
              name="collection_time"
              type="datetime-local"
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isCreating || isUpdating}
            className={styles.submitButton}
          >
            {eventToEdit ? 'Zaktualizuj Wydarzenie' : 'Dodaj Wydarzenie'}
          </button>

          {(isCreateError || isUpdateError) && (
            <p className={styles.error}>
              Wystąpił błąd podczas zapisywania wydarzenia
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};
