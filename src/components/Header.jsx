import { APP_LOGO } from "../assets/logos";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["app-logo"]}>
        <img src={APP_LOGO} alt="App Logo" />
      </div>
    </header>
  );
};

export default Header;
