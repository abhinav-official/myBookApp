import React, { useCallback, useMemo } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
	booksPerPage: number;
	totalBooks: number;
	paginate: (pageNumber: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ booksPerPage, totalBooks, paginate, currentPage }) => {
	const pageNumbers = useMemo(() => {
		const pages = [];
		for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
			pages.push(i);
		}
		return pages;
	}, [booksPerPage, totalBooks]);


	const handlePageChange = useCallback((pageNumber: number) => {
		paginate(pageNumber);
		window.scrollTo(0, 0);
	}, [paginate]);

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