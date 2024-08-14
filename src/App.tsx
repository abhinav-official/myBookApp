import React from 'react';
import BookList from './components/BookList/BookList';
import './App.scss';

const App: React.FC = () => {


  return (
    <div className="App">
      <h1>Book Web App</h1>
      <BookList
      />
    </div>
  );
};

export default App;