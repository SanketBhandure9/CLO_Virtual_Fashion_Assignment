import styles from "./OtherFilters.module.css";

const checkboxes = [
  { label: "Paid", value: "paid" },
  { label: "Free", value: "free" },
  { label: "View Only", value: "viewOnly" },
];

const OtherFilters = () => {
  return (
    <div className={styles["other-filters"]}>
      <div className={styles["checkbox-group"]}>
        <span>Pricing Options</span>
        {checkboxes.map((checkbox) => (
          <div className={styles["checkbox-item"]} key={checkbox.value}>
            <input
              className={styles["checkbox-item-input"]}
              type="checkbox"
              id={checkbox.value}
            />
            <label htmlFor={checkbox.value}>{checkbox.label}</label>
          </div>
        ))}
      </div>
      <button className={styles["apply-button"]}>Reset</button>
    </div>
  );
};

export default OtherFilters;
