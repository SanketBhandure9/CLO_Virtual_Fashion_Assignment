import { useDispatch, useSelector } from "react-redux";
import styles from "./OtherFilters.module.css";
import {
  applyFilters,
  resetProducts,
  toggleAccessType,
} from "../store/productsSlice";
import { PricingOptions, numericToLabels } from "../assets/constants";

const OtherFilters = () => {
  const dispatch = useDispatch();
  const { accessType } = useSelector((state) => state.products.filters);

  const handleCheckboxChange = (option) => {
    console.log("Checkbox changed:", option, accessType);
    dispatch(toggleAccessType(option));
    dispatch(applyFilters());
  };

  const handleReset = () => {
    dispatch(resetProducts());
  };

  return (
    <div className={styles["other-filters"]}>
      <div className={styles["checkbox-group"]}>
        <span>Pricing Options</span>
        {Object.keys(PricingOptions).map((option) => (
          <div className={styles["checkbox-item"]} key={option}>
            <input
              className={styles["checkbox-item-input"]}
              type="checkbox"
              id={option}
              checked={accessType.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <label htmlFor={option}>
              {numericToLabels[PricingOptions[option]].filterLabel}
            </label>
          </div>
        ))}
      </div>
      <button className={styles["apply-button"]} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default OtherFilters;
