import React, { useState } from 'react';
import { uploadHoodie, handleApiError } from '../utils/api';
import type { HoodieColor } from '../types';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<HoodieColor>('green');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a file first' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const response = await uploadHoodie(selectedFile, selectedColor);
      setMessage({
        type: 'success',
        text: `${response.color} hoodie uploaded successfully!`,
      });

      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');

      // Refresh page after 2 seconds to update hoodie availability
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: handleApiError(error),
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h3>⚙️ Admin Panel - Upload Hoodie Images</h3>
        <p>Upload JPG images of Škoda GCC hoodies for each color variant</p>
      </div>

      <div className="admin-content">
        <div className="admin-form">
          <div className="form-group">
            <label htmlFor="color-select">Select Hoodie Color:</label>
            <select
              id="color-select"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value as HoodieColor)}
              className="color-select"
            >
              <option value="green">🟢 Green</option>
              <option value="black">⚫ Black</option>
              <option value="white">⚪ White</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="file-input">Select Hoodie Image (JPG):</label>
            <input
              id="file-input"
              type="file"
              accept=".jpg,.jpeg"
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>

          {previewUrl && (
            <div className="preview-section">
              <h4>Preview:</h4>
              <img src={previewUrl} alt="Hoodie preview" className="admin-preview" />
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? (
              <>
                <span className="loading-spinner"></span>
                Uploading...
              </>
            ) : (
              <>⬆️ Upload {selectedColor} Hoodie</>
            )}
          </button>

          {message && (
            <div className={`admin-message ${message.type}`}>
              {message.type === 'success' ? '✅' : '❌'} {message.text}
            </div>
          )}
        </div>

        <div className="admin-info">
          <h4>📝 Hoodie Image Requirements:</h4>
          <ul>
            <li>Format: JPG or JPEG only</li>
            <li>Max size: 10MB</li>
            <li>Recommended: 1024x1024 pixels or larger</li>
            <li>Clear view of the hoodie</li>
            <li>Visible Škoda GCC branding on chest</li>
            <li>Visible electronic circuit graphic on right sleeve</li>
          </ul>

          <h4>ℹ️ Important Notes:</h4>
          <ul>
            <li>Upload one image for each color variant</li>
            <li>Images are stored permanently on the server</li>
            <li>Uploading a new image replaces the previous one</li>
            <li>All users will see the same hoodie images</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
