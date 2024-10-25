import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerMain}>
      <div className={styles.headerContent}>
        <h5>Welcome! Kumar</h5>
        <p>12th Jan, 2024</p>
      </div>

    </header>
  );
};

export default Header;
