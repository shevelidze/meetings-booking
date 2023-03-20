export function pick<T extends object, P extends keyof T>(
  target: T,
  ...keys: P[]
) {
  const result: Partial<T> = {};

  for (const key of keys) {
    if (key in target) {
      result[key] = target[key];
    }
  }

  return result as Pick<T, P>;
}
