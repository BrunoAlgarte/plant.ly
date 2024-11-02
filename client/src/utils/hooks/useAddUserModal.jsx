'use client';
import create from 'zustand';

export const useAddUserModal = ((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));