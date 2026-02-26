import { create } from 'zustand'

// Helper to get formatted date string
const getDateStr = (daysFromNow = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().split('T')[0]
}

const useSearchStore = create((set) => ({
  searchParams: {
    city: '',
    location: '',
    keyword: '',
    checkIn: getDateStr(0),  // Today
    checkOut: getDateStr(1), // Tomorrow
    nights: 1,
    rooms: 1,
    adults: 2,
    children: 0,
    stars: '',      // 星级 1-5
    tags: [],       // 选中的快捷标签
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
      city: '',
      location: '',
      keyword: '',
      checkIn: getDateStr(0),
      checkOut: getDateStr(1),
      nights: 1,
      rooms: 1,
      adults: 2,
      children: 0,
      businessType: '国内'
    }
  })
}))

export default useSearchStore

