export const formatDate = (date) => {
  let parts = date.split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const countDays = (startDate, endDate) => {
  const timeDifference = new Date(endDate) - new Date(startDate);
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference + 1; // count both start and end dates
};
