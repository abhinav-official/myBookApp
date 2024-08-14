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
		const response = await fetch('https://my-json-server.typicode.com/cutamar/mock/books');
		const data = await response.json();
		setBooks(data);
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

  const addBook = (newBook: Book) => {
	const updatedLocalBooks = [...localBooks, newBook];
	setLocalBooks(updatedLocalBooks);
	localStorage.setItem('localBooks', JSON.stringify(updatedLocalBooks));
	enqueueSnackbar('Book added successfully!', { variant: 'success' });
  };

  const editBook = (updatedBook: Book) => {
	const updatedLocalBooks = localBooks.map(book => book.id === updatedBook.id ? updatedBook : book);
	setLocalBooks(updatedLocalBooks);
	localStorage.setItem('localBooks', JSON.stringify(updatedLocalBooks));
	enqueueSnackbar('Book edited successfully!', { variant: 'success' });
  };

  const deleteBook = (id: number) => {
	const updatedLocalBooks = localBooks.filter(book => book.id !== id);
	setLocalBooks(updatedLocalBooks);
	localStorage.setItem('localBooks', JSON.stringify(updatedLocalBooks));
	enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
  };

  return {
	books,
	localBooks,
	addBook,
	editBook,
	deleteBook,
  };
};