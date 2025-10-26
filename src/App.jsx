import styles from "./App.module.css";
import AppFilters from "./components/AppFilters.jsx";
import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <AppFilters />
      <Products />
    </div>
  );
}

export default App;
