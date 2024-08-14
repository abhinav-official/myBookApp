import React, { useState } from 'react';
import { Book } from '../../types';
import './BookItem.module.scss';
import BookModal from '../BookModal/BookModal';
import { useBooks } from '../../hooks/useBooks';
import { useFavorites } from '../../hooks/useFavourites';
import Image from '../Image/Image';

type BookItemProps = {
	book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
	const { editBook, deleteBook } = useBooks();
	const { favorites, toggleFavorite } = useFavorites();
	const [isEditing, setIsEditing] = useState(false);

	const handleEditSubmit = (editedBook: Book) => {
		editBook(editedBook);
		setIsEditing(false);
	};

	const isFavorite = favorites.includes(book.id);

	return (
		<div className="bookItem">
			<Image src={book.cover} fallbackSrc="https://via.placeholder.com/150" alt={`${book.title} cover`} className="bookCover" />
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