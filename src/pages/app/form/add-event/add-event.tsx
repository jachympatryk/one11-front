import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { createEvent } from '../../../../server/event/event.server.ts';
import { useApp } from '../../app.context.tsx';
import { formatISO } from 'date-fns';
import { useDetails } from '../../details.context.tsx';

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

export const AddEvent = ({ closeModal }) => {
  const { userSelectedFunctionality } = useApp();
  const { refetchTeamDetails } = useDetails();

  const {
    mutateAsync: createEventMutation,
    isLoading,
    isError,
    error,
  } = useMutation(createEvent, {
    onSuccess: (data) => {
      console.log('Event created successfully:', data);
    },
    onError: (err) => {
      console.error('Error creating event:', err);
    },
  });

  return (
    <div>
      <h1>Dodaj Nowe Wydarzenie</h1>
      <Formik
        initialValues={{
          name: '',
          event_type: '',
          created_by: '',
          start_time: '',
          end_time: '',
          line_up: '',
          opponent: '',
          collection_time: '',
          own_transport: false,
          description_before: '',
          description_after: '',
          teamId: userSelectedFunctionality.teamId || 0, // Ustawienie domyślne, jeśli teamId jest nieznane
        }}
        validationSchema={EventSchema}
        onSubmit={async (values, actions) => {
          const formattedValues = {
            ...values,
            start_time: values.start_time
              ? formatISO(new Date(values.start_time))
              : null,
            end_time: values.end_time
              ? formatISO(new Date(values.end_time))
              : null,
            collection_time: values.collection_time
              ? formatISO(new Date(values.collection_time))
              : null,
          };

          try {
            await createEventMutation(formattedValues);
            await refetchTeamDetails();
            closeModal();
            actions.resetForm();
          } catch (error) {
            console.error('Error creating event:', error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field name="name" type="text" placeholder="Nazwa wydarzenia" />
            <Field name="event_type" as="select">
              <option value="">Wybierz typ wydarzenia</option>
              <option value="MATCH">Mecz</option>
              <option value="TRAINING">Trening</option>
              <option value="OTHER">Inne</option>
              <option value="MEETING">Spotkanie</option>
            </Field>
            <Field name="created_by" type="text" placeholder="Twórca" />
            <Field name="start_time" type="datetime-local" />
            <Field name="end_time" type="datetime-local" />
            <Field name="line_up" type="text" placeholder="Skład" />
            <Field name="opponent" type="text" placeholder="Przeciwnik" />
            <Field name="collection_time" type="datetime-local" />
            <Field name="own_transport" type="checkbox" />
            <Field
              name="description_before"
              as="textarea"
              placeholder="Opis przed"
            />
            <Field
              name="description_after"
              as="textarea"
              placeholder="Opis po"
            />
            <Field name="teamId" type="number" placeholder="ID Drużyny" />

            <button type="submit" disabled={isSubmitting || isLoading}>
              Dodaj Wydarzenie
            </button>

            {isError && (
              <p>Error: {error?.message || 'Unknown error occurred'}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
