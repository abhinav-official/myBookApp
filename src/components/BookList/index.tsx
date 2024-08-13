import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../../services/bookService';
import { Book } from '../../types';
import BookItem from '../BookItem';
import Pagination from '../Pagination';
import styles from './styles.module.css';

const BookList: React.FC = () => {
	const [books, setBooks] = useState<Book[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 5;

	useEffect(() => {
		const loadBooks = async () => {
			try {
				const books = await fetchBooks();
				setBooks(books);
			} catch (error) {
				console.error(error);
			}
		};
		loadBooks();
	}, []);

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className={styles.bookList}>
			{currentBooks.map(book => (
				<BookItem key={book.id} book={book} />
			))}
			<Pagination
				booksPerPage={booksPerPage}
				totalBooks={books.length}
				paginate={paginate}
			/>
		</div>
	);
};

export default BookList;