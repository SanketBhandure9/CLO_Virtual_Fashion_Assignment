import InputFilter from "./InputFilter";
import OtherFilters from "./OtherFilters";
import styles from "./AppFilters.module.css";
import SortDropdown from "./SortDropdown";

const AppFilters = () => {
  return (
    <div className={styles["app-filters"]}>
      <InputFilter />
      <OtherFilters />
      <SortDropdown />
    </div>
  );
};

export default AppFilters;
