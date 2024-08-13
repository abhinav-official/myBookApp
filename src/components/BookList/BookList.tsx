import React, { useState } from 'react';
import BookItem from '../BookItem/BookItem';
import Pagination from '../Pagination/Pagination';
import { Book } from '../../types';
import './BookList.module.scss';
import BookModal from '../BookModal/BookModal';

interface BookListProps {
	books: Book[];
	favorites: number[];
	toggleFavorite: (id: number) => void;
	editBook: (book: Book) => void;
	deleteBook: (id: number) => void;
	addBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, favorites, toggleFavorite, editBook, deleteBook, addBook }) => {
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
		<div className="bookList">
			<button className='addBookButton' onClick={() => setIsAdding(true)}>Add Book</button>
			{currentBooks.map(book => (
				<BookItem
					key={book.id}
					book={book}
					isFavorite={favorites.includes(book.id)}
					toggleFavorite={toggleFavorite}
					editBook={editBook}
					deleteBook={deleteBook}
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