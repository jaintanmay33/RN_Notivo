import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface UIState {
  toast: ToastMessage | null;
  isGlobalLoading: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
  setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>()(set => ({
  toast: null,
  isGlobalLoading: false,
  showToast: (message, type = 'success') => {
    set({
      toast: {
        id: Date.now().toString(),
        message,
        type,
      },
    });
  },
  hideToast: () => set({ toast: null }),
  setGlobalLoading: loading => set({ isGlobalLoading: loading }),
}));
