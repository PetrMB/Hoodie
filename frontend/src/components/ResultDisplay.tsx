import React from 'react';
import { downloadPortrait } from '../utils/api';
import './ResultDisplay.css';

interface ResultDisplayProps {
  image: string;
  filename: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ image, filename }) => {
  const handleDownload = () => {
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = image;
    link.download = `skoda_gcc_portrait_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Convert base64 to blob for sharing
        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], `skoda_gcc_portrait.jpg`, { type: 'image/jpeg' });

        await navigator.share({
          title: 'My Škoda GCC Portrait',
          text: 'Check out my professional LinkedIn portrait!',
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing is not supported on this device. Please use the download button.');
    }
  };

  return (
    <div className="result-display">
      <div className="result-header">
        <h2>🎉 Your Professional Portrait is Ready!</h2>
        <p>Download and use it on LinkedIn, your email signature, or company directory</p>
      </div>

      <div className="result-container">
        <div className="result-image-wrapper">
          <img src={image} alt="Generated portrait" className="result-image" />
        </div>

        <div className="result-actions">
          <button className="btn btn-primary" onClick={handleDownload}>
            ⬇️ Download Portrait
          </button>

          {navigator.share && (
            <button className="btn btn-secondary" onClick={handleShare}>
              📤 Share
            </button>
          )}
        </div>

        <div className="result-tips">
          <h4>Using Your Portrait:</h4>
          <ul>
            <li>✓ Perfect for LinkedIn profile pictures</li>
            <li>✓ Use in email signatures</li>
            <li>✓ Add to company directory</li>
            <li>✓ Include in presentations</li>
            <li>✓ Share on professional networks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
