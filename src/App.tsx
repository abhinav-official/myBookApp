import React, { useEffect, useState } from 'react';
import BookList from './components/BookList/BookList';
import AddBookForm from './components/AddBookForm/AddBookForm';
import { Book } from './types';
import './App.scss';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    const loadBooks = async () => {
      const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');
      const data = await response.json();
      setBooks(data);
    };

    loadBooks();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addBook = (book: Book) => {
    setLocalBooks([...localBooks, book]);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id) ? prevFavorites.filter(favId => favId !== id) : [...prevFavorites, id]
    );
  };

  return (
    <div className="App">
      <h1>Book Web App</h1>
      <AddBookForm addBook={addBook} />
      <BookList books={[...books, ...localBooks]} favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;