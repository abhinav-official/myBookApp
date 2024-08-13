import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import BookList from './components/BookList';
import { Book } from './types';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/cutamar/mock/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = useCallback((id: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = useMemo(() => books.slice(indexOfFirstBook, indexOfLastBook), [books, indexOfFirstBook, indexOfLastBook]);

  return (
    <div className="App">
      <h1>Book List</h1>
      <BookList
        books={currentBooks}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
