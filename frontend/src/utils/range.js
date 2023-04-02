export function range(...args) {
  const start = args.length === 2 ? args[0] : 0;
  const end = args[1] || args[0];

  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}
