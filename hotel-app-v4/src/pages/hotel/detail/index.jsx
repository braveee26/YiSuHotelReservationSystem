import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { Tabs } from '@taroify/core'
import { LocationOutlined } from '@taroify/icons'
import useSearchStore from '../../../store/search'
import RoomList from './RoomList'
import './index.scss'

export default function HotelDetail() {
  const { searchParams } = useSearchStore()
  const [activeTab, setActiveTab] = useState(0)

  // Mock hotel data (would come from API/Prop in real app)
  const hotel = {
    id: 1,
    name: '大阪皇家花园酒店',
    nameEn: 'Osaka Royal Park Hotel',
    stars: 5,
    openYear: 2018,
    rating: 4.8,
    reviews: 1523,
    images: [
      'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5NzgxNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1572177215152-32f247303126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzY5Nzk1MzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1695173849152-c506198aaf90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzY5ODMyMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1677763856232-d9eb9e127e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzfGVufDF8fHx8MTc2OTgzNzUzMnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    address: '大阪市中央区难波1-2-3',
    facilities: [
      { icon: '🍳', label: '早餐' },
      { icon: '📶', label: 'WiFi' },
      { icon: '🏊', label: '泳池' },
      { icon: '🅿️', label: '停车' },
      { icon: '💆', label: 'SPA' },
      { icon: '🧺', label: '洗衣' }
    ],
    distance: '距离难波步行100米',
    reviewKeywords: ['床很舒服', '服务热情', '交通便利', '早餐丰富']
  }

  return (
    <View className="hotel-detail">
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
          <View className="score-badge">{hotel.rating}</View>
          <View className="review-info">
             <View className="keywords">
               {hotel.reviewKeywords.map((k, i) => (
                 <Text key={i} className="k-tag">{k}</Text>
               ))}
             </View>
             <Text className="count">{hotel.reviews}条评论</Text>
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

         <Tabs active={activeTab} onChange={({eventKey}) => setActiveTab(eventKey)} sticky>
           <Tabs.TabPane title="房型">
             <RoomList />
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
