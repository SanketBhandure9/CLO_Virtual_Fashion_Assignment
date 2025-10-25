import styles from "./InputFilter.module.css";

const InputFilter = () => {
  return (
    <div className={styles["input-filter"]}>
      <input type="text" placeholder="Find the items you're looking for" />
    </div>
  );
};

export default InputFilter;
