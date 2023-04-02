const MINUTES_IN_DAY_NUMBER = 1440;

export function getSlotCalendarTimeColumnOffset(minutesNumber) {
  return `${(minutesNumber * 100) / MINUTES_IN_DAY_NUMBER}%`;
}
