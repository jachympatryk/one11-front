import { Routes, Route } from 'react-router-dom';
import { SideMenu } from './components/side-menu/side-menu.tsx';
import { UserFunctionalitySelect } from './components/user-functionality-select/user-functionality-select.tsx';
import styles from './app.module.scss';
import { Dashboard } from './pages/dashboard/dashboard.tsx';
import { Calendar } from './pages/calendar/calendar.tsx';

import useIsMobile from '../../hooks/useIsMobile.tsx';
import { useApp } from './app.context.tsx';
import { Players } from './pages/players/players.tsx';

export const AppPage = () => {
    const isMobile = useIsMobile();

    const { userSelectedFunctionality, isDataLoading, isDataFetched } =
        useApp();

    if (isDataLoading) return <div>loading</div>;

    return (
        <div className={styles.wrapper}>
            {!isMobile && <SideMenu />}
            <UserFunctionalitySelect />
            <div className={styles.content}>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="players" element={<Players />} />
                </Routes>
            </div>
        </div>
    );
};
