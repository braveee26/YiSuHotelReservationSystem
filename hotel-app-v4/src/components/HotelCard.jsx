import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { Tag } from '@taroify/core'
import { LocationOutlined } from '@taroify/icons'
import './HotelCard.scss'

export default function HotelCard({ hotel, onClick }) {
  // Format score to 1 decimal place if it exists
  const score = hotel.rating || hotel.stars || 4.5
  
  return (
    <View className="hotel-card" onClick={onClick}>
      <View className="image-wrapper">
        <Image 
          className="hotel-image" 
          src={hotel.image} 
          mode="aspectFill" 
        />
        {hotel.badges && hotel.badges.length > 0 && (
          <View className="badge-tag">{hotel.badges[0]}</View>
        )}
      </View>
      
      <View className="info-content">
        <View className="header-row">
          <Text className="hotel-name">{hotel.name}</Text>
          <View className="price-box">
            <Text className="symbol">¥</Text>
            <Text className="amount">{hotel.price}</Text>
            <Text className="suffix">起</Text>
          </View>
        </View>
        
        <View className="score-row">
           <View className="score-tag">{Number(score).toFixed(1)}</View>
           <Text className="review-text">{hotel.reviews || '暂无'}条评论</Text>
        </View>

        <View className="tags-row">
          {hotel.tags && hotel.tags.slice(0, 3).map((tag, index) => (
            <View key={index} className="feature-tag">
              {tag}
            </View>
          ))}
        </View>

        <View className="footer-row">
          <View className="location-info">
             <LocationOutlined size="12" />
             <Text className="text">{hotel.distance}</Text>
          </View>
          <View className="view-btn">查看</View>
        </View>
      </View>
    </View>
  )
}
