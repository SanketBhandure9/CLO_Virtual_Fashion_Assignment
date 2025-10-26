import { useEffect, useRef } from "react";
import { PRODUCTS_API_URL } from "../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setAllProducts } from "../store/productsSlice";
import ShimmerUI from "./ShimmerUI";
import ProductCard from "./ProductCard";

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
      } catch (error) {
        dispatch(setError(error.message));
        console.error("Error fetching products: " + error.message, error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      {status === "loading" ? (
        <ShimmerUI />
      ) : (
        visibleProducts.map((product) => <ProductCard key={product.id} />)
      )}
      <div ref={sentinelRef}></div>
    </div>
  );
};

export default Products;
