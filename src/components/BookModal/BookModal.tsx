import React from 'react';
import Modal from 'react-modal';
import { Book } from '../../types';
import AddEditBookForm from '../AddEditBookForm/AddEditBookForm';
import styles from './BookModal.module.scss';

interface BookModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	initialValues?: Book;
	onSubmit: (book: Book) => void;
}

const BookModal: React.FC<BookModalProps> = ({ isOpen, onRequestClose, initialValues, onSubmit }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Book Form Modal"
			className={styles.modal}
			overlayClassName={styles.overlay}
		>
			<div className={styles.modalContent}>
				<AddEditBookForm initialValues={initialValues} onSubmit={onSubmit} />
				<div className={styles.buttonGroup}>
					<button onClick={onRequestClose} className={styles.cancelButton}>Cancel</button>
					<button type="submit" form="bookForm" className={styles.saveButton}>Save</button>
				</div>
			</div>
		</Modal>
	);
};

export default BookModal;