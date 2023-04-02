export function getTimeStringFromDateObject(dateObject) {
  return dateObject.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
