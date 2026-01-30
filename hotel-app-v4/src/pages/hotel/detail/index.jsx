
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@taroify/core'
import Taro, { useRouter } from '@tarojs/taro'
// import { Price } from '@nutui/nutui-react-taro'
import './index.scss'

const HotelDetail = () => {
    const router = useRouter()
    
    const handleBooking = () => {
        Taro.navigateTo({ url: '/pages/hotel/booking/index' })
    }

  return (
    <View className="hotel-detail-page">
      <View className="hotel-header-image">Hotel Image PlaceHolder</View>
      <View className="hotel-info">
          <Text className="title">Luxury Hotel</Text>
          <Text className="address">123 Street, City</Text>
          <View className="map-placeholder">Map Location</View>
      </View>
      
      <View className="room-list">
          <Text className="section-title">房型选择</Text>
          {[1,2,3].map(i => (
              <View key={i} className="room-item">
                  <Text>Deluxe Room {i}</Text>
                  <View className="action">
                      <Text className="price">¥399</Text>
                      <Button size="mini" type="primary" onClick={handleBooking}>预订</Button>
                  </View>
              </View>
          ))}
      </View>
    </View>
  )
}

export default HotelDetail
