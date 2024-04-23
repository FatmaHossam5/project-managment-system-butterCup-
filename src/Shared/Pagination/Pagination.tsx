import React from 'react';
import styles from './Pagination.module.css'
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    searchValue: string;
  }
const Pagination:React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange,searchValue }) => {
  const renderPageNumbers = ():JSX.Element[] => {
    const pages:JSX.Element[] = [];
    const visiblePages = 3; // Number of visible page numbers

    // Calculate start and end page numbers for display
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Add first page
    if (startPage > 1) {
      pages.push(
        <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(1)}>1</button>
        </li>
      );
    }

    // Add ellipsis if necessary
    if (startPage > 2) {
      pages.push(
        <li key={'ellipsis-start'} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Add middle page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }

    // Add ellipsis if necessary
    if (endPage < totalPages - 1) {
      pages.push(
        <li key={'ellipsis-end'} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Add last page
    if (endPage < totalPages) {
      pages.push(
        <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className={ `${styles.hover} page-link` } onClick={() => onPageChange(currentPage - 1)}>&laquo;Previous</button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className={`${styles.hover} page-link`} onClick={() => onPageChange(currentPage + 1)}>Next&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
