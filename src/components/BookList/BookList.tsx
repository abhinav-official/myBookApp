import React, { useState } from 'react';
import Pagination from '~/components/Pagination/Pagination';
import { Book } from '~/types';
import styles from './BookList.module.scss';
import BookModal from '~/components/BookModal/BookModal';
import { useBooks } from '~/hooks/useBooks';
import BookItem from '../BookItem/BookItem';


const BookList: React.FC = () => {
	const { books, addBook } = useBooks();

	const [currentPage, setCurrentPage] = useState(1);
	const [isAdding, setIsAdding] = useState(false);
	const booksPerPage = 5;

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const handleAddBook = (newBook: Book) => {
		addBook(newBook);
		setIsAdding(false);
	};

	return (
		<div className={styles.bookList}>
			<button className={styles.addBookButton} onClick={() => setIsAdding(true)}>Add Book</button>
			{currentBooks.map(book => (
				<BookItem
					key={book.id}
					book={book}
				/>
			))}
			<Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} />
			<BookModal
				isOpen={isAdding}
				onRequestClose={() => setIsAdding(false)}
				onSubmit={handleAddBook}
			/>
		</div>
	);
};

export default BookList;