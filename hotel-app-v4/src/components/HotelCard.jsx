import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { Tag, Rate } from '@taroify/core'
import { LocationOutlined } from '@taroify/icons'
import './HotelCard.scss'

export default function HotelCard({ hotel, onClick }) {
  return (
    <View className="hotel-card" onClick={onClick}>
      <View className="image-wrapper">
        <Image 
          className="hotel-image" 
          src={hotel.image} 
          mode="aspectFill" 
        />
        {hotel.badges && hotel.badges.length > 0 && (
          <View className="badge-container">
            {hotel.badges.map((badge, index) => (
              <View key={index} className="badge-item">{badge}</View>
            ))}
          </View>
        )}
      </View>
      
      <View className="info-content">
        <View className="name-row">
          <Text className="hotel-name">{hotel.name}</Text>
          <View className="price-box">
            <Text className="currency">¥</Text>
            <Text className="amount">{hotel.price}</Text>
            <Text className="suffix">起</Text>
          </View>
        </View>
        
        <View className="rating-row">
          <View className="score-box">{hotel.rating}</View>
          <Text className="comment-count">{hotel.reviews}条评论</Text>
          <Text className="separator">·</Text>
          <Text className="star-text">{hotel.stars}星级</Text>
        </View>
        
        <View className="location-row">
          <LocationOutlined className="icon" />
          <Text className="text">{hotel.distance}</Text>
        </View>
        
        <View className="tags-row">
          {hotel.tags && hotel.tags.map((tag, index) => (
            <Tag key={index} color="#f0f9ff" textColor="#385e72" className="tag-item">
              {tag}
            </Tag>
          ))}
        </View>
      </View>
    </View>
  )
}
