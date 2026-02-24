import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { Button, Popup, Loading } from '@taroify/core'
import { ArrowDown } from '@taroify/icons'
import HotelCard from '../../../components/HotelCard'
import CustomNavBar from '../../../components/CustomNavBar'
import useSearchStore from '../../../store/search'
import { searchHotels, getHotelAttributes } from '../../../services/api'
import './index.scss'

export default function HotelList() {
  const router = useRouter()
  const { searchParams } = useSearchStore()
  const [allHotels, setAllHotels] = useState([]) // Original list from API
  const [list, setList] = useState([]) // Filtered list for display
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('智能排序')
  const [showSort, setShowSort] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])
  const [quickFilters, setQuickFilters] = useState([])

  const starFilters = ['五星级', '四星级', '三星级']
  const sortOptions = ['智能排序', '价格从低到高', '价格从高到低', '评分最高', '距离最近']

  // Fetch filter tags on mount
  useEffect(() => {
    fetchFilters()
  }, [])

  // Fetch hotels whenever route params change (to support smart search)
  useEffect(() => {
    fetchHotels()
  }, [router.params.city, router.params.keyword])

  // Apply filters when activeFilters or allHotels change
  useEffect(() => {
    applyFilters()
  }, [activeFilters, allHotels, sortBy])

  const fetchFilters = async () => {
    try {
      const attrs = await getHotelAttributes()
      const attrNames = attrs.map(a => a.attr_name)
      // Combine attribute names with star levels
      setQuickFilters([...starFilters, ...attrNames])
    } catch (error) {
      console.error('Failed to fetch filters:', error)
      setQuickFilters(starFilters)
    }
  }

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const urlCity = router.params.city ? decodeURIComponent(router.params.city) : searchParams.city
      const urlKeyword = router.params.keyword ? decodeURIComponent(router.params.keyword) : searchParams.keyword

      const data = await searchHotels({ city: urlCity, keyword: urlKeyword })

      const transformedList = data.map(hotel => {
        let tags = []
        if (hotel.nearby_attractions) {
          tags = hotel.nearby_attractions.split(/[,;，；]/).map(t => t.trim()).filter(Boolean).slice(0, 3)
        }
        if (tags.length === 0) {
          if (hotel.star_level >= 5) tags = ['五星体验', '设施完善']
          else if (hotel.star_level >= 4) tags = ['品质住宿', '交通便利']
          else tags = ['经济实惠']
        }

        return {
          id: hotel.hotel_id,
          name: hotel.hotel_name_cn,
          image: hotel.primary_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=400&h=300',
          stars: hotel.star_level,
          reviews: 0,
          price: hotel.min_price || 0,
          tags: tags,
          distance: hotel.detail_address,
          badges: hotel.star_level >= 4 ? ['推荐'] : []
        }
      })
      setAllHotels(transformedList)
      setList(transformedList)
    } catch (error) {
      console.error('Failed to fetch hotels:', error)
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...allHotels]

    // Apply star level filters
    const starFilterMap = { '五星级': 5, '四星级': 4, '三星级': 3 }
    const activeStarFilters = activeFilters.filter(f => starFilters.includes(f))

    if (activeStarFilters.length > 0) {
      const starLevels = activeStarFilters.map(f => starFilterMap[f])
      filtered = filtered.filter(h => starLevels.includes(h.stars))
    }

    // Apply sorting
    switch (sortBy) {
      case '价格从低到高':
        filtered.sort((a, b) => a.price - b.price)
        break
      case '价格从高到低':
        filtered.sort((a, b) => b.price - a.price)
        break
      case '评分最高':
        filtered.sort((a, b) => b.stars - a.stars)
        break
      default:
        break
    }

    setList(filtered)
  }

  const handleToDetail = (id) => {
    Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` })
  }

  const toggleFilter = (filter) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <View className="hotel-list-page">
      <CustomNavBar title="酒店列表" />
      {/* Search Summary Header */}
      <View className="sticky-header">
        <View className="search-summary">
          <Text className="city">{router.params.city ? decodeURIComponent(router.params.city) : searchParams.city || '全部'}</Text>
          <Text className="dot">·</Text>
          <Text className="info">{searchParams.nights}晚</Text>
          <Text className="dot">·</Text>
          <Text className="info">{searchParams.rooms}间</Text>
          {router.params.keyword && (
            <>
              <Text className="dot">·</Text>
              <Text className="info">"{decodeURIComponent(router.params.keyword)}"</Text>
            </>
          )}
        </View>

        {/* Filter Bar */}
        <ScrollView scrollX className="filter-bar" showScrollbar={false}>
          <View className="filter-item-wrapper">
            <View
              className="sort-btn"
              onClick={() => setShowSort(true)}
            >
              <Text className="text">{sortBy}</Text>
              <ArrowDown size="12" />
            </View>

            {quickFilters.map((filter, index) => (
              <View
                key={index}
                className={`filter-btn ${activeFilters.includes(filter) ? 'active' : 'normal'}`}
                onClick={() => toggleFilter(filter)}
              >
                <Text>{filter}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* List Content */}
      <View className="list-container">
        {loading ? (
          <View style={{ textAlign: 'center', padding: '40px 0' }}>
            <Loading type="spinner" />
            <Text style={{ display: 'block', marginTop: '10px', color: '#999' }}>加载中...</Text>
          </View>
        ) : list.length > 0 ? (
          <>
            <Text className="list-count">共找到 {list.length} 家酒店</Text>
            {list.map((item) => (
              <HotelCard
                key={item.id}
                hotel={item}
                onClick={() => handleToDetail(item.id)}
              />
            ))}
          </>
        ) : (
          <View style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            <Text>暂无搜索结果</Text>
          </View>
        )}
      </View>

      {/* Sort Popup */}
      <Popup
        open={showSort}
        placement="bottom"
        rounded
        onClose={() => setShowSort(false)}
      >
        <View className="sort-popup">
          <View className="popup-title">排序方式</View>
          {sortOptions.map((option, index) => (
            <View
              key={index}
              className={`sort-option ${sortBy === option ? 'active' : ''}`}
              onClick={() => { setSortBy(option); setShowSort(false); }}
            >
              <Text>{option}</Text>
              {sortBy === option && <Text className="check">✓</Text>}
            </View>
          ))}
        </View>
      </Popup>
    </View>
  )
}


