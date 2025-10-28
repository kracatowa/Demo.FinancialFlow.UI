import React from 'react'
import "./PageSizeSelector.css"

type Props = {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};


export default function PageSizeSelector({ pageSize, setPageSize }: Props) {
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  return (
<div className="file-transactions-controls">
        <label htmlFor="page-size-select">Show</label>
        <select
          id="page-size-select"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>items per page</span>
      </div>
  )
}
