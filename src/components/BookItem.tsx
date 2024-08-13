import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Book } from '../types';

interface BookItemProps {
	book: Book;
	isFavorite: boolean;
	onToggleFavorite: (id: number) => void;
	onEditBook: (book: Book) => void;
	onDeleteBook: (id: number) => void;
}

interface FormValues {
	title: string;
	author: string;
	description: string;
	publicationDate: string;
}

const BookItem: React.FC<BookItemProps> = ({ book, isFavorite, onToggleFavorite, onEditBook, onDeleteBook }) => {
	const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<FormValues>({
		mode: 'onChange' // Enable validation on change
	});

	const onSubmit: SubmitHandler<FormValues> = async data => {
		await onEditBook({ ...book, ...data });
		reset(); // Reset the form fields after submission
	};

	return (
		<div className="book-item">
			<img src={book.cover} alt={book.title} />
			<h2>{book.title}</h2>
			<p>{book.author}</p>
			<p>{book.description}</p>
			<p>{book.publicationDate}</p>
			<button onClick={() => onToggleFavorite(book.id)}>
				{isFavorite ? '❤️' : '♡'}
			</button>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					defaultValue={book.title}
					{...register('title', { required: 'Title is required' })}
				/>
				{errors.title && <p>{errors.title.message}</p>}

				<input
					defaultValue={book.author}
					{...register('author', { required: 'Author is required' })}
				/>
				{errors.author && <p>{errors.author.message}</p>}

				<textarea
					defaultValue={book.description}
					{...register('description', { required: 'Description is required' })}
				/>
				{errors.description && <p>{errors.description.message}</p>}

				<input
					type="date"
					defaultValue={book.publicationDate}
					{...register('publicationDate', { required: 'Publication date is required' })}
				/>
				{errors.publicationDate && <p>{errors.publicationDate.message}</p>}

				<button type="submit" disabled={!isValid || isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Edit'}
				</button>
			</form>
			<button onClick={() => onDeleteBook(book.id)}>Delete</button>
		</div>
	);
};

export default BookItem;