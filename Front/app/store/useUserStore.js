import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(persist(
  (set, get) => ({
    user: null,
    token: null,
    _hasHydrated: false,

    setHasHydrated: (state) => {
      set({
        _hasHydrated: state
      });
    },

    login: (userInfo, token) => {
      set({ user: userInfo, token });
    },

    logout: () => {
      set({ user: null, token: null });
    },

    isLoggedIn: () => !!get().token,
    
    // 获取当前用户信息
    getCurrentUser: () => get().user,
    
    // 获取token
    getToken: () => get().token,
    
    // 更新用户信息
    updateUserInfo: (userInfo) => {
      set({ user: { ...get().user, ...userInfo } });
    }
  }),

  {
    name: "user-storage", // 本地存储的 key
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ user: state.user, token: state.token }), // 只保存必要字段
    onRehydrateStorage: () => (state) => {
      state.setHasHydrated(true);
    }
  }
));
