import React from 'react';
import './PromptAdjustment.css';

interface PromptAdjustmentProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptAdjustment: React.FC<PromptAdjustmentProps> = ({ value, onChange }) => {
  const suggestions = [
    'smiling',
    'serious professional look',
    'slight smile',
    'confident expression',
    'friendly demeanor',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    const currentValue = value.trim();
    const newValue = currentValue
      ? `${currentValue}, ${suggestion}`
      : suggestion;
    onChange(newValue);
  };

  return (
    <div className="prompt-adjustment">
      <div className="input-group">
        <label htmlFor="prompt-input">
          Additional Instructions (Optional)
        </label>
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., smiling, professional look, slight tilt..."
          rows={3}
        />
        <small className="input-hint">
          Add specific instructions to fine-tune your portrait
        </small>
      </div>

      <div className="suggestions">
        <p className="suggestions-label">Quick suggestions:</p>
        <div className="suggestion-chips">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(suggestion)}
              type="button"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptAdjustment;
