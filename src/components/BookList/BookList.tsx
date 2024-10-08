import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '~/components/Pagination/Pagination';
import styles from './BookList.module.scss';
import BookItem from '../BookItem/BookItem';
import { RootState, AppDispatch } from '~/store';
import { fetchBooks } from '~/services/bookService';
import { setBooks } from '~/store/booksSlice';

const BookList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const books = useSelector((state: RootState) => state.books.books);
	const localBooks = useSelector((state: RootState) => state.books.localBooks);

	const combinedBooks = useMemo(() => [...books, ...localBooks], [books, localBooks]);

	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 5;

	useEffect(() => {
		const fetchAndSetBooks = async () => {
			try {
				const books = await fetchBooks();
				dispatch(setBooks(books));
			} catch (error) {
				console.error('Failed to fetch books:', error);
			}
		};

		fetchAndSetBooks();
	}, [dispatch]);

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;


	const currentBooks = useMemo(() => combinedBooks.slice(indexOfFirstBook, indexOfLastBook), [combinedBooks, indexOfFirstBook, indexOfLastBook]);

	const paginate = useCallback((pageNumber: number) => setCurrentPage(pageNumber), [setCurrentPage]);


	return (
		<div className={styles.bookList}>
			{currentBooks.map(book => (
				<BookItem key={book.id} book={book} />
			))}
			<Pagination
				booksPerPage={booksPerPage}
				totalBooks={combinedBooks.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default BookList;