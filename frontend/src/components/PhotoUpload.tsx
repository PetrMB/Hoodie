import React, { useRef, useState } from 'react';
import './PhotoUpload.css';

interface PhotoUploadProps {
  onImageUpload: (image: string) => void;
  currentImage: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageUpload, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFile = (file: File) => {
    setError('');

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Read file and convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageUpload(result);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="photo-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />

      {!currentImage ? (
        <div
          className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="upload-icon">📸</div>
          <p className="upload-text">
            <strong>Click to upload</strong> or drag and drop
          </p>
          <p className="upload-hint">
            PNG, JPG or JPEG (max 10MB)
          </p>
        </div>
      ) : (
        <div className="preview-container">
          <img src={currentImage} alt="Your face" className="preview-image" />
          <button className="btn btn-secondary mt-2" onClick={handleButtonClick}>
            📷 Change Photo
          </button>
        </div>
      )}

      {error && (
        <div className="upload-error">
          ⚠️ {error}
        </div>
      )}

      <div className="upload-tips">
        <p><strong>Tips for best results:</strong></p>
        <ul>
          <li>Use a clear, front-facing photo</li>
          <li>Ensure good lighting on your face</li>
          <li>Neutral background works best</li>
          <li>Face should be clearly visible</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoUpload;
