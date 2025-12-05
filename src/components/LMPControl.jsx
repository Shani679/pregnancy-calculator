import React, { useState } from 'react';
import { parseDDMMYYYY, formatDDMMYYYY } from '../utils/dateUtils';
import '../styles/LMPControl.css';

export function LMPControl({ lmpDate, onLMPChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(formatDDMMYYYY(lmpDate));
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
    setInput(formatDDMMYYYY(lmpDate));
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please enter a date');
      return;
    }

    const parsedDate = parseDDMMYYYY(input);
    if (!parsedDate) {
      setError('Invalid date format. Use DD.MM.YYYY');
      return;
    }

    onLMPChange(parsedDate);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="lmp-control">
      <div className="lmp-display">
        <div className="lmp-label">Last Menstrual Period (LMP)</div>
        <div className="lmp-value">{formatDDMMYYYY(lmpDate)}</div>
      </div>

      {!isEditing && (
        <button onClick={handleEditClick} className="edit-button">
          ✎ Edit
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            placeholder="DD.MM.YYYY"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            className={error ? 'input-error' : ''}
            autoFocus
          />
          <div className="button-group">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
}

