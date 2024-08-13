import { useForm } from 'react-hook-form';
import { Book } from '../../types';
import './AddEditBookForm.module.scss';

interface AddEditBookFormProps {
	initialValues?: Book;
	onSubmit: (book: Book) => void;
}

const AddEditBookForm: React.FC<AddEditBookFormProps> = ({ initialValues, onSubmit }) => {
	const { register, handleSubmit, reset } = useForm<Book>({
		defaultValues: initialValues,
	});

	const handleFormSubmit = (data: Book) => {
		onSubmit({ ...data, id: initialValues?.id || Date.now() });
		reset();
	};

	return (
		<form id="bookForm" onSubmit={handleSubmit(handleFormSubmit)} className="addEditBookForm">
			<input {...register('title')} placeholder="Title" required />
			<input {...register('author')} placeholder="Author" required />
			<textarea {...register('description')} placeholder="Description" required />
			<input {...register('cover')} placeholder="Cover Image URL" required />
			<input {...register('publicationDate')} type="date" required />
		</form>
	);
};

export default AddEditBookForm;