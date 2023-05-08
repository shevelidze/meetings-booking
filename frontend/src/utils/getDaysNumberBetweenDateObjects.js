const millisecondsIn24Hours = 24 * 60 * 60 * 1000;

export function getDaysNumberBetweenDateObjects(dateObjectA, dateObjectB) {
  return Math.floor(
    (dateObjectB.getTime() - dateObjectA.getTime()) / millisecondsIn24Hours
  );
}
