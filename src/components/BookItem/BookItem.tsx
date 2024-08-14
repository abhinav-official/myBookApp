import React, { useState } from 'react';
import { Book } from '~/types';
import BookModal from '../BookModal/BookModal';
import { useBooks } from '~/hooks/useBooks';
import { useFavorites } from '~/hooks/useFavourites';
import Image from '../Image/Image';
import styles from './BookItem.module.scss';
import { FaEdit, FaHeart, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';

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
	const formattedDate = format(new Date(book.publicationDate), 'dd MMM yyyy');
	return (
		<div className={styles.bookItemContainer}>
			<Image src={book.cover} fallbackSrc="https://via.placeholder.com/150" alt={`${book.title} cover`} className={styles.bookCover} />
			<div className={styles.bookItemInfoContainer}>
				<h2 className={styles.bookTitle}>{book.title}</h2>
				<p className={styles.bookAuthor}>{book.author}</p>
				<p className={styles.bookDescription}>{book.description}</p>
				<p className={styles.bookPublicationDate}>{formattedDate}</p>
			</div>
			<div className={styles.bookItemActionContainer}>
				<button onClick={() => toggleFavorite(book.id)} >
					<FaHeart color={isFavorite ? 'red' : 'white'} />
				</button>
				{book.isLocal && (
					<>
						<button onClick={() => setIsEditing(true)}><FaEdit color={'white'} /></button>
						<button onClick={() => deleteBook(book.id)}><FaTrash color={'black'} /></button>
					</>
				)}
			</div>
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