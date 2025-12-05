import React from 'react';
import {
  calculateGestationalAge,
  calculateDueDate,
  getDaysUntilDueDate,
  formatDDMMYYYY,
} from '../utils/dateUtils';
import '../styles/GestationalAgeDisplay.css';

export function GestationalAgeDisplay({ lmpDate, selectedDate }) {
  const ageInfo = calculateGestationalAge(lmpDate, selectedDate);
  const dueDate = calculateDueDate(lmpDate);
  const daysUntilDue = getDaysUntilDueDate(lmpDate, selectedDate);

  const renderAgeMessage = () => {
    if (ageInfo.isBeforeLmp) {
      return (
        <div className="status-message before-lmp">
          ⚠️ The selected date is before the LMP. Not pregnant yet on this date.
        </div>
      );
    }

    if (ageInfo.isAfterDueDate) {
      const daysOverdue = ageInfo.diffInDays - 280;
      return (
        <div className="status-message after-due">
          ⚠️ Beyond week 40 ({daysOverdue} days past due date)
        </div>
      );
    }

    return (
      <div className="gestational-age-main">
        <div className="age-value">
          Week {ageInfo.weeks} + {ageInfo.days} days
        </div>
      </div>
    );
  };

  return (
    <div className="gestational-age-display">
      <div className="info-section">
        <h3>Selected Date</h3>
        <div className="info-value">{formatDDMMYYYY(selectedDate)}</div>
      </div>

      <div className="info-section">
        <h3>Gestational Age</h3>
        {renderAgeMessage()}
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="label">Days since LMP</div>
          <div className="value">{ageInfo.diffInDays} days</div>
        </div>

        <div className="info-item">
          <div className="label">Estimated Due Date</div>
          <div className="value">{formatDDMMYYYY(dueDate)}</div>
        </div>

        {!ageInfo.isBeforeLmp && !ageInfo.isAfterDueDate && (
          <div className="info-item">
            <div className="label">Days until due date</div>
            <div className="value">{daysUntilDue} days</div>
          </div>
        )}
      </div>
    </div>
  );
}

