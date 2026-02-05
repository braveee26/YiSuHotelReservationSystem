import { create } from 'zustand'

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  userInfo: null,
  
  login: (userInfo) => set({ isLoggedIn: true, userInfo }),
  logout: () => set({ isLoggedIn: false, userInfo: null }),
  
  // Mock login function
  loginWithPhone: async (phone, password) => {
    // In a real app, you would call an API here
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ 
          isLoggedIn: true, 
          userInfo: { 
            name: '用户' + phone.slice(-4), 
            phone 
          } 
        })
        resolve(true)
      }, 500)
    })
  }
}))

export default useAuthStore
