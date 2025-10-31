import { useRef, useState } from "react";
import axios from "axios";
import "./FilePortal.css";
import { useCurrentUser } from "../components/login/useCurrentUser";
import { validateCsvContent } from "../utils/CsvValidator";
import UploadInput from "../components/files/UploadInput";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function FilePortal() {
  const currentUser = useCurrentUser();    
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  function setError(msg: string): false {
    setMessage(msg);
    setIsError(true);
    return false;
  }

  const validateFileUpload = async (): Promise<boolean> => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return setError("Please select a file to upload.");
    if (!file.name.toLowerCase().endsWith(".csv")) return setError("Only .csv files are allowed.");

    const text = await file.text();
    const csvError = validateCsvContent(text);
    if (csvError) return setError(csvError);

    return true;
  };

  const handleUpload = async () => {
    setMessage(null);
    setIsError(false);

    if (!(await validateFileUpload())) return;

    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("File", file);
    formData.append("UserId", currentUser.id);

    setUploading(true);
    try {
      await axios.post(`${API_URL}/api/FinancialFlowFileAudit/upload/start`, formData, {
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
    <div className="app-container file-portal-container">
      <h1 className="file-portal-title">File Portal</h1>
      <p className="file-portal-desc">Upload and manage your financial documents here.</p>
      <div className="file-portal-upload">
        <UploadInput
          fileInputRef={fileInputRef}
          onUpload={handleUpload}
          uploading={uploading}
          extensions={["csv"]}
        />
      </div>
      {message && (
        <div className={`file-portal-message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
