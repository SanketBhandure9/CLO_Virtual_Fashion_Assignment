import styles from "./ProductCard.module.css";
import { numericToLabels } from "../assets/constants";

const ProductCard = ({ product }) => {
  const { imagePath, title, creator, price, pricingOption } = product;

  return (
    <div className={styles["product-card"]}>
      <img
        src={imagePath}
        alt={title}
        className={styles.poster}
        loading="lazy"
      />
      <div className={styles["product-info"]}>
        <span className={styles["product-titles"]}>
          <span>{title}</span>
          <span className={styles.creator}>{creator}</span>
        </span>
        {pricingOption === 0 ? (
          <p className={styles["product-price"]}>{`$${price}`}</p>
        ) : (
          <p className={styles["product-price"]}>
            {numericToLabels[pricingOption].cardLabel}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
