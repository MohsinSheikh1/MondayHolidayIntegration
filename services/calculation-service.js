function calculateWorkingDays(startDate, endDate, holidays) {
  /*
   * Calculate the number of working days between two dates, excluding weekends and holidays.
   * Returns -1 if endDate occurs before startDate
   * @param {string} startDate - The start date in "YYYY-MM-DD" format.
   * @param {string} endDate - The end date in "YYYY--MM-DD" format.
   * @param {list of strings} holidays - The holidays to be excluded.
   **/
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) {
    return -1;
  }

  let workingDays = 0;

  // Convert holiday strings to Date objects
  const holidayDates = holidays.map((holiday) => new Date(holiday));

  // Iterate over each day between start and end dates
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 = Sunday, 6 = Saturday
    const isHoliday = holidayDates.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    );

    if (!isWeekend && !isHoliday) {
      workingDays++;
    }
  }

  return workingDays;
}

module.exports = {
  calculateWorkingDays,
};

// Usage
// const holidays = ["2024-06-10", "2024-06-19", "2024-06-07"];
// const startDate = "2024-06-05";
// const endDate = "2024-06-03";
// const workingDays = calculateWorkingDays(startDate, endDate, holidays);

// console.log(`Total working days: ${workingDays}`);
