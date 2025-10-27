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
    sortBy: "name",
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
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    applyFiltersAndSort(state) {
      const { accessType, searchText } = state.filters;

      let filtered = [...state.allProducts];

      if (accessType.length > 0) {
        filtered = filtered.filter((product) =>
          accessType.includes(numericToLabels[product.pricingOption].accessType)
        );
      }

      if (searchText.trim() !== "") {
        const lowerSearchText = searchText.toLowerCase();
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(lowerSearchText)
        );
      }

      switch (state.sortBy) {
        case "higher":
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        case "lower":
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
        default:
          filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
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
  applyFiltersAndSort,
  toggleAccessType,
  setSearchText,
  setSortBy,
} = productsSlice.actions;

export default productsSlice.reducer;
