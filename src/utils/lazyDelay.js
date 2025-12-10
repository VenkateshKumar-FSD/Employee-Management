export function lazyDelay(importFn, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(importFn()), delay);
  });
}
