import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { Tag } from '@taroify/core'
import BannerCarousel from './BannerCarousel'
import SearchCard from './SearchCard'
import HotelCard from '../../components/HotelCard'
import TabBar from '../../components/TabBar'
import './index.scss'

export default function Home() {
  const hotTags = [
    '商圈', '温泉酒店', '4.5分以上', '免费取消', '许愿券', '双床', '会员', '高端星'
  ]

  const [selectedTags, setSelectedTags] = useState([])

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  const recommendedHotels = [
    {
      id: 1,
      name: '大阪皇家花园酒店',
      image: 'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5NzgxNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      stars: 5,
      rating: 4.8,
      reviews: 1523,
      price: 850,
      tags: ['床很舒服', '服务热情', '交通便利'],
      distance: '距离难波步行100米',
      badges: ['推荐', '华人优选']
    },
    {
      id: 2,
      name: '心斋桥温泉酒店',
      image: 'https://images.unsplash.com/photo-1610375233775-6e0166927193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGhvdGVsJTIwcnlva2FufGVufDF8fHx8MTc2OTg1NjY1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stars: 4,
      rating: 4.6,
      reviews: 987,
      price: 680,
      tags: ['温泉很棒', '日式风格', '早餐丰富'],
      distance: '距离心斋桥地铁站200米',
      badges: ['推荐']
    }
  ]

  const handleSearch = (params) => {
    console.log('Search params:', params)
    Taro.navigateTo({ url: '/pages/hotel/list/index' })
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
            {recommendedHotels.map(hotel => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onClick={() => handleHotelClick(hotel.id)} 
              />
            ))}
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
