import React from 'react';
import BookList from './components/BookList/BookList';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <nav className={styles.navbar}>
          <div className={styles.navbarTitle}>Book Web App</div>
        </nav>
      </header>
      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;