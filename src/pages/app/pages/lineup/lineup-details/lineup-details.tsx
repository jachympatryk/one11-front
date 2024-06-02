import { useParams, useNavigate } from 'react-router-dom';
import { LineupOverview } from '../../../components/lineup-overview/lineup-overview.tsx';
import styles from './lineup-details.module.scss';
import { useGetLineupsQuery } from '../../../../../services/lineups/lineupsApi.ts';
import { useGetTeamPlayersQuery } from '../../../../../services/team/teamApi.ts';
import { useUser } from '../../../../../hooks/userUser.ts';
import { IoIosArrowBack } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

export const LineupDetails = ({
  propsLineupId,
}: {
  propsLineupId?: number;
}) => {
  const { lineupId } = useParams();
  const navigate = useNavigate();

  const lineupNumeric = propsLineupId
    ? propsLineupId
    : parseInt(String(lineupId as unknown as number));

  if (!lineupNumeric) return;

  const { selectedFunctionary } = useUser();

  const { data: lineup } = useGetLineupsQuery(lineupNumeric, {
    skip: !lineupNumeric,
  });

  const { data: players } = useGetTeamPlayersQuery(
    selectedFunctionary?.teamId as number,
    {
      skip: !selectedFunctionary,
    }
  );

  // Funkcja nawigująca do strony głównej lineup
  const handleBackClick = () => {
    navigate('/app/lineup');
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonsWrapper}>
        <button className={styles.button} onClick={handleBackClick}>
          <IoIosArrowBack />
        </button>

        <button className={styles.button} onClick={handleBackClick}>
          <MdEdit />
        </button>
      </div>
      {lineup && players && (
        <LineupOverview lineup={lineup} players={players} />
      )}
    </div>
  );
};
