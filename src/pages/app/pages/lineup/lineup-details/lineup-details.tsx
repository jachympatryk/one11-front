import { useParams, useNavigate } from 'react-router-dom';
import { LineupOverview } from '../../../components/lineup-overview/lineup-overview.tsx';
import { useQuery } from 'react-query';
import { getTeamLineupById } from '../../../../../server/team/team.server.ts';
import { useApp } from '../../../app.context.tsx';
import styles from './lineup-details.module.scss';

export const LineupDetails = () => {
  const { userSelectedFunctionality } = useApp();
  const { lineupId } = useParams();
  const navigate = useNavigate(); // Używamy hooka useNavigate

  const lineupNumeric = parseInt(String(lineupId as unknown as number));

  console.log(userSelectedFunctionality);

  if (!lineupNumeric) return;

  const { data: lineup } = useQuery(
    ['teamLineup', lineupNumeric],
    () => {
      if (!userSelectedFunctionality?.teamId || !lineupNumeric) {
        throw new Error('Missing teamId or lineupId');
      }
      return getTeamLineupById(userSelectedFunctionality.teamId, lineupNumeric);
    },
    {
      enabled: !!lineupNumeric && !!userSelectedFunctionality?.teamId,
      onError: (error) => {
        console.error('Error fetching lineup:', error);
      },
    }
  );

  // Funkcja nawigująca do strony głównej lineup
  const handleBackClick = () => {
    navigate('/app/lineup');
  };

  return (
    <div className={styles.container}>
      <div>
        <button onClick={handleBackClick}>{'<'}</button>
      </div>
      {lineup && <LineupOverview lineup={lineup} />}
    </div>
  );
};
