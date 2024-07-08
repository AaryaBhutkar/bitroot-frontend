// Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(currentPage - halfVisiblePages, 0);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 0);
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <nav className="mt-6 pb-20 flex justify-center">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === 0
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            &lt;
          </button>
        </li>
        {getPageNumbers().map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-3 py-1 border rounded-md ${
              currentPage === totalPages - 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
