import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
	booksPerPage: number;
	totalBooks: number;
	paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ booksPerPage, totalBooks, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className={styles.pagination}>
			<ul>
				{pageNumbers.map(number => (
					<li key={number}>
						<button onClick={() => paginate(number)}>{number}</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;