import React, { useState } from 'react';
import styles from './Header.module.scss';
import BookModal from '~/components/BookModal/BookModal';


const Header: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddBookClick = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<header className={styles.appHeader}>
			<nav className={styles.navbar}>
				<div className={styles.navbarTitle}>Book Web App</div>
			</nav>
			<button className={styles.addBookButton} onClick={handleAddBookClick}>Add Book</button>
			<BookModal
				isOpen={isModalOpen}
				onRequestClose={handleModalClose}
			/>
		</header>
	);
};

export default Header;