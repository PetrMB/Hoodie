import React, { useState } from 'react';
import './Instructions.css';

const Instructions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="instructions">
      <button
        className="instructions-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
        <span className="toggle-text">
          {isExpanded ? 'Hide' : 'Show'} Instructions
        </span>
      </button>

      {isExpanded && (
        <div className="instructions-content">
          <div className="instructions-header">
            <h2>📚 How to Use This Photo Booth</h2>
            <p>Create your professional LinkedIn portrait in 3 simple steps</p>
          </div>

          <div className="instructions-grid">
            <div className="instruction-card">
              <div className="instruction-number">1</div>
              <h3>Upload Your Photo</h3>
              <p>
                Click or drag & drop your face photo. For best results:
              </p>
              <ul>
                <li>Use a clear, front-facing photo</li>
                <li>Ensure good lighting</li>
                <li>Face should be clearly visible</li>
                <li>Neutral background preferred</li>
              </ul>
            </div>

            <div className="instruction-card">
              <div className="instruction-number">2</div>
              <h3>Select Hoodie Color</h3>
              <p>
                Choose from available Škoda GCC hoodie colors:
              </p>
              <ul>
                <li><span className="color-dot green"></span> Green - Classic Škoda brand color</li>
                <li><span className="color-dot black"></span> Black - Professional & sleek</li>
                <li><span className="color-dot white"></span> White - Clean & modern</li>
              </ul>
              <p className="note">
                Note: Colors must be uploaded by admin first
              </p>
            </div>

            <div className="instruction-card">
              <div className="instruction-number">3</div>
              <h3>Generate & Download</h3>
              <p>
                Optionally add custom instructions, then:
              </p>
              <ul>
                <li>Click "Generate LinkedIn Portrait"</li>
                <li>Wait for AI to create your portrait</li>
                <li>Preview the result</li>
                <li>Download and use on LinkedIn!</li>
              </ul>
            </div>
          </div>

          <div className="instructions-tips">
            <div className="tip-section">
              <h4>💡 Pro Tips:</h4>
              <ul>
                <li>High-quality source photos produce better results</li>
                <li>Use the prompt adjustment for specific facial expressions</li>
                <li>Try different hoodie colors to find your favorite</li>
                <li>Download in high resolution for professional use</li>
              </ul>
            </div>

            <div className="tip-section">
              <h4>⚙️ Admin Setup (First Time Only):</h4>
              <ul>
                <li>Use the Admin Panel below to upload hoodie images</li>
                <li>Upload one JPG image for each color (green, black, white)</li>
                <li>Once uploaded, hoodies are available for all users</li>
                <li>Images are stored permanently on the server</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
