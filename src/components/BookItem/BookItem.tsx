import React from 'react';
import { Book } from '../../types';
import styles from './BookItem.module.scss';

interface BookItemProps {
	book: Book;
	isFavorite: boolean;
	toggleFavorite: (id: number) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, isFavorite, toggleFavorite }) => {
	return (
		<div className={styles.bookItem}>
			<img src={book.cover} alt={`${book.title} cover`} className={styles.bookCover} />
			<h2 className={styles.bookTitle}>{book.title}</h2>
			<p className={styles.bookAuthor}>{book.author}</p>
			<p className={styles.bookDescription}>{book.description}</p>
			<p className={styles.bookPublicationDate}>{new Date(book.publicationDate).toLocaleDateString()}</p>
			<button onClick={() => toggleFavorite(book.id)} className={styles.favoriteButton}>
				{isFavorite ? '❤️' : '♡'}
			</button>
		</div>
	);
};

export default BookItem;