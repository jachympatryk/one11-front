import { UserFunctionalitySelect } from './components/user-functionality-select/user-functionality-select.tsx';
import styles from './app.module.scss';
import { SideMenu } from './components/side-menu/side-menu.tsx';

export const AppPage = () => {
    return (
        <div className={styles.wrapper}>
            <SideMenu />
            <UserFunctionalitySelect />
            <div className={styles.content}>
                <p>content</p>
            </div>
        </div>
    );
};
