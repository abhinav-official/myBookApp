import React, { useMemo, useState } from 'react';
import { Book } from '~/types';
import BookModal from '../BookModal/BookModal';
import Image from '../Image/Image';
import styles from './BookItem.module.scss';
import { FaEdit, FaHeart, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { deleteBook } from '~/store/booksSlice';
import { toggleFavorite } from '~/store/favouriteSlice';

type BookItemProps = {
	book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
	const dispatch = useDispatch<AppDispatch>();
	const favorites = useSelector((state: RootState) => state.favorites.favorites);
	const [isEditing, setIsEditing] = useState(false);

	const handleEdit = () => {
		setIsEditing(true);
	}


	const handleToggleFavourite = () => {
		dispatch(toggleFavorite(book.id))
	}
	const handleDelete = () => {
		dispatch(deleteBook(book.id));
	}


	const isFavorite = useMemo(() => favorites.includes(book.id), [favorites, book.id]);
	const formattedDate = useMemo(() => book?.publicationDate && format(new Date(book.publicationDate), 'dd MMM yyyy'), [book.publicationDate]);
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
				<button onClick={handleToggleFavourite} >
					<FaHeart color={isFavorite ? 'red' : 'white'} />
				</button>
				{book.isLocal && (
					<>
						<button onClick={handleEdit}><FaEdit color={'white'} /></button>
						<button onClick={handleDelete}><FaTrash color={'black'} /></button>
					</>
				)}
			</div>
			<BookModal
				isOpen={isEditing}
				onRequestClose={() => setIsEditing(false)}
				initialValues={book}
			/>
		</div>
	);
};

export default BookItem;