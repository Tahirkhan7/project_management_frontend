import styles from "./Sidebar.module.css"
import { NavLink } from "react-router-dom";
import { useModal } from "../../model/ModalContext";

const Sidebar = () => {
  const { openModal } = useModal();

  return (
    <aside className={styles.siderbarMain}>
      <div className={styles.logoSec}>
        <NavLink to="/">
          <img src="./images/logo/d-logo.png" alt="Logo" />
        </NavLink>
      </div>

      <div className={styles.menuItemsSec}>
        <nav className="">
          <div>
            <ul className={styles.navListItems}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navlist} ${styles.active}`
                      : styles.navlist
                  }
                >
                  <img src="./images/login/layout.png" />
                  Board
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/analytics"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navlist} ${styles.active}`
                      : styles.navlist
                  }
                >
                  <img src="./images/login/database.png" />
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navlist} ${styles.active}`
                      : styles.navlist
                  }
                >
                  <img src="./images/login/settings.png" />
                  Setting
                </NavLink>
              </li>
              <li className={styles.logoutBtn}>
                <NavLink onClick={openModal} className={styles.navlist}>
                  <img src="./images/login/logout.png" alt="Logout" />
                  Log out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
