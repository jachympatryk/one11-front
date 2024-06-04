import styles from './lineup.module.scss';
import { LineupList } from '../../components/lineup-list/lineup-list.tsx';
import { useState } from 'react';
import { useGetTeamLineupsQuery } from '../../../../services/team/teamApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';
import { LineupBuilder } from '../../components/lineup-builder/lineup-builder.tsx';
import { Loader } from '../../components/loader/loader.tsx';
import { MdAdd } from 'react-icons/md';

export const Lineup = () => {
  const { selectedFunctionary } = useUser();

  const [isAddingNew, setIsAddingNew] = useState(false);

  const {
    data: lineups,
    isLoading,
    isError,
    isSuccess,
  } = useGetTeamLineupsQuery(selectedFunctionary?.teamId as number, {
    skip: !selectedFunctionary?.teamId,
  });

  const safeLineups = lineups || [];

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isSuccess || !lineups)
    return <div className={styles.container}>Brak wydarzeń</div>;
  if (lineups.length === 0)
    return <div className={styles.container}>Brak wydarzeń</div>;

  return (
    <div className={styles.container}>
      <div className={styles.floatingButton}>
        <MdAdd onClick={() => setIsAddingNew(!isAddingNew)} />
      </div>

      <div className={styles.content}>
        {!isAddingNew && <LineupList lineups={safeLineups} />}
        {isAddingNew && <LineupBuilder />}
      </div>
    </div>
  );
};
