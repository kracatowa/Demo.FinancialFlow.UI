import { useEffect, useState } from "react";
import "./FileAudit.css"
import type { FinancialFlowFileAudit } from "../components/files/FileTable";
import axios from "axios";
import FileTable from "../components/files/FileTable";
import PageNavigation from "../components/pagination/PageNavigation";
import PageSizeSelector from "../components/pagination/PageSizeSelector";

export interface FinancialFlowFileQuery {
  pageNumber: number;
  pageSize: number;
  fromDate?: string;
  toDate?: string;
  filename?: string;
}

function buildQueryString(query: FinancialFlowFileQuery) {
  const params = new URLSearchParams();
  if (query.pageNumber) params.append("PageNumber", query.pageNumber.toString());
  if (query.pageSize) params.append("PageSize", query.pageSize.toString());
  if (query.fromDate) params.append("FromDate", query.fromDate);
  if (query.toDate) params.append("ToDate", query.toDate);
  if (query.filename) params.append("Filename", query.filename);
  return params.toString();
}
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function FileAudit() {
    const [transactions, setTransactions] = useState<FinancialFlowFileAudit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);

      const query: FinancialFlowFileQuery = {
        pageNumber,
        pageSize,
      };

      try {
        const queryString = buildQueryString(query);
        const response = await axios.get(
          `${API_URL}/api/FinancialFlowFileAudit?${queryString}`,
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

    fetchFiles();
  }, [pageNumber, pageSize]);
  
  return (
      <div className="app-container file-transactions-container">
        <h1>File Auditing</h1>
  
        {loading && <p>Loading...</p>}
        {error && <div className="file-transactions-error">{error}</div>}
        <div
        className={`file-transactions-table-container ${
          totalCount === 0 ? "compact" : "expanded"
        }`}
        >
          <FileTable transactions={transactions} />
        </div>

          <PageNavigation
              pageNumber={pageNumber}
              totalPages={totalPages}
              setPageNumber={setPageNumber}
          />
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
      </div>
    );
}
