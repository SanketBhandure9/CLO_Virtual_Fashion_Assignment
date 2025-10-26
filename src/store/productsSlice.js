import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    visibleProducts: [],
    status: "idle",
    error: null,
    chunkSize: 20,
  },
  reducers: {
    setAllProducts(state, action) {
      state.allProducts = [...action.payload];
      state.visibleProducts = action.payload.slice(0, state.chunkSize);
      state.status = "succeeded";
    },
    setLoading(state) {
      state.status = "loading";
    },
    setError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    showMoreProducts(state) {
      const currentLength = state.visibleProducts.length;
      const nextChunk = state.allProducts.slice(
        currentLength,
        currentLength + state.chunkSize
      );
      state.visibleProducts.push(...nextChunk);
    },
    resetProducts(state) {
      state.allProducts = [];
      state.visibleProducts = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setAllProducts,
  setLoading,
  setError,
  showMoreProducts,
  resetProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
