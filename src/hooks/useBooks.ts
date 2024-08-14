import { useState, useEffect } from 'react';
import { Book } from '~/types';
import { useSnackbar } from 'notistack';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const cachedBooks = localStorage.getItem('cachedBooks');
        if (cachedBooks) {
          setBooks(JSON.parse(cachedBooks));
        } else {
          const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');
          const data = await response.json();
          setBooks(data);
          localStorage.setItem('cachedBooks', JSON.stringify(data));
        }
      } catch {
        enqueueSnackbar('Failed to fetch books from API', { variant: 'error' });
      }
    };

    const fetchLocalBooks = () => {
      const localData = localStorage.getItem('localBooks');
      if (localData) {
        setLocalBooks(JSON.parse(localData));
      }
    };

    fetchBooks();
    fetchLocalBooks();
  }, [enqueueSnackbar]);

  useEffect(() => {
    setBooks(prevBooks => [...prevBooks.filter(book => !book.isLocal), ...localBooks]);
  }, [localBooks]);

  const refreshBooks = () => {
    setBooks(prevBooks => [...prevBooks.filter(book => !book.isLocal), ...localBooks]);
  };

  const addBook = (newBook: Book) => {
    const bookWithLocalFlag = { ...newBook, isLocal: true, id: Date.now() };
    const updatedLocalBooks = [...localBooks, bookWithLocalFlag];
    setLocalBooks(updatedLocalBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedLocalBooks));
    enqueueSnackbar('Book added successfully!', { variant: 'success' });
    refreshBooks();
  };

  const editBook = (updatedBook: Book) => {
    const updatedLocalBooks = localBooks.map(book =>
      book.id === updatedBook.id ? { ...updatedBook, isLocal: true } : book
    );
    setLocalBooks(updatedLocalBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedLocalBooks));
    enqueueSnackbar('Book edited successfully!', { variant: 'success' });
    refreshBooks();
  };

  const deleteBook = (id: number) => {
    const updatedLocalBooks = localBooks.filter(book => book.id !== id);
    setLocalBooks(updatedLocalBooks);
    localStorage.setItem('localBooks', JSON.stringify(updatedLocalBooks));
    enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
    refreshBooks();
  };

  return {
    books,
    addBook,
    editBook,
    deleteBook,
  };
};