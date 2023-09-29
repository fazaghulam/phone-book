// utils/sessionStorage.ts

// Get an item from sessionStorage and parse it as JSON
export function getSessionStorageItem<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

// Set an item in sessionStorage as JSON
export function setSessionStorageItem<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}
