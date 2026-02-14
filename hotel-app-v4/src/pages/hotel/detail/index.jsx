import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { Tabs, Loading } from '@taroify/core'
import { LocationOutlined } from '@taroify/icons'
import useSearchStore from '../../../store/search'
import { getHotelDetail } from '../../../services/api'
import CustomNavBar from '../../../components/CustomNavBar'
import RoomList from './RoomList'
import './index.scss'

export default function HotelDetail() {
  const router = useRouter()
  const hotelId = router.params.id
  const { searchParams } = useSearchStore()
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hotel, setHotel] = useState(null)

  // Fetch hotel data from API
  useEffect(() => {
    if (hotelId) {
      fetchHotelDetail()
    }
  }, [hotelId])

  const fetchHotelDetail = async () => {
    setLoading(true)
    try {
      const data = await getHotelDetail(hotelId)
      // Transform data for display
      const images = data.hotel_image?.length > 0
        ? data.hotel_image.sort((a, b) => a.sort_order - b.sort_order).map(img => img.image_url)
        : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=800&h=600']

      // Parse nearby_attractions as review keywords
      let reviewKeywords = []
      if (data.nearby_attractions) {
        reviewKeywords = data.nearby_attractions.split(/[,;，；]/).map(t => t.trim()).filter(Boolean).slice(0, 4)
      }
      if (reviewKeywords.length === 0) {
        reviewKeywords = ['位置优越', '设施完善', '服务周到']
      }

      setHotel({
        id: data.hotel_id,
        name: data.hotel_name_cn,
        nameEn: data.hotel_name_en || '',
        stars: data.star_level || 4,
        openYear: data.open_year || 2020,
        images: images,
        address: data.detail_address || data.city + data.district,
        facilities: [
          { icon: '🍳', label: '早餐' },
          { icon: '📶', label: 'WiFi' },
          { icon: '🏊', label: '泳池' },
          { icon: '🅿️', label: '停车' },
          { icon: '💆', label: 'SPA' },
          { icon: '🧺', label: '洗衣' }
        ],
        distance: data.nearby_attractions ? data.nearby_attractions.split(/[,;，；]/)[0] : '市中心',
        reviewKeywords: reviewKeywords,
        roomTypes: data.room_type || []
      })
    } catch (error) {
      console.error('Failed to fetch hotel detail:', error)
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View className="hotel-detail" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading type="spinner" />
        <Text style={{ marginLeft: '10px' }}>加载中...</Text>
      </View>
    )
  }

  if (!hotel) {
    return (
      <View className="hotel-detail" style={{ padding: '40px', textAlign: 'center' }}>
        <Text>酒店信息加载失败</Text>
      </View>
    )
  }

  return (
    <View className="hotel-detail">
      <CustomNavBar title="酒店详情" transparent />
      {/* Gallery Swiper */}
      <Swiper className="gallery-swiper" indicatorDots circular autoplay>
        {hotel.images.map((img, index) => (
          <SwiperItem key={index}>
            <Image src={img} mode="aspectFill" className="slide-image" />
          </SwiperItem>
        ))}
      </Swiper>

      {/* Hotel Info */}
      <View className="info-card">
        <View className="header-row">
          <View>
            <Text className="hotel-name">{hotel.name}</Text>
            <Text className="hotel-name-en">{hotel.nameEn}</Text>
          </View>
        </View>

        <View className="badges-row">
          <View className="stars">
            {new Array(hotel.stars).fill(0).map((_, i) => (
              <Text key={i} className="star">★</Text>
            ))}
          </View>
          <Text className="dot">·</Text>
          <Text className="year">{hotel.openYear}年开业</Text>
        </View>

        <View className="facilities-grid">
          {hotel.facilities.map((fac, i) => (
            <View key={i} className="fac-item">
              <Text className="fac-icon">{fac.icon}</Text>
              <Text className="fac-label">{fac.label}</Text>
            </View>
          ))}
        </View>

        {/* Rating & Location */}
        <View className="review-box">
          <View className="score-badge">4.5</View>
          <View className="review-info">
            <View className="keywords">
              {hotel.reviewKeywords.map((k, i) => (
                <Text key={i} className="k-tag">{k}</Text>
              ))}
            </View>
            <Text className="count">暂无评论</Text>
          </View>
        </View>

        <View className="location-box">
          <View className="loc-icon-bg">📍</View>
          <View>
            <Text className="addr">{hotel.address}</Text>
            <Text className="dist">{hotel.distance}</Text>
          </View>
        </View>
      </View>

      {/* Tabs & Content */}
      <View className="tabs-container">
        <View className="check-in-info">
          <Text className="date">{searchParams.checkIn} 至 {searchParams.checkOut}</Text>
          <Text className="nights">共{searchParams.nights}晚</Text>
        </View>

        <Tabs active={activeTab} onChange={({ eventKey }) => setActiveTab(eventKey)} sticky>
          <Tabs.TabPane title="房型">
            <RoomList hotelId={hotelId} roomTypes={hotel.roomTypes} />
          </Tabs.TabPane>
          <Tabs.TabPane title="设施">
            <View className="content-pad">
              <Text>设施详情暂未开发</Text>
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="政策">
            <View className="content-pad">
              <View className="policy-group">
                <Text className="p-title">入住/退房</Text>
                <Text className="p-desc">入住：15:00后 | 退房：12:00前</Text>
              </View>
            </View>
          </Tabs.TabPane>
          <Tabs.TabPane title="评价">
            <View className="content-pad">
              <Text>评价列表暂未开发</Text>
            </View>
          </Tabs.TabPane>
        </Tabs>
      </View>
    </View>
  )
}

