import styles from './lineup.module.scss';
import { LineupList } from '../../components/lineup-list/lineup-list.tsx';
import { useState } from 'react';
import { useGetTeamLineupsQuery } from '../../../../services/team/teamApi.ts';
import { useUser } from '../../../../hooks/userUser.ts';
import { LineupBuilder } from '../../components/lineup-builder/lineup-builder.tsx';

export const Lineup = () => {
  const { selectedFunctionary } = useUser();

  const [isAddingNew, setIsAddingNew] = useState(false);

  const { data: lineups } = useGetTeamLineupsQuery(
    selectedFunctionary?.teamId as number,
    {
      skip: !selectedFunctionary?.teamId,
    }
  );

  const safeLineups = lineups || [];

  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => setIsAddingNew(!isAddingNew)}>
          {isAddingNew ? 'Cancel' : 'Add New Lineup'}
        </button>
      </div>

      {!isAddingNew && <LineupList lineups={safeLineups} />}
      {isAddingNew && <LineupBuilder />}
    </div>
  );
};
