import styles from "./Sidebar.module.css";
import { NavLink } from 'react-router-dom';

import { useModal } from '../../model/ModalContext'; 


const Sidebar = (  ) => {
  const { openModal } = useModal(); 

  return (
    <aside
      className={styles.siderbarMain}
    >
      <div className={styles.logoSec}>
        <NavLink to="/">
          <img src="./images/logo/d-logo.png" alt="Logo" />
        </NavLink>
      </div>

      <div className={styles.menuItemsSec}>
        {/* <!-- Sidebar Menu --> */}
        <nav className="">          {/* <!-- Menu Group --> */}
          <div>

            <ul className={styles.navListItems}>

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                to="/"
                className={({ isActive }) => isActive ? `${styles.navlist} ${styles.active}` : styles.navlist}>
                  <img src="./images/login/layout.png" />
                  Board
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) => isActive ? `${styles.navlist} ${styles.active}` : styles.navlist}
                >
                  <img src="./images/login/database.png" />
                  Analytics
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => isActive ? `${styles.navlist} ${styles.active}` : styles.navlist}
                >
                  <img src="./images/login/settings.png" />
                  Setting
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}


              {/* <!-- Menu Item Profile --> */}
              <li className={styles.logoutBtn}>
              <NavLink
                onClick={openModal}
                className={styles.navlist}
              >
                <img src="./images/login/logout.png" alt="Logout" />
                Log out
              </NavLink>
            </li>
              {/* <!-- Menu Item Profile --> */}

              
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
