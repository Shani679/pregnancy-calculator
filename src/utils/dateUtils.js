/**
 * Parse a date string in DD.MM.YYYY format
 * @param {string} dateString - Date in DD.MM.YYYY format
 * @returns {Date|null} Parsed date or null if invalid
 */
export function parseDDMMYYYY(dateString) {
  const regex = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
  const match = dateString.trim().match(regex);
  
  if (!match) return null;
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  // Basic validation
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  
  const date = new Date(year, month - 1, day);
  
  // Check if the date is valid (handles cases like Feb 30)
  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
    return null;
  }
  
  return date;
}

/**
 * Format a Date object to DD.MM.YYYY string
 * @param {Date} date
 * @returns {string} Formatted date
 */
export function formatDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Get the number of days between two dates (targetDate - lmpDate)
 * @param {Date} lmpDate
 * @param {Date} targetDate
 * @returns {number} Days difference (can be negative if targetDate is before lmpDate)
 */
export function getDaysDifference(lmpDate, targetDate) {
  // Normalize both dates to midnight to avoid timezone issues
  const lmp = new Date(lmpDate);
  lmp.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  
  const diffInMs = target.getTime() - lmp.getTime();
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Calculate gestational age based on LMP and target date
 * @param {Date} lmpDate - Last menstrual period date
 * @param {Date} targetDate - The date to calculate for
 * @returns {Object} Gestational age info
 */
export function calculateGestationalAge(lmpDate, targetDate) {
  const PREGNANCY_LENGTH_DAYS = 280; // 40 weeks
  
  const diffInDays = getDaysDifference(lmpDate, targetDate);
  const isBeforeLmp = diffInDays < 0;
  const isAfterDueDate = diffInDays >= PREGNANCY_LENGTH_DAYS;
  
  const absDiffInDays = Math.abs(diffInDays);
  const weeks = Math.floor(absDiffInDays / 7);
  const days = absDiffInDays % 7;
  
  return {
    diffInDays: diffInDays,
    weeks: weeks,
    days: days,
    isBeforeLmp: isBeforeLmp,
    isAfterDueDate: isAfterDueDate,
  };
}

/**
 * Calculate the estimated due date (LMP + 40 weeks)
 * @param {Date} lmpDate
 * @returns {Date} Due date
 */
export function calculateDueDate(lmpDate) {
  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280); // 40 weeks = 280 days
  return dueDate;
}

/**
 * Get the number of days until due date
 * @param {Date} lmpDate
 * @param {Date} targetDate
 * @returns {number} Days remaining (can be negative if past due date)
 */
export function getDaysUntilDueDate(lmpDate, targetDate) {
  const dueDate = calculateDueDate(lmpDate);
  return getDaysDifference(targetDate, dueDate);
}

/**
 * Get all dates for a specific month
 * @param {number} year
 * @param {number} month - 1-based month (1-12)
 * @returns {Array<{date: Date, dayOfMonth: number, isCurrentMonth: boolean}>}
 */
export function getMonthDates(year, month) {
  const dates = [];
  
  // Get first day of the month
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  
  // Get the day of week for the first day (0 = Sunday)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // Generate 42 days (6 weeks)
  const currentDate = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    const isCurrentMonth = currentDate.getMonth() === month - 1;
    dates.push({
      date: new Date(currentDate),
      dayOfMonth: currentDate.getDate(),
      isCurrentMonth: isCurrentMonth,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

/**
 * Get month name
 * @param {number} month - 0-based month (0-11)
 * @returns {string}
 */
export function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
}

/**
 * Check if two dates are the same day
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

