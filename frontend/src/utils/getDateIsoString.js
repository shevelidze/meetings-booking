export function getDateIsoString(dateObject) {
  return (
    dateObject.getFullYear() +
    '-' +
    (dateObject.getMonth() + 1) +
    '-' +
    dateObject.getDate()
  );
}
