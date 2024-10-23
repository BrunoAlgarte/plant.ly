'use client';
import create from 'zustand';

export const useAddPlantModal = ((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));