import React, { useState } from 'react';
import BookItem from '../BookItem/BookItem';
import Pagination from '../Pagination/Pagination';
import { Book } from '../../types';
import styles from './BookList.module.scss';

interface BookListProps {
	books: Book[];
	favorites: number[];
	toggleFavorite: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, favorites, toggleFavorite }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 5;

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className={styles.bookList}>
			{currentBooks.map(book => (
				<BookItem key={book.id} book={book} isFavorite={favorites.includes(book.id)} toggleFavorite={toggleFavorite} />
			))}
			<Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate} />
		</div>
	);
};

export default BookList;