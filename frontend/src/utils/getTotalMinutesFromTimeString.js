export function getTotalMinutesFromTimeString(timeString) {
  const match = timeString.match(/(\d\d):(\d\d)/);

  if (match === null) {
    throw new Error('Invalid time string.');
  }

  return parseInt(match[1] * 60 + parseInt(match[2]));
}
