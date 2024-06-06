import * as Yup from 'yup';

export const matchSchema = Yup.object().shape({
  name: Yup.string().optional(),
  start_time: Yup.date().required('Start time is required'),
  end_time: Yup.date().optional(),
  lineupId: Yup.number().optional(),
  opponent: Yup.string().optional(),
  collection_time: Yup.date().optional(),
  own_transport: Yup.boolean().optional(),
  description_before: Yup.string().optional(),
  description_after: Yup.string().optional(),
  locationId: Yup.number().required('Location is required'),
});
