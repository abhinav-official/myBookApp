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
	const { deleteBook } = useBooks();
	const { favorites, toggleFavorite } = useFavorites();
	const [isEditing, setIsEditing] = useState(false);
	const [currentBook, setCurrentBook] = useState<Book | null>(book);

	const handleEdit = () => {
		setIsEditing(true);
	}
	const handleDelete = () => {
		setCurrentBook(null);
		deleteBook(book.id);
	}

	if (currentBook === null) {
		return null;
	}

	const isFavorite = favorites.includes(currentBook.id);
	const formattedDate = format(new Date(currentBook.publicationDate), 'dd MMM yyyy');
	return (
		<div className={styles.bookItemContainer}>
			<Image src={currentBook.cover} fallbackSrc="https://via.placeholder.com/150" alt={`${currentBook.title} cover`} className={styles.bookCover} />
			<div className={styles.bookItemInfoContainer}>
				<h2 className={styles.bookTitle}>{currentBook.title}</h2>
				<p className={styles.bookAuthor}>{currentBook.author}</p>
				<p className={styles.bookDescription}>{currentBook.description}</p>
				<p className={styles.bookPublicationDate}>{formattedDate}</p>
			</div>
			<div className={styles.bookItemActionContainer}>
				<button onClick={() => toggleFavorite(currentBook.id)} >
					<FaHeart color={isFavorite ? 'red' : 'white'} />
				</button>
				{currentBook.isLocal && (
					<>
						<button onClick={handleEdit}><FaEdit color={'white'} /></button>
						<button onClick={handleDelete}><FaTrash color={'black'} /></button>
					</>
				)}
			</div>
			<BookModal
				isOpen={isEditing}
				onRequestClose={() => setIsEditing(false)}
				initialValues={currentBook}
				onEditSubmit={(data) => setCurrentBook(data)}
			/>
		</div>
	);
};

export default BookItem;