export function generateUUID(): string {
  if (crypto && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  
  // Fallback polyfill (simple random-based, not crypto-secure but sufficient for most cases)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}