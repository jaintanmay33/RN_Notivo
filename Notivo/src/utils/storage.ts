import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  TODOS: '@notivo/todos',
  SETTINGS: '@notivo/settings',
} as const;

export async function saveToStorage<T>(key: string, value: T): Promise<boolean> {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to save key '${key}':`, error);
    return false;
  }
}

export async function loadFromStorage<T>(key: string): Promise<T | null> {
  try {
    const json = await AsyncStorage.getItem(key);
    if (json === null) return null;
    return JSON.parse(json) as T;
  } catch (error) {
    console.error(`[Storage] Failed to load key '${key}':`, error);
    return null;
  }
}

export async function removeFromStorage(key: string): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage] Failed to remove key '${key}':`, error);
    return false;
  }
}

export async function clearAllStorage(): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch (error) {
    console.error('[Storage] Failed to clear all data:', error);
    return false;
  }
}
