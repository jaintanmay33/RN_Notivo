import { create } from 'zustand';
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from '@utils/storage';
import {
  type AppSettings,
  type AppTheme,
  type AppLanguage,
  defaultSettings,
} from '@app-types/settings';

interface SettingsState extends AppSettings {
  initialize: () => Promise<void>;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: AppLanguage) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()((set, get) => ({
  ...defaultSettings,
  initialize: async () => {
    const saved = await loadFromStorage<AppSettings>(STORAGE_KEYS.SETTINGS);
    if (saved) set(saved);
  },
  setTheme: theme => {
    set({ theme });
    saveToStorage(STORAGE_KEYS.SETTINGS, { ...get() });
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    saveToStorage(STORAGE_KEYS.SETTINGS, { ...get() });
  },
  setLanguage: language => {
    set({ language });
    saveToStorage(STORAGE_KEYS.SETTINGS, { ...get() });
  },
  setNotificationsEnabled: notificationsEnabled => {
    set({ notificationsEnabled });
    saveToStorage(STORAGE_KEYS.SETTINGS, { ...get() });
  },
  resetSettings: () => {
    set(defaultSettings);
    saveToStorage(STORAGE_KEYS.SETTINGS, defaultSettings);
  },
}));
