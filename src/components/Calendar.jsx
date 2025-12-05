import React, { useState } from 'react';
import {
  getMonthDates,
  getMonthName,
  isSameDay,
} from '../utils/dateUtils';
import '../styles/Calendar.css';

export function Calendar({ selectedDate, onDateSelect, lmpDate, dueDate }) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const monthDates = getMonthDates(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (date) => {
    onDateSelect(date);
  };

  const isLmpDate = (date) => isSameDay(date, lmpDate);
  const isDueDate = (date) => isSameDay(date, dueDate);
  const isSelectedDate = (date) => isSameDay(date, selectedDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-button">
          ← Prev
        </button>
        <h2 className="calendar-title">
          {getMonthName(currentMonth - 1)} {currentYear}
        </h2>
        <button onClick={handleNextMonth} className="nav-button">
          Next →
        </button>
      </div>

      <div className="weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>

      <div className="days-grid">
        {monthDates.map((item, index) => (
          <div
            key={index}
            className={`day ${item.isCurrentMonth ? 'current-month' : 'other-month'} ${
              isLmpDate(item.date) ? 'lmp-date' : ''
            } ${isDueDate(item.date) ? 'due-date' : ''} ${
              isSelectedDate(item.date) ? 'selected' : ''
            }`}
            onClick={() => handleDayClick(item.date)}
          >
            {item.dayOfMonth}
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-marker lmp"></span>
          <span>LMP</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker due"></span>
          <span>Due Date</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker selected"></span>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}

