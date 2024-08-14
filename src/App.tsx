import React from 'react';
import BookList from './components/BookList/BookList';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="navbar-title">Book Web App</div>
        </nav>
      </header>
      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;