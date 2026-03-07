export const TODO_TITLE_MIN_LENGTH = 2;
export const TODO_TITLE_MAX_LENGTH = 100;
export const TODO_DESCRIPTION_MAX_LENGTH = 500;
export const TODO_NOTES_MAX_LENGTH = 1000;
export const TODO_MAX_TAGS = 5;
export const TODO_TAG_MAX_LENGTH = 20;
export const TODO_MIN_ESTIMATED_MINS = 1;
export const TODO_MAX_ESTIMATED_MINS = 999;

export const PRIORITY_ORDER: Record<string, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export const RECURRENCE_LABELS: Record<string, string> = {
  none: 'No Repeat',
  daily: 'Every Day',
  weekly: 'Every Week',
  monthly: 'Every Month',
};

export const REPORT_DAYS = 14;

export const ANIMATION_DURATION_FAST = 200;
export const ANIMATION_DURATION_NORMAL = 300;
export const ANIMATION_DURATION_SLOW = 500;
export const SPLASH_DURATION_MS = 2800;

export const TOAST_DURATION_MS = 3000;
