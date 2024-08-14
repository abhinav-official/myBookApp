import React, { useState } from 'react';
import Pagination from '~/components/Pagination/Pagination';
import styles from './BookList.module.scss';
import BookItem from '../BookItem/BookItem';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';

const BookList: React.FC = () => {
	const books = useSelector((state: RootState) => state.books.books);
	console.log(
		"books", books.length,
		books,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 5;

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className={styles.bookList}>
			{currentBooks.map(book => (
				<BookItem
					key={book.id}
					book={book}
				/>
			))}
			<Pagination
				booksPerPage={booksPerPage}
				totalBooks={books.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default BookList;