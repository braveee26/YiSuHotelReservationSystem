import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { Tag, Loading } from '@taroify/core'
import BannerCarousel from './BannerCarousel'
import SearchCard from './SearchCard'
import HotelCard from '../../components/HotelCard'
import TabBar from '../../components/TabBar'
import { getHotelList, getHotelAttributes } from '../../services/api'
import './index.scss'

export default function Home() {
  const [hotTags, setHotTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch hotels and hot tags from API on mount
  useEffect(() => {
    fetchHotels()
    fetchHotTags()
  }, [])

  const fetchHotTags = async () => {
    try {
      const data = await getHotelAttributes()
      setHotTags(data.map(attr => attr.attr_name))
    } catch (error) {
      console.error('Failed to fetch hot tags:', error)
      // Fallback to default tags
      setHotTags(['商圈', '温泉酒店', '免费取消', '双床', '高端星'])
    }
  }

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const data = await getHotelList()
      // Transform backend data to match HotelCard expected props
      const transformedHotels = data.map(hotel => {
        // Parse nearby_attractions as tags if available
        let tags = []
        if (hotel.nearby_attractions) {
          // Split by comma or semicolon
          tags = hotel.nearby_attractions.split(/[,;，；]/).map(t => t.trim()).filter(Boolean).slice(0, 3)
        }
        if (tags.length === 0) {
          // Fallback to generic tags based on star level
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
      setHotels(transformedHotels)
    } catch (error) {
      console.error('Failed to fetch hotels:', error)
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  const handleSearch = (params) => {
    console.log('Search params:', params)
    // Navigate to hotel list with search params
    const query = new URLSearchParams({
      city: params.city || '',
      keyword: params.keyword || '',
      checkIn: params.checkIn || '',
      checkOut: params.checkOut || ''
    }).toString()
    Taro.navigateTo({ url: `/pages/hotel/list/index?${query}` })
  }

  const handleHotelClick = (id) => {
    Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` })
  }

  return (
    <View className="home-page">
      <View className="scroll-content">
         {/* Banner */}
        <BannerCarousel onBannerClick={() => handleHotelClick(1)} />

        {/* Search Card */}
        <SearchCard onSearch={handleSearch} />

        {/* Hot Tags */}
        <View className="section-container">
          <View className="section-header">
            <Text className="icon">🔥</Text>
            <Text className="title">热门搜索</Text>
          </View>
          <View className="tags-list">
            {hotTags.map((tag, index) => (
              <View 
                key={index} 
                className={`hot-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View className="section-container">
          <View className="section-header">
             <Text className="title">为你推荐</Text>
          </View>
          <View className="hotel-list">
            {loading ? (
              <View style={{ textAlign: 'center', padding: '40px 0' }}>
                <Loading type="spinner" />
                <Text style={{ display: 'block', marginTop: '10px', color: '#999' }}>加载中...</Text>
              </View>
            ) : hotels.length > 0 ? (
              hotels.map(hotel => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onClick={() => handleHotelClick(hotel.id)} 
                />
              ))
            ) : (
              <View style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                <Text>暂无酒店数据</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* Placeholder for bottom spacing */}
        <View style={{ height: '80px' }}></View>
      </View>

      {/* Custom TabBar */}
      <TabBar current={0} />
    </View>
  )
}

