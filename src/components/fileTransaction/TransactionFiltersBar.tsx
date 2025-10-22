type FinancialFlowQuery = {
  minAmount?: number;
  maxAmount?: number;
  fromDate?: string;
  toDate?: string;
  description?: string;
  flowType?: number;
  subsidiairy?: string;
};

type Props = {
  filters: FinancialFlowQuery;
  setFilters: (filters: FinancialFlowQuery) => void;
  onSearch: () => void;
};

export default function TransactionFiltersBar({ filters, setFilters, onSearch }: Props) {
  return (
    <div className="transaction-filters-bar">
      <h2>Transaction Filters</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="number"
          placeholder="Min Amount"
          value={filters.minAmount ?? ""}
          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={filters.maxAmount ?? ""}
          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input
          type="date"
          placeholder="From Date"
          value={filters.fromDate ?? ""}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
        />
        <input
          type="date"
          placeholder="To Date"
          value={filters.toDate ?? ""}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={filters.description ?? ""}
          onChange={(e) => setFilters({ ...filters, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Subsidiairy"
          value={filters.subsidiairy ?? ""}
          onChange={(e) => setFilters({ ...filters, subsidiairy: e.target.value })}
        />
        <select
          value={filters.flowType ?? ""}
          onChange={(e) => setFilters({ ...filters, flowType: e.target.value ? Number(e.target.value) : undefined })}
        >
          <option value="">All Types</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          {/* Add more types as needed */}
        </select>
        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}
