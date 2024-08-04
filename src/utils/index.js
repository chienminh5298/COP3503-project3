export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomPriority() {
  const priorities = ["High", "Medium", "Standard"];
  return priorities[Math.floor(Math.random() * priorities.length)];
}

export function getRandomFutureDate() {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + getRandomInt(1, 365));
  return futureDate;
}

export function formatDateToMMDDYYYY(date) {
  // Get the month, day, and year from the date object
  let month = date.getMonth() + 1; // Months are zero-based, so add 1
  let day = date.getDate();
  let year = date.getFullYear();

  // Add leading zeros if the month or day is a single digit
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  // Combine the components into the desired format
  return `${month}-${day}-${year}`;
}

export function formatDateToYYYYMMDD(date) {
  let month = date.getMonth() + 1; // Months are zero-based, so add 1
  let day = date.getDate();
  let year = date.getFullYear();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  return `${year}-${month}-${day}`;
}
