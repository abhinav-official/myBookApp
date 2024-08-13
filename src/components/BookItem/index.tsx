import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Book } from '../../types';
import styles from './styles.module.css';

interface BookItemProps {
	book: Book;
}

interface FormValues {
	title: string;
	author: string;
	description: string;
	publicationDate: string;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
	const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<FormValues>({
		defaultValues: {
			title: book.title,
			author: book.author,
			description: book.description,
			publicationDate: book.publicationDate,
		},
	});

	const onSubmit: SubmitHandler<FormValues> = data => {
		// Handle form submission
	};

	const onDeleteBook = (id: string) => {
		// Handle book deletion
	};

	return (
		<div className={styles.bookItem}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					{...register('title', { required: 'Title is required' })}
				/>
				{errors.title && <p>{errors.title.message}</p>}

				<input
					type="text"
					{...register('author', { required: 'Author is required' })}
				/>
				{errors.author && <p>{errors.author.message}</p>}

				<textarea
					{...register('description', { required: 'Description is required' })}
				/>
				{errors.description && <p>{errors.description.message}</p>}

				<input
					type="date"
					{...register('publicationDate', { required: 'Publication date is required' })}
				/>
				{errors.publicationDate && <p>{errors.publicationDate.message}</p>}

				<button type="submit" disabled={!isValid || isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Edit'}
				</button>
			</form>
			<button onClick={() => onDeleteBook(book.id.toString())}>Delete</button>
		</div>
	);
};

export default BookItem;