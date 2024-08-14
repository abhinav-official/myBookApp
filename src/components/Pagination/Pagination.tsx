import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
	booksPerPage: number;
	totalBooks: number;
	paginate: (pageNumber: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
		pageNumbers.push(i);
	}

	const handlePageChange = (pageNumber: number) => {
		paginate(pageNumber);
		window.scrollTo(0, 0);
	};

	return (
		<nav className={styles.pagination}>
			<ul>
				{pageNumbers.map(number => (
					<li key={number}>
						<button
							onClick={() => handlePageChange(number)}
							className={number === currentPage ? styles.active : ''}
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;