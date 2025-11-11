import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PhotoUpload from './components/PhotoUpload';
import HoodieSelector from './components/HoodieSelector';
import PromptAdjustment from './components/PromptAdjustment';
import ResultDisplay from './components/ResultDisplay';
import Instructions from './components/Instructions';
import AdminPanel from './components/AdminPanel';
import { generatePortrait, handleApiError, healthCheck } from './utils/api';
import type { HoodieColor } from './types';
import './styles/App.css';

function App() {
  const [faceImage, setFaceImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<HoodieColor>('green');
  const [promptAdjustment, setPromptAdjustment] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [generatedFilename, setGeneratedFilename] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [apiHealthy, setApiHealthy] = useState<boolean>(false);

  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await healthCheck();
      setApiHealthy(healthy);
    };
    checkHealth();
  }, []);

  const handleGeneratePortrait = async () => {
    if (!faceImage) {
      setError('Please upload a face photo first');
      return;
    }

    setError('');
    setSuccess('');
    setIsGenerating(true);

    try {
      const response = await generatePortrait({
        faceImage,
        color: selectedColor,
        promptAdjustment,
      });

      setGeneratedImage(response.image);
      setGeneratedFilename(response.filename);
      setSuccess('Portrait generated successfully!');

      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFaceImage('');
    setGeneratedImage('');
    setGeneratedFilename('');
    setPromptAdjustment('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {!apiHealthy && (
            <div className="alert alert-error mb-3">
              ⚠️ Backend API is not responding. Please make sure the server is running.
            </div>
          )}

          <Instructions />

          <div className="workflow-section">
            <div className="workflow-grid">
              {/* Step 1: Upload Photo */}
              <div className="workflow-step">
                <div className="step-number">1</div>
                <h2 className="step-title">Upload Your Photo</h2>
                <PhotoUpload
                  onImageUpload={setFaceImage}
                  currentImage={faceImage}
                />
              </div>

              {/* Step 2: Select Hoodie */}
              <div className="workflow-step">
                <div className="step-number">2</div>
                <h2 className="step-title">Choose Hoodie Color</h2>
                <HoodieSelector
                  selectedColor={selectedColor}
                  onColorSelect={setSelectedColor}
                />
              </div>

              {/* Step 3: Adjust Prompt */}
              <div className="workflow-step">
                <div className="step-number">3</div>
                <h2 className="step-title">Fine-tune (Optional)</h2>
                <PromptAdjustment
                  value={promptAdjustment}
                  onChange={setPromptAdjustment}
                />
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="alert alert-error mt-3">
                ❌ {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success mt-3">
                ✅ {success}
              </div>
            )}

            {/* Generate Button */}
            <div className="generate-section mt-4">
              <button
                className="btn btn-primary btn-large"
                onClick={handleGeneratePortrait}
                disabled={isGenerating || !faceImage}
              >
                {isGenerating ? (
                  <>
                    <span className="loading-spinner"></span>
                    Generating Portrait...
                  </>
                ) : (
                  <>
                    🎨 Generate LinkedIn Portrait
                  </>
                )}
              </button>

              {faceImage && (
                <button
                  className="btn btn-outline"
                  onClick={handleReset}
                  disabled={isGenerating}
                >
                  🔄 Start Over
                </button>
              )}
            </div>
          </div>

          {/* Result Display */}
          {generatedImage && (
            <div id="result-section" className="mt-4">
              <ResultDisplay
                image={generatedImage}
                filename={generatedFilename}
              />
            </div>
          )}

          {/* Admin Panel Toggle */}
          <div className="admin-toggle mt-4">
            <button
              className="btn btn-outline"
              onClick={() => setShowAdmin(!showAdmin)}
            >
              {showAdmin ? '🔒 Hide' : '⚙️ Show'} Admin Panel
            </button>
          </div>

          {showAdmin && (
            <div className="mt-3">
              <AdminPanel />
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © 2024 Škoda Auto a.s. | SAP GCC Hoodie Photo Booth
          </p>
          <p className="footer-links">
            Powered by AI | Professional LinkedIn Portrait Generator
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
