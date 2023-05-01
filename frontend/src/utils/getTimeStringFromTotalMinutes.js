function getTwoDigitStringFromNumber(target) {
  if (target < 10) {
    return '0' + target.toFixed(0);
  } else {
    return target.toFixed(0);
  }
}

export function getTimeStringFromTotalMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${getTwoDigitStringFromNumber(hours)}:${getTwoDigitStringFromNumber(
    minutes
  )}`;
}
