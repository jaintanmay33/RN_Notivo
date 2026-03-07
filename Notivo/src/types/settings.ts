export type AppTheme = 'light' | 'dark';

export type AppLanguage = 'en' | 'es' | 'fr' | 'ar';

export interface AppSettings {
  theme: AppTheme;
  language: AppLanguage;
  notificationsEnabled: boolean;
}

export const defaultSettings: AppSettings = {
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
};
