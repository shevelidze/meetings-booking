export function getTimeStringFromDateObject(dateObject) {
  return dateObject.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
