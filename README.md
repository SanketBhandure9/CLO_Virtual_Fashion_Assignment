...existing code...

# CLO Virtual Fashion Assignment

Small React + Redux application to browse products (virtual fashion). Built with modern React, Redux Toolkit and CSS Modules.

## Key features

- Fetch products from a remote API (PRODUCTS_API_URL).
- Global state using Redux Toolkit (products slice).
- Filtering:
  - Pricing / access type filter (mapped from numeric API values).
  - Text search.
- Sorting: alphabetically, price higher → lower, price lower → higher.
- Infinite scroll (IntersectionObserver) that loads visible items in chunks.
- Reset filters (restores full product list and keeps infinite-scroll working).
- Responsive UI with CSS Modules per-component.
- Loading shimmer UI and empty-state message.
- Clear separation of components: Header, AppFilters, InputFilter, OtherFilters, SortDropdown, Products, ProductCard, ShimmerUI.

## Project structure (important files)

- src/
  - components/
    - AppFilters.jsx — groups InputFilter, OtherFilters, SortDropdown
    - InputFilter.jsx — search input
    - OtherFilters.jsx — pricing/access checkboxes + reset
    - SortDropdown.jsx — sort selector
    - Products.jsx — product list, fetch, infinite-scroll sentinel
    - ProductCard.jsx — single product UI
    - ShimmerUI.jsx — loading skeletons
  - store/
    - store.js — configureStore
    - productsSlice.js — reducers, filtering, pagination logic
  - assets/
    - constants.js — PRODUCTS_API_URL, Pricing enum and numericToLabels mapping
  - App.jsx, main.jsx, index.css, etc.

## How it works (brief)

- On mount, Products.jsx dispatches setLoading(), fetches products, then dispatches setAllProducts() and applyFiltersAndSort().
- productsSlice stores:
  - allProducts: raw API results
  - filteredProducts: results after filters & sort
  - visibleProducts: current paginated view (chunkSize)
- applyFiltersAndSort uses numericToLabels[product.pricingOption].accessType to match checkboxes.
- Infinite scroll dispatches showMoreProducts() when sentinel enters viewport. showMoreProducts appends the next chunk from filteredProducts.
- resetProducts restores filters, filteredProducts and visibleProducts from allProducts and sets status to "succeeded" when products exist — ensuring infinite scroll continues to work.

## Common troubleshooting notes

- CSS Modules: import styles from './X.module.css' and use className={styles.myClass} or styles['hyphen-class'] if hyphenated.
- Immer Proxy when logging inside reducers: console.log(state) will show Proxy. Use JSON.parse(JSON.stringify(state)) for readable logs.
- If you see "Cannot create property 'status' on string ''", ensure reducers receive and mutate the draft state (use state.status, not status).
- Reset button: ensure resetProducts does not clear allProducts; it should only reset filters and recompute filtered/visible arrays.

## Run locally (Windows)

1. Install deps:
   - npm install
2. Start dev server:
   - npm run dev
