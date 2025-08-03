export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      try {
        func(...args);
      } catch (error) {
        console.error('Error in debounced function:', error);
      }
    }, wait);
  };
}
