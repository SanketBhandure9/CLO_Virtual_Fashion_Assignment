import AppFilters from "./AppFilters";
import Products from "./Products";
import styles from "./Body.module.css";

const Body = () => {
  return (
    <div className={styles["app-body"]}>
      <AppFilters />
      <Products />
    </div>
  );
};

export default Body;
