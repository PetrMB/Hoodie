import React, { useState, useEffect } from 'react';
import { getHoodies, getHoodieImage } from '../utils/api';
import type { HoodieColor, HoodieInfo } from '../types';
import './HoodieSelector.css';

interface HoodieSelectorProps {
  selectedColor: HoodieColor;
  onColorSelect: (color: HoodieColor) => void;
}

const HOODIE_COLORS: { color: HoodieColor; label: string; hexColor: string }[] = [
  { color: 'green', label: 'Green', hexColor: '#4BA82E' },
  { color: 'black', label: 'Black', hexColor: '#000000' },
  { color: 'white', label: 'White', hexColor: '#FFFFFF' },
];

const HoodieSelector: React.FC<HoodieSelectorProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  const [hoodies, setHoodies] = useState<Record<HoodieColor, HoodieInfo>>({
    green: { available: false, path: null },
    black: { available: false, path: null },
    white: { available: false, path: null },
  });
  const [previewImage, setPreviewImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHoodies();
  }, []);

  useEffect(() => {
    loadPreview(selectedColor);
  }, [selectedColor]);

  const loadHoodies = async () => {
    try {
      const data = await getHoodies();
      setHoodies(data);
    } catch (error) {
      console.error('Failed to load hoodies:', error);
    }
  };

  const loadPreview = async (color: HoodieColor) => {
    if (!hoodies[color]?.available) {
      setPreviewImage('');
      return;
    }

    setLoading(true);
    try {
      const image = await getHoodieImage(color);
      setPreviewImage(image);
    } catch (error) {
      console.error('Failed to load preview:', error);
      setPreviewImage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hoodie-selector">
      <div className="color-options">
        {HOODIE_COLORS.map(({ color, label, hexColor }) => (
          <button
            key={color}
            className={`color-option ${selectedColor === color ? 'selected' : ''} ${
              !hoodies[color]?.available ? 'unavailable' : ''
            }`}
            onClick={() => hoodies[color]?.available && onColorSelect(color)}
            disabled={!hoodies[color]?.available}
            title={
              hoodies[color]?.available
                ? `Select ${label} hoodie`
                : `${label} hoodie not uploaded yet`
            }
          >
            <div
              className="color-circle"
              style={{
                backgroundColor: hexColor,
                border: hexColor === '#FFFFFF' ? '2px solid var(--skoda-grey)' : 'none',
              }}
            >
              {selectedColor === color && (
                <span className="checkmark">✓</span>
              )}
            </div>
            <span className="color-label">{label}</span>
            {!hoodies[color]?.available && (
              <span className="unavailable-badge">Not Available</span>
            )}
          </button>
        ))}
      </div>

      {previewImage && (
        <div className="hoodie-preview">
          <h4>Selected Hoodie Preview:</h4>
          {loading ? (
            <div className="preview-loading">
              <div className="loading-spinner"></div>
              <p>Loading preview...</p>
            </div>
          ) : (
            <img
              src={previewImage}
              alt={`${selectedColor} hoodie`}
              className="preview-img"
            />
          )}
        </div>
      )}

      {!hoodies[selectedColor]?.available && (
        <div className="no-hoodie-message">
          <p>⚠️ This hoodie color hasn't been uploaded yet.</p>
          <p>Please use the Admin Panel below to upload hoodie images.</p>
        </div>
      )}
    </div>
  );
};

export default HoodieSelector;
