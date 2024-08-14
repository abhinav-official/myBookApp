import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '~/types';
import { enqueueSnackbar } from 'notistack';

interface BooksState {
  books: Book[];
  localBooks: Book[];
}

const initialState: BooksState = {
  books: [],
  localBooks: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setLocalBooks(state, action: PayloadAction<Book[]>) {
      state.localBooks = action.payload;
    },
    addBook(state, action: PayloadAction<Book>) {
      state.localBooks.push(action.payload);
      enqueueSnackbar('Book added successfully!', { variant: 'success' });
    },
    editBook(state, action: PayloadAction<Book>) {
      state.localBooks = state.localBooks.map(book =>
        book.id === action.payload.id ? { ...action.payload, isLocal: true } : book
      );
      state.books = state.books.map(book =>
        book.id === action.payload.id ? { ...action.payload, isLocal: true } : book
      );
      enqueueSnackbar('Book edited successfully!', { variant: 'success' });
    },
    deleteBook(state, action: PayloadAction<number>) {
      state.localBooks = state.localBooks.filter(book => book.id !== action.payload);
      state.books = state.books.filter(book => book.id !== action.payload);
      enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
    },
  },
});

export const { setBooks, setLocalBooks, addBook, editBook, deleteBook } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;