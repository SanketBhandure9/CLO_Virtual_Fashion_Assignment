import styles from "./App.module.css";
import AppFilters from "./components/AppFilters.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <AppFilters />
    </div>
  );
}

export default App;
