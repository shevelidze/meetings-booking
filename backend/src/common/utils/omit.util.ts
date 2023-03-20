export function omit<T, P extends keyof T>(target: T, ...keys: P[]) {
  const result: Partial<T> = { ...target };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, P>;
}
