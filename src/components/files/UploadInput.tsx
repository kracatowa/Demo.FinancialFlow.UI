import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import "./UploadInput.css"

export default function UploadInput({
  fileInputRef,
  onUpload,
  uploading,
  extensions
}: {
  fileInputRef?: React.RefObject<HTMLInputElement | null>,
  onUpload: (file?: File) => void,
  uploading: boolean,
  extensions: string[]
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = () => {
    onUpload(fileInputRef?.current?.files?.[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
      if (fileInputRef?.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  return (
    <label
      className={`custum-file-upload${dragActive ? " drag-active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="icon">
        <FaCloudUploadAlt size={80} color="rgba(75,85,99,1)" />
      </div>
      <div className="text">
        <span>
          {uploading
            ? "Uploading..."
            : dragActive
            ? "Drop file here"
            : "Click or drag file to upload"}
        </span>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept={extensions.map(ext => `.${ext}`).join(",")}
        onChange={handleUpload}
        disabled={uploading}
      />
    </label>
  )
}
