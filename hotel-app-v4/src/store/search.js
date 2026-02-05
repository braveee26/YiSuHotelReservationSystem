import { create } from 'zustand'

const useSearchStore = create((set) => ({
  searchParams: {
    city: '大阪',
    location: '',
    checkIn: '2026-02-15',
    checkOut: '2026-02-16',
    nights: 1,
    rooms: 1,
    adults: 2,
    children: 0,
    businessType: '国内'
  },

  setSearchParams: (params) => set((state) => ({
    searchParams: { ...state.searchParams, ...params }
  })),

  updateSearchParam: (key, value) => set((state) => ({
    searchParams: { ...state.searchParams, [key]: value }
  })),
  
  resetSearch: () => set({
    searchParams: {
      city: '大阪',
      location: '',
      checkIn: '2026-02-15',
      checkOut: '2026-02-16',
      nights: 1,
      rooms: 1,
      adults: 2,
      children: 0,
      businessType: '国内'
    }
  })
}))

export default useSearchStore
