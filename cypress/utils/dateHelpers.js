export const getDateInfo = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    day: date.getDate(),
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear(),
  };
};

export const getFormattedDate = (offset) => {
  const { day, month, year } = getDateInfo(offset);
  return `${day} ${month}, ${year}`;
};
