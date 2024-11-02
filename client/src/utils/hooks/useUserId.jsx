import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserId = create(
  persist(
    (set) => ({
      user_id: "",
      setUserId: (id) => set({ user_id: id }),
      clearUserStorage: () => {
        set({ user_id: "" });
        localStorage.removeItem("user-id-storage");
      },
    }),
    {
      name: "user-id-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user_id: state.user_id }),
    }
  )
);

export default useUserId;
