import styles from './App.module.scss';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className={styles.App}>
      <Home />
    </div>
  );
}

export default App;
