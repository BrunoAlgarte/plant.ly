import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useHeaderName = create(
  persist(
    (set) => ({
      user_name: '',
      setUserName: (name) => set({ user_name: name }),
      clearStorage: () => {
        set({ user_name: '' });
        localStorage.removeItem('user-name-storage');
      },
    }),
    {
      name: 'user-name-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user_name: state.user_name }),
    }
  )
);