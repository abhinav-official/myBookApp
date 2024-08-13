import React from 'react';
import Modal from 'react-modal';
import { Book } from '../../types';
import AddEditBookForm from '../AddEditBookForm/AddEditBookForm';
import './BookModal.module.scss';

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
			className="modal"
			overlayClassName="overlay"
		>
			<div className="modalContent">
				<AddEditBookForm initialValues={initialValues} onSubmit={onSubmit} />
				<div className="buttonGroup">
					<button onClick={onRequestClose} className="cancelButton">Cancel</button>
					<button type="submit" form="bookForm" className="saveButton">Save</button>
				</div>
			</div>
		</Modal>
	);
};

export default BookModal;