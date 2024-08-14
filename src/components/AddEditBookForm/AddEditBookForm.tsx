import { useForm } from 'react-hook-form';
import { Book } from '~/types';
import styles from './AddEditBookForm.module.scss';
import { useBooks } from '~/hooks/useBooks';

interface AddEditBookFormProps {
	initialValues?: Book;
	handleClose: () => void;
}

const AddEditBookForm: React.FC<AddEditBookFormProps> = ({ initialValues, handleClose }) => {
	const { addBook, editBook } = useBooks()
	const { register, handleSubmit, reset } = useForm<Book>({
		defaultValues: initialValues,
	});

	const handleFormSubmit = (data: Book) => {
		if (initialValues) {
			editBook(data);
		} else {
			addBook(data);
		}
		handleClose();
		reset();
	};

	return (
		<form id="bookForm" onSubmit={handleSubmit(handleFormSubmit)} className={styles.addBookForm}>
			<input {...register('title')} placeholder="Title" required />
			<input {...register('author')} placeholder="Author" required />
			<textarea {...register('description')} placeholder="Description" required />
			<input {...register('cover')} placeholder="Cover Image URL" required />
			<input {...register('publicationDate')} type="date" required />
		</form>
	);
};

export default AddEditBookForm;