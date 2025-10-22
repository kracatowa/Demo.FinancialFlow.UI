import { useRef, useState } from "react";
import axios from "axios";
import "./FilePortal.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5017";

export default function FilePortal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const validateCsvContent = (text: string): string | null => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) {
      return "CSV must contain at least a header and one data row.";
    }
    // Check for ; separator in header and at least one data row
    if (!lines[0].includes(";") && !lines[0].includes(",")) {
      return "CSV header must use ';', ',' as separator.";
    }
    if (!lines[1].includes(";") && !lines[1].includes(",")) {
      return "CSV must have at least one data row with ';', ',' as separator.";
    }
    
    return null;
  };

  const handleUpload = async () => {
    
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setMessage("Please select a file to upload.");
      setIsError(true);
      return;
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".csv")) {
      setMessage("Only .csv files are allowed.");
      setIsError(true);
      return;
    }

    const text = await file.text();
    const contentError = validateCsvContent(text);
    if (contentError) {
      setMessage(contentError);
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("File", file);

    setUploading(true);
    setMessage(null);
    setIsError(false);
    try {
      await axios.post(`${API_URL}/api/FinancialFlow/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "accept": "*/*"
        }
      });
      setMessage("File uploaded successfully!");
      setIsError(false);
    } catch (error: any) {
      setMessage("Upload failed. " + (error?.response?.data?.message || "Please try again."));
      setIsError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-portal-container">
      <h1 className="file-portal-title">File Portal</h1>
      <p className="file-portal-desc">Upload and manage your financial documents here.</p>
      <div className="file-portal-upload">
        <input type="file" className="file-portal-input" ref={fileInputRef} accept=".csv,text/csv"/>
        <button
          className="file-portal-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
      {message && (
        <div className={`file-portal-message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
