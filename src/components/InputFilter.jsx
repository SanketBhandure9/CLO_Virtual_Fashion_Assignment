import { useDispatch, useSelector } from "react-redux";
import styles from "./InputFilter.module.css";
import { setSearchText, applyFilters } from "../store/productsSlice.js";

const InputFilter = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector((state) => state.products.filters);

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value));
    dispatch(applyFilters());
  };

  return (
    <div className={styles["input-filter"]}>
      <input
        className={styles.input}
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Find the items you're looking for"
      />
    </div>
  );
};

export default InputFilter;
