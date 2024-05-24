import { Table as TableComponent } from '../../components/table/table.tsx';
import styles from './table.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.ts';
import { useGetTeamQuery } from '../../../../services/team/teamApi.ts';
import { Loader } from '../../components/loader/loader.tsx';

export const Table = () => {
  const userTeamId = useSelector(
    (state: RootState) => state.user.selectedFunctionary?.teamId
  );

  const { data, isError, isLoading, isSuccess } = useGetTeamQuery(
    userTeamId as number,
    {
      skip: !userTeamId,
    }
  );

  if (isLoading) return <Loader />;
  if (isError) return <div className={styles.container}>Wystąpił błąd</div>;
  if (!isSuccess || !data)
    return <div className={styles.container}>Brak danych</div>;

  return (
    <div className={styles.container}>
      <TableComponent table={data.table} />
    </div>
  );
};
