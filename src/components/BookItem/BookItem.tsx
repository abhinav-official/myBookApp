import React, { useState } from 'react';
import { Book } from '../../types';
import './BookItem.module.scss';

interface BookItemProps {
	book: Book;
	isFavorite: boolean;
	toggleFavorite: (id: number) => void;
	editBook: (book: Book) => void;
	deleteBook: (id: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, isFavorite, toggleFavorite, editBook, deleteBook }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedBook, setEditedBook] = useState<Book>(book);

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setEditedBook({ ...editedBook, [name]: value });
	};

	const handleEditSubmit = () => {
		editBook(editedBook);
		setIsEditing(false);
	};

	return (
		<div className="bookItem">
			{isEditing ? (
				<div>
					<input name="title" value={editedBook.title} onChange={handleEditChange} />
					<textarea name="description" value={editedBook.description} onChange={handleEditChange} />
					<button onClick={handleEditSubmit}>Save</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</div>
			) : (
				<div>
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
				</div>
			)}
		</div>
	);
};

export default BookItem;