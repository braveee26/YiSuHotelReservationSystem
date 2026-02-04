import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import Taro from '@tarojs/taro'
import { login as loginApi } from '../services/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userInfo: null,
      
      // Set user info directly (used after successful login)
      login: (userInfo) => set({ isLoggedIn: true, userInfo }),
      
      logout: () => set({ isLoggedIn: false, userInfo: null }),
      
      // Real login function that calls API
      loginWithCredentials: async (user_name, password) => {
        try {
          const response = await loginApi({ user_name, password })
          if (response && response.user) {
            set({ 
              isLoggedIn: true, 
              userInfo: response.user 
            })
            return { success: true, user: response.user }
          }
          return { success: false, error: 'Login failed' }
        } catch (error) {
          return { success: false, error: error.message || 'Login failed' }
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = Taro.getStorageSync(name)
          return value || null
        },
        setItem: (name, value) => {
          Taro.setStorageSync(name, value)
        },
        removeItem: (name) => {
          Taro.removeStorageSync(name)
        }
      }))
    }
  )
)

export default useAuthStore

