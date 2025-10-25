import InputFilter from "./InputFilter";
import OtherFilters from "./OtherFilters";
import styles from "./AppFilters.module.css";

const AppFilters = () => {
  return (
    <div className={styles["app-filters"]}>
      <InputFilter />
      <OtherFilters />
    </div>
  );
};

export default AppFilters;
