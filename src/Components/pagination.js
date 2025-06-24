import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <nav className="d-flex align-items-center gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          className="px-3 py-2 rounded bg-white border border-secondary text-secondary"
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {getPageNumbers().map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-muted">
              ...
            </span>
          ) : (
            <button
              key={`page-${item}`}
              onClick={() => changePage(item)}
              className={`px-4 py-2 rounded ${
                item === currentPage
                  ? "bg-primary text-white fw-medium"
                  : "bg-white border border-secondary text-secondary"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => changePage(currentPage + 1)}
          className="px-3 py-2 rounded bg-white border border-secondary text-secondary"
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </nav>
    </div>
  );
};
export default Pagination;
