import { useEffect, useRef } from "react";
import { PRODUCTS_API_URL } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setAllProducts,
  showMoreProducts,
  applyFiltersAndSort,
} from "../store/productsSlice";
import ShimmerUI from "./ShimmerUI";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";

const Products = () => {
  const dispatch = useDispatch();
  const { visibleProducts, status } = useSelector((state) => state.products);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading());
        const response = await fetch(PRODUCTS_API_URL);
        const data = await response.json();
        dispatch(setAllProducts(data));
        dispatch(applyFiltersAndSort());
      } catch (error) {
        dispatch(setError(error.message));
        console.error("Error fetching products: " + error.message, error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (status !== "succeeded") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(showMoreProducts());
          }
        });
      },
      {
        root: null,
        rootMargin: "150px",
        threshold: 0,
      }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [dispatch, status]);

  return (
    <div className={styles["products-container"]}>
      {status === "loading" && <ShimmerUI />}
      <div className={styles["products-list"]}>
        {status !== "loading" &&
          visibleProducts.length > 0 &&
          visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      {visibleProducts.length === 0 && (
        <p className={styles["no-products"]}>No products found :(</p>
      )}
      <div ref={sentinelRef}></div>
    </div>
  );
};

export default Products;
