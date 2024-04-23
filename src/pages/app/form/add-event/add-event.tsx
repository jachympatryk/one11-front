import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { createEvent } from '../../../../server/event/event.server.ts';
import { useApp } from '../../app.context.tsx';
import { useDetails } from '../../details.context.tsx';
import { CreateEventModel, EventType } from '../../../../models/event.ts';

const EventSchema = Yup.object().shape({
  name: Yup.string().required('Nazwa wydarzenia jest wymagana'),
  event_type: Yup.string().required('Typ wydarzenia jest wymagany'),
  created_by: Yup.string().required('Twórca wydarzenia jest wymagany'),
  start_time: Yup.date().required('Czas rozpoczęcia jest wymagany').nullable(),
  end_time: Yup.date().nullable(),
  line_up: Yup.string().optional(),
  opponent: Yup.string().optional(),
  collection_time: Yup.date().nullable(),
  own_transport: Yup.boolean().optional(),
  description_before: Yup.string().optional(),
  description_after: Yup.string().optional(),
  teamId: Yup.number().required('ID drużyny jest wymagane'),
});

export const AddEvent = ({ closeModal }: { closeModal: () => void }) => {
  const { userSelectedFunctionality } = useApp();
  const { refetchTeamDetails } = useDetails();

  const {
    mutateAsync: createEventMutation,
    isLoading,
    isError,
  } = useMutation(createEvent, {
    onSuccess: () => {
      closeModal();
      refetchTeamDetails();
    },
    onError: (err) => {
      console.error('Error creating event:', err);
    },
  });

  return (
    <div>
      <p>Dodaj Nowe Wydarzenie</p>
      <Formik
        initialValues={{
          name: '',
          event_type: '' as EventType,
          created_by: '1',
          start_time: '',
          end_time: '',
          line_up: '',
          opponent: '',
          collection_time: '',
          own_transport: false,
          description_before: '',
          description_after: '',
          teamId: userSelectedFunctionality?.teamId as number,
        }}
        validationSchema={EventSchema}
        onSubmit={async (values, actions) => {
          const formattedValues: CreateEventModel = {
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
          };

          try {
            await createEventMutation(formattedValues);
            actions.resetForm();
          } catch (error) {
            console.error('Error creating event:', error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name" type="text" placeholder="Nazwa wydarzenia" />
            <Field name="event_type" as="select">
              <option value="">Wybierz typ wydarzenia</option>
              <option value="MATCH">Mecz</option>
              <option value="TRAINING">Trening</option>
              <option value="TOURNAMENT">Turniej</option>
              <option value="MEETING">Spotkanie</option>
              <option value="OTHER">Inne</option>
            </Field>
            <Field name="start_time" type="datetime-local" />
            <Field name="end_time" type="datetime-local" />
            <Field name="line_up" type="text" placeholder="Skład" optional />
            <Field
              name="opponent"
              type="text"
              placeholder="Przeciwnik"
              optional
            />

            <Field name="collection_time" type="datetime-local" optional />

            <Field name="own_transport" type="checkbox" optional />
            <Field
              name="description_before"
              as="textarea"
              placeholder="Opis przed"
              optional
            />
            <Field
              name="description_after"
              as="textarea"
              placeholder="Opis po"
              optional
            />

            <button type="submit" disabled={isSubmitting || isLoading}>
              Dodaj Wydarzenie
            </button>

            {isError && <p> Unknown error occurred</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
