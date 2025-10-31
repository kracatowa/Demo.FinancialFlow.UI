import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./PageNavigation.css"

type Props = {
  pageNumber: number;
  totalPages: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

function getPageNumbers(page: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("…", total);
    } else if (page >= total - 3) {
      pages.push(1, "…");
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1, "…", page - 1, page, page + 1, "…", total);
    }
  }
  return pages;
}

export default function PageNavigation({ pageNumber, totalPages, setPageNumber }: Props) {
  const pages = getPageNumbers(pageNumber, totalPages);

  return (
    <nav data-pagination className="file-transactions-pagination">
      <a
        href="#"
        className={pageNumber === 1 ? "disabled" : ""}
        onClick={e => {
          e.preventDefault();
          if (pageNumber > 1) setPageNumber(pageNumber - 1);
        }}
        aria-disabled={pageNumber === 1}
        tabIndex={pageNumber === 1 ? -1 : 0}
      >
        <FaChevronLeft />
      </a>
      <ul>
        {pages.map((p, idx) =>
          typeof p === "number" ? (
            <li key={p} className={p === pageNumber ? "current" : ""}>
              <a
                href={`#${p}`}
                onClick={e => {
                  e.preventDefault();
                  setPageNumber(p);
                }}
              >
                {p}
              </a>
            </li>
          ) : (
            <li key={`ellipsis-${idx}`}>
              <span style={{ padding: ".5em" }}>{p}</span>
            </li>
          )
        )}
      </ul>
      <a
        href="#"
        className={pageNumber === totalPages || totalPages === 0 ? "disabled" : ""}
        onClick={e => {
          e.preventDefault();
          if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
        }}
        aria-disabled={pageNumber === totalPages || totalPages === 0}
        tabIndex={pageNumber === totalPages || totalPages === 0 ? -1 : 0}
      >
        <FaChevronRight />
      </a>
    </nav>
  );
}
