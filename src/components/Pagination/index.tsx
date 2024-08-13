import React from 'react';
import styles from './styles.module.css';

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
		<nav>
			<ul className={styles.pagination}>
				{pageNumbers.map(number => (
					<li key={number} className={styles.pageItem}>
						<a onClick={() => paginate(number)} href="!#" className={styles.pageLink}>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;