import { Table as TableComponent } from '../../components/table/table.tsx';
import styles from './table.module.scss';

export const Table = () => {
  return (
    <div className={styles.container}>
      <TableComponent />
    </div>
  );
};
