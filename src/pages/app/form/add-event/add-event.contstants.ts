import * as Yup from 'yup';

export const EventSchema = Yup.object().shape({
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
