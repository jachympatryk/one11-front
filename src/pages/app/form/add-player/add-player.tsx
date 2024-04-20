// src/components/AddPlayerForm.tsx

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { formatISO } from 'date-fns';
import { createPlayer } from '../../../../server/player/player.server.ts';
import { useApp } from '../../app.context.tsx';
import { useDetails } from '../../details.context.tsx';

const PlayerSchema = Yup.object().shape({
  name: Yup.string().required('Imię jest wymagane'),
  surname: Yup.string().required('Nazwisko jest wymagane'),
  date_of_birth: Yup.date().required('Data urodzenia jest wymagana').nullable(),
  number: Yup.number().required('Numer zawodnika jest wymagany'),
  active: Yup.boolean(),
  teamId: Yup.number().nullable(),
  clubId: Yup.number().nullable(),
});

export const AddPlayerForm = ({ closeModal }) => {
  const { refetchTeamDetails } = useDetails();

  const {
    mutateAsync: createPlayerMutation,
    isLoading,
    isError,
    error,
  } = useMutation(createPlayer, {
    onSuccess: () => {
      console.log('Player created successfully');
      closeModal();
      refetchTeamDetails();
    },
    onError: (err) => {
      console.error('Error creating player:', err);
    },
  });

  return (
    <div>
      <p>Dodaj Nowego Zawodnika</p>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          date_of_birth: '',
          number: '',
          active: true,
          teamId: null,
          clubId: null,
        }}
        validationSchema={PlayerSchema}
        onSubmit={async (values, actions) => {
          const formattedValues = {
            ...values,
            date_of_birth: values.date_of_birth
              ? formatISO(new Date(values.date_of_birth))
              : null,
          };

          formattedValues.position = 'DEFENDER';

          await createPlayerMutation(formattedValues);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="name" type="text" placeholder="Imię" />
            <Field name="surname" type="text" placeholder="Nazwisko" />
            <Field
              name="date_of_birth"
              type="date"
              placeholder="Data urodzenia"
            />
            <Field name="number" type="number" placeholder="Numer" />
            <Field name="active" type="checkbox" />
            <Field name="teamId" type="number" placeholder="ID Drużyny" />
            <Field name="clubId" type="number" placeholder="ID Klubu" />

            <button type="submit" disabled={isSubmitting || isLoading}>
              Dodaj Zawodnika
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
