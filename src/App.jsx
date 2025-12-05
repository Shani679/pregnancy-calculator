import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { ManualDateInput } from './components/ManualDateInput';
import { GestationalAgeDisplay } from './components/GestationalAgeDisplay';
import { LMPControl } from './components/LMPControl';
import { calculateDueDate } from './utils/dateUtils';
import './styles/App.css';

export function App() {
  // Default LMP: 18.08.2025
  const defaultLMP = new Date(2025, 7, 18); // Month is 0-indexed, so 7 = August
  const [lmpDate, setLmpDate] = useState(defaultLMP);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dueDate = calculateDueDate(lmpDate);

  const handleLMPChange = (newLmpDate) => {
    setLmpDate(newLmpDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>👶 Pregnancy Week Calculator</h1>
        <p className="subtitle">Track your gestational age based on your LMP date</p>
      </header>

      <main className="app-main">
        <div className="container">
          {/* LMP Control Section */}
          <section className="lmp-section">
            <LMPControl lmpDate={lmpDate} onLMPChange={handleLMPChange} />
          </section>

          <div className="content-grid">
            {/* Calendar Section */}
            <section className="calendar-section">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                lmpDate={lmpDate}
                dueDate={dueDate}
              />
            </section>

            {/* Info Section */}
            <section className="info-section">
              <GestationalAgeDisplay lmpDate={lmpDate} selectedDate={selectedDate} />
            </section>
          </div>

          {/* Manual Date Input Section */}
          <section className="manual-input-section">
            <ManualDateInput onDateSubmit={handleDateSelect} />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          This calculator is for informational purposes. Always consult with your healthcare provider for accurate pregnancy information.
        </p>
      </footer>
    </div>
  );
}

