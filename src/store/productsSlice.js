import { createSlice } from "@reduxjs/toolkit";
import { numericToLabels } from "../assets/constants";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    filteredProducts: [],
    visibleProducts: [],
    filters: {
      accessType: [],
      searchText: "",
    },
    status: "idle",
    error: null,
    chunkSize: 20,
  },
  reducers: {
    setAllProducts(state, action) {
      state.allProducts = [...action.payload];
      state.filteredProducts = action.payload;
      state.visibleProducts = action.payload.slice(0, state.chunkSize);
      state.status = "succeeded";
    },
    toggleAccessType(state, action) {
      const type = action.payload;
      const index = state.filters.accessType.indexOf(type);
      if (index >= 0) {
        state.filters.accessType.splice(index, 1);
      } else {
        state.filters.accessType.push(type);
      }
    },
    setSearchText(state, action) {
      state.filters.searchText = action.payload;
    },
    applyFilters(state) {
      const { accessType, searchText } = state.filters;

      let filtered = [...state.allProducts];

      console.log(
        "Applying filters:",
        state.filters,
        JSON.parse(JSON.stringify(state.allProducts)),
        JSON.parse(JSON.stringify(filtered))
      );

      if (accessType.length > 0) {
        filtered = filtered.filter((product) =>
          accessType.includes(numericToLabels[product.pricingOption].accessType)
        );
      }

      console.log(
        "After filters:",
        state.filters,
        JSON.parse(JSON.stringify(filtered))
      );

      if (searchText.trim() !== "") {
        const lowerSearchText = searchText.toLowerCase();
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(lowerSearchText)
        );
      }

      state.filteredProducts = filtered;
      state.visibleProducts = filtered.slice(0, state.chunkSize);
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
      const nextChunk = state.filteredProducts.slice(
        currentLength,
        currentLength + state.chunkSize
      );
      state.visibleProducts.push(...nextChunk);
    },
    resetProducts(state) {
      state.filteredProducts = [...state.allProducts];
      state.visibleProducts = state.allProducts.slice(0, state.chunkSize);
      state.status = state.allProducts.length > 0 ? "succeeded" : "idle";
      state.error = null;
      state.filters = {
        accessType: [],
        searchText: "",
      };
    },
  },
});

export const {
  setAllProducts,
  setLoading,
  setError,
  showMoreProducts,
  resetProducts,
  applyFilters,
  toggleAccessType,
  setSearchText,
} = productsSlice.actions;

export default productsSlice.reducer;
