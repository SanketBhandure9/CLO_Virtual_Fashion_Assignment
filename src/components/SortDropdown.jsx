import { useDispatch, useSelector } from "react-redux";
import { SORT_OPTIONS } from "../assets/constants";
import { applyFiltersAndSort, setSortBy } from "../store/productsSlice";
import styles from "./SortDropdown.module.css";

const SortDropdown = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.products.sortBy);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
    dispatch(applyFiltersAndSort());
  };

  return (
    <div className={styles["sort-dropdown-container"]}>
      <div className={styles["sort-dropdown"]}>
        <label htmlFor="sort">Sort By: </label>
        <select
          className={styles.select}
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
        >
          {Object.values(SORT_OPTIONS).map((option) => (
            <option
              key={option.value}
              className={styles.option}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
