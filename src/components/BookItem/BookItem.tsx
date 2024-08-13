import React, { useState } from 'react';
import { Book } from '../../types';
import './BookItem.module.scss';
import BookModal from '../BookModal/BookModal';

interface BookItemProps {
	book: Book;
	isFavorite: boolean;
	toggleFavorite: (id: number) => void;
	editBook: (book: Book) => void;
	deleteBook: (id: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, isFavorite, toggleFavorite, editBook, deleteBook }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleEditSubmit = (editedBook: Book) => {
		editBook(editedBook);
		setIsEditing(false);
	};

	return (
		<div className="bookItem">
			<img src={book.cover} alt={`${book.title} cover`} className="bookCover" />
			<h2 className="bookTitle">{book.title}</h2>
			<p className="bookAuthor">{book.author}</p>
			<p className="bookDescription">{book.description}</p>
			<button onClick={() => toggleFavorite(book.id)}>
				{isFavorite ? 'Unfavorite' : 'Favorite'}
			</button>
			{book.isLocal && (
				<>
					<button onClick={() => setIsEditing(true)}>Edit</button>
					<button onClick={() => deleteBook(book.id)}>Delete</button>
				</>
			)}
			<BookModal
				isOpen={isEditing}
				onRequestClose={() => setIsEditing(false)}
				initialValues={book}
				onSubmit={handleEditSubmit}
			/>
		</div>
	);
};

export default BookItem;