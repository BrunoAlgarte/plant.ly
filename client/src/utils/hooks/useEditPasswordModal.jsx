'use client';
import create from 'zustand';

export const useEditPasswordModal = ((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));