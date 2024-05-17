import { LineupBuilder } from '../../components/lineup-builder/lineup-builder.tsx';
import styles from './lineup.module.scss';
import { useQuery } from 'react-query';
import { getTeamLineups } from '../../../../server/team/team.server.ts';
import { useApp } from '../../app.context.tsx';
import { LineupList } from '../../components/lineup-list/lineup-list.tsx';
import { useState } from 'react';

export const Lineup = () => {
  const { userSelectedFunctionality } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);

  const { data: lineups } = useQuery(
    ['teamLineups', userSelectedFunctionality?.teamId],
    () => getTeamLineups(userSelectedFunctionality?.teamId || 0),
    {
      enabled: !!userSelectedFunctionality?.teamId,
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
