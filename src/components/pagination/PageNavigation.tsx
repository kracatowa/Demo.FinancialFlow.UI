import React from 'react'

type Props = {
  pageNumber: number;
  totalPages: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function PageNavigation({ pageNumber, totalPages, setPageNumber }: Props) {
  const handlePrev = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPageNumber((prev) => Math.min(prev + 1, totalPages));

  return (
      <div className="file-transactions-pagination">
        <button onClick={handlePrev} disabled={pageNumber === 1}>Previous</button>
        <span>
          Page {pageNumber} of {totalPages || 1}
        </span>
        <button onClick={handleNext} disabled={pageNumber === totalPages || totalPages === 0}>Next</button>
      </div>
  )
}
