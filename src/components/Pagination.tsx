import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Назад
      </button>
      <span>Страница {currentPage}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>
        Вперед
      </button>
    </div>
  );
};

export default Pagination;