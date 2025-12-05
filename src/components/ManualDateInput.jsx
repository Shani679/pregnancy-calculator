import React, { useState } from 'react';
import { parseDDMMYYYY } from '../utils/dateUtils';
import '../styles/ManualDateInput.css';

export function ManualDateInput({ onDateSubmit }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please enter a date');
      return;
    }

    const parsedDate = parseDDMMYYYY(input);
    if (!parsedDate) {
      setError('Invalid date format. Use DD.MM.YYYY (e.g., 25.12.2025)');
      return;
    }

    onDateSubmit(parsedDate);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="manual-date-input">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="date-input">Enter Date (DD.MM.YYYY)</label>
          <div className="input-wrapper">
            <input
              id="date-input"
              type="text"
              placeholder="e.g., 25.12.2025"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              className={error ? 'input-error' : ''}
            />
            <button type="submit" className="submit-button">
              Go
            </button>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

