const NO_OF_SHIMMERS = 18;

import styles from "./ShimmerUI.module.css";

const ShimmerUI = () => {
  return (
    <div className={styles["shimmer-ui"]}>
      {new Array(NO_OF_SHIMMERS).fill(0).map((_, index) => (
        <div key={index} className={styles["shimmer-card"]}></div>
      ))}
    </div>
  );
};

export default ShimmerUI;
