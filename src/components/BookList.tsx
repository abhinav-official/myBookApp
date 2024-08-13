import React from 'react';
import { Book } from '../types';
import BookItem from './BookItem';

interface BookListProps {
	books: Book[];
	onToggleFavorite: (id: number) => void;
	favorites: number[];
}

const BookList: React.FC<BookListProps> = ({ books, onToggleFavorite, favorites }) => {
	return (
		<div>
			{books.map((book) => (
				<BookItem
					key={book.id}
					book={book}
					isFavorite={favorites.includes(book.id)}
					onToggleFavorite={onToggleFavorite}
				/>
			))}
		</div>
	);
};

export default React.memo(BookList);