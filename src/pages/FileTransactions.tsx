import axios from "axios";
import FileTransactionTable from "../components/fileTransaction/FileTransactionTable";
import type { FileTransaction } from "../components/fileTransaction/FileTransactionTable";
import { useEffect, useState } from "react";
import "./FileTransactions.css";
import PageSizeSelector from "../components/fileTransaction/PageSizeSelector";
import PageNavigation from "../components/fileTransaction/PageNavigation";

type FinancialFlowQuery = {
  pageNumber?: number;
  pageSize?: number;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: string; // ISO string
  toDate?: string;   // ISO string
  description?: string;
  flowType?: number;
  subsidiairy?: string;
};

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5017";

function buildQueryString(query: FinancialFlowQuery) {
  const params = new URLSearchParams();
  if (query.pageNumber) params.append("PageNumber", query.pageNumber.toString());
  if (query.pageSize) params.append("PageSize", query.pageSize.toString());
  if (query.minAmount !== undefined) params.append("MinAmount", query.minAmount.toString());
  if (query.maxAmount !== undefined) params.append("MaxAmount", query.maxAmount.toString());
  if (query.fromDate) params.append("FromDate", query.fromDate);
  if (query.toDate) params.append("ToDate", query.toDate);
  if (query.description) params.append("Description", query.description);
  if (query.flowType !== undefined) params.append("FlowType", query.flowType.toString());
  if (query.subsidiairy) params.append("Subsidiairy", query.subsidiairy);
  return params.toString();
}

export default function FileTransactions() {
  const [transactions, setTransactions] = useState<FileTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      const query: FinancialFlowQuery = {
        pageNumber,
        pageSize,
      };

      try {
        const queryString = buildQueryString(query);
        const response = await axios.get(
          `${API_URL}/api/FinancialFlow?${queryString}`,
          { headers: { accept: "application/json" } }
        );
        setTransactions(Array.isArray(response.data.items) ? response.data.items : []);
        setTotalCount(response.data.totalCount || 0);
      } catch (err: any) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [pageNumber, pageSize]);


  return (
    <div>
      <h1>File Transactions</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="file-transactions-error">{error}</div>}
      <div className="file-transactions-table-container">
        <FileTransactionTable transactions={transactions} />
      </div>
      <div className="file-transactions-footer">
        <PageNavigation
            pageNumber={pageNumber}
            totalPages={totalPages}
            setPageNumber={setPageNumber}
        />
        <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
      </div>
    </div>
  );
}
