/**
 * FileUpload Component
 * Drag & drop file upload with preview
 */

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../utils/cn';
import { DeleteIcon } from '../Icon';
import styles from './FileUpload.module.css';

export interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

export interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: Record<string, string[]>;
  className?: string;
}

export function FileUpload({
  onFilesChange,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  },
  className,
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.slice(0, maxFiles - uploadedFiles.length).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${Date.now()}-${Math.random()}`,
      }));

      const updated = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updated);
      onFilesChange(updated);
    },
    [uploadedFiles, maxFiles, onFilesChange]
  );

  const removeFile = (id: string) => {
    const updated = uploadedFiles.filter((f) => {
      if (f.id === id) {
        URL.revokeObjectURL(f.preview);
        return false;
      }
      return true;
    });
    setUploadedFiles(updated);
    onFilesChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: maxFiles - uploadedFiles.length,
    disabled: uploadedFiles.length >= maxFiles,
  });

  return (
    <div className={cn(styles.fileUpload, className)}>
      <div
        {...getRootProps()}
        className={cn(
          styles.dropzone,
          isDragActive && styles.active,
          uploadedFiles.length >= maxFiles && styles.disabled
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className={styles.message}>Drop files here...</p>
        ) : (
          <div className={styles.message}>
            <p>Drag & drop files here, or click to select</p>
            <p className={styles.hint}>
              Max {maxFiles} files, {Math.round(maxSize / 1024 / 1024)}MB each
            </p>
          </div>
        )}
      </div>

      {fileRejections.length > 0 && (
        <div className={styles.errors}>
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className={styles.error}>
              {file.name}: {errors.map((e) => e.message).join(', ')}
            </div>
          ))}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className={styles.previews}>
          {uploadedFiles.map((file) => (
            <div key={file.id} className={styles.preview}>
              <img src={file.preview} alt={file.file.name} className={styles.image} />
              <div className={styles.info}>
                <span className={styles.name}>{file.file.name}</span>
                <span className={styles.size}>{(file.file.size / 1024).toFixed(1)} KB</span>
              </div>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
