import React from 'react';
import styles from './App.module.scss';
import Header from '~/components/Header/Header';
import BookList from '~/components/BookList/BookList';

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <Header />
      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;