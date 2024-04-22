import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { createPlayer } from '../../../../server/player/player.server.ts';
import { useDetails } from '../../details.context.tsx';
import { PlayerModel, PlayerPosition } from '../../../../models/player.ts';
import { useApp } from '../../app.context.tsx';

const PlayerSchema = Yup.object().shape({
  name: Yup.string().required('Imię jest wymagane'),
  surname: Yup.string().required('Nazwisko jest wymagane'),
  date_of_birth: Yup.date().required('Data urodzenia jest wymagana').nullable(),
  number: Yup.number().required('Numer zawodnika jest wymagany'),
  active: Yup.boolean(),
  teamId: Yup.number().nullable(),
  clubId: Yup.number().nullable(),
  position: Yup.string()
    .oneOf(['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'STRIKER'])
    .required('Pozycja jest wymagana'),
});

export type CreatePlayerModel = Omit<PlayerModel, 'id'>;

export const AddPlayerForm = ({ closeModal }: { closeModal: () => void }) => {
  const { refetchTeamDetails } = useDetails();
  const { userSelectedFunctionality } = useApp();

  const {
    mutateAsync: createPlayerMutation,
    isLoading,
    isError,
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
          number: 0, // Początkowa wartość dla typu number powinna być liczbową wartością
          active: true,
          teamId: userSelectedFunctionality?.teamId,
          clubId: userSelectedFunctionality?.clubId,
          position: 'DEFENDER' as PlayerPosition,
        }}
        validationSchema={PlayerSchema}
        onSubmit={async (values, actions) => {
          const formattedValues: CreatePlayerModel = {
            ...values,
            date_of_birth: new Date(values.date_of_birth),
            number: Number(values.number),
            created_at: new Date(), // Data utworzenia jest ustawiana na bieżącą datę
          };

          try {
            await createPlayerMutation(formattedValues);
            console.log('Player created successfully');
            actions.resetForm();
          } catch (error) {
            console.error('Error creating player:', error);
          } finally {
            actions.setSubmitting(false);
          }
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

            <Field name="position" as="select">
              <option value="GOALKEEPER">Bramkarz</option>
              <option value="DEFENDER">Obrońca</option>
              <option value="MIDFIELDER">Pomocnik</option>
              <option value="STRIKER">Napastnik</option>
            </Field>

            <button type="submit" disabled={isSubmitting || isLoading}>
              Dodaj Zawodnika
            </button>

            {isError && <p>Unknown error occurred</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};
