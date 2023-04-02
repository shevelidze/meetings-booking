export function getClosestWeekBeginningBefore(dateObject) {
  const result = new Date(dateObject);

  result.setDate(result.getDate() - result.getDay());

  return result;
}
