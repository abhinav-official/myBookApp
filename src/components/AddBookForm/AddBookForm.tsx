import React from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '../../types';
import styles from './AddBookForm.module.scss';

interface AddBookFormProps {
	addBook: (book: Book) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ addBook }) => {
	const { register, handleSubmit, reset } = useForm<Book>();

	const onSubmit = (data: Book) => {
		addBook({ ...data, id: Date.now() });
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.addBookForm}>
			<input {...register('title')} placeholder="Title" required />
			<input {...register('author')} placeholder="Author" required />
			<textarea {...register('description')} placeholder="Description" required />
			<input {...register('cover')} placeholder="Cover Image URL" required />
			<input {...register('publicationDate')} type="date" required />
			<button type="submit">Add Book</button>
		</form>
	);
};

export default AddBookForm;