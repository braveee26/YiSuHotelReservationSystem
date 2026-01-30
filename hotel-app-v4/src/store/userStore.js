
import { create } from 'zustand'

const useUserStore = create((set) => ({
  userInfo: null,
  token: null,
  setUserInfo: (info) => set({ userInfo: info }),
  setToken: (token) => set({ token: token }),
  logout: () => set({ userInfo: null, token: null }),
}))

export default useUserStore
