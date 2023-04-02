export function getShortDateOfWeekByIndex(index) {
  const dateObject = new Date();

  dateObject.setDate(dateObject.getDate() + dateObject.getDay() - index);

  return dateObject.toLocaleDateString('default', {
    weekday: 'short',
  });
}
