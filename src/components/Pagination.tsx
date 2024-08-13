import React from 'react';

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
			<ul className="pagination">
				{pageNumbers.map(number => (
					<li key={number} className="page-item">
						<a onClick={() => paginate(number)} href="!#" className="page-link">
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;