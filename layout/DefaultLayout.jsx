import { Outlet } from 'react-router-dom';  
import Sidebar from '../components/Sidebar/Sidebar';
import { ModalProvider } from '../model/ModalContext';
import styles from "./DefaultLayout.module.css";

const DefaultLayout = () => {

  return (
    <ModalProvider>
      <div className={styles.layoutMain}>
        <div className={styles.layoutMainStyle}>
          <Sidebar />
          <div className={styles.mainDashboard}>
            <main>
              <div className={styles.mainContent}>
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
      </ModalProvider>
  );
};

export default DefaultLayout;
