import { Table } from '../../components/table/table.tsx';
import styles from './dashboard.module.scss';

export const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Table />
    </div>
  );
};
