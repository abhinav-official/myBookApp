import React, { useState } from 'react';
import { Book } from '~/types';
import BookModal from '../BookModal/BookModal';
import Image from '../Image/Image';
import styles from './BookItem.module.scss';
import { FaEdit, FaHeart, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { deleteBook } from '~/store/booksSlice';
import { useSnackbar } from 'notistack';
import { toggleFavorite } from '~/store/favouriteSlice';

type BookItemProps = {
	book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
	const dispatch = useDispatch<AppDispatch>();
	const { enqueueSnackbar } = useSnackbar();
	const favorites = useSelector((state: RootState) => state.favorites.favorites);
	const [isEditing, setIsEditing] = useState(false);
	const [currentBook, setCurrentBook] = useState<Book | null>(book);

	if (currentBook === null) {
		return null;
	}

	const handleEdit = () => {
		setIsEditing(true);
	}

	const isFavorite = favorites.includes(currentBook.id);

	const handleToggleFavourite = () => {
		dispatch(toggleFavorite(currentBook.id))
		enqueueSnackbar(isFavorite ? 'Book added to favourites!' : 'Book removed from favourites.', { variant: 'success' });
	}
	const handleDelete = () => {
		setCurrentBook(null);
		dispatch(deleteBook(book.id));
		enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
	}


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
				<button onClick={handleToggleFavourite} >
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