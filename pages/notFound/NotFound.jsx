import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css";
export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <h1 className={styles.errorCode}>404</h1>
        <p
          className={styles.message}
        >{`Oops! The page you're looking for doesn't exist.`}</p>
        <NavLink to="/" className={styles.homeButton}>
            Go Home
        </NavLink>
      </div>
    </div>
  );
}
