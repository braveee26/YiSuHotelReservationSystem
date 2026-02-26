import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { Button } from '@taroify/core'
import CustomTabBar from '../../../components/CustomTabBar'
import PageFadeIn from '../../../components/PageFadeIn'
import './index.scss'

export default function Favorites() {
  const favorites = [
    {
      id: 1,
      name: '大阪皇家花园酒店',
      rating: 4.8,
      reviews: 1523,
      tags: ['床很舒服', '服务热情'],
      distance: '距离难波步行100米',
      price: 850,
      image: 'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?w=400'
    },
    {
      id: 2,
      name: '大阪海湾度假酒店',
      rating: 4.7,
      reviews: 1234,
      tags: ['泳池很棒', '海景房'],
      distance: '距离海边500米',
      price: 920,
      image: 'https://images.unsplash.com/photo-1572177215152-32f247303126?w=400'
    }
  ]

  const handleViewHotel = (id) => {
    Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` })
  }

  return (
    <>
    <PageFadeIn>
    <View className="favorites-page">
      <View className="page-header">
        <Text className="title">我的收藏</Text>
      </View>
      
      <View className="page-desc">
        这是收藏页面，展示您收藏的酒店列表。您可以在这里快速访问心仪的酒店。
      </View>
      
      <View className="hotel-count">共 {favorites.length} 家收藏的酒店</View>
      
      <View className="favorites-list">
        {favorites.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-text">暂无收藏的酒店</Text>
          </View>
        ) : (
          favorites.map(item => (
            <View key={item.id} className="favorite-card">
              <Text className="recommend-tag">推荐</Text>
              <Image src={item.image} mode="aspectFill" className="hotel-image" />
              <View className="hotel-info">
                <Text className="hotel-name">{item.name}</Text>
                <Text className="stars">★★★★★</Text>
                <View className="rating-row">
                  <Text className="rating-badge">{item.rating}</Text>
                  <Text className="reviews">{item.reviews}条评论</Text>
                </View>
                <View className="tags">
                  {item.tags.map((tag, idx) => (
                    <Text key={idx} className="tag">{tag}</Text>
                  ))}
                </View>
                <Text className="distance">○ {item.distance}</Text>
              </View>
              <View className="price-section">
                <View>
                  <Text className="price">¥{item.price}</Text>
                  <Text className="unit">起</Text>
                </View>
                <Text className="view-btn" onClick={() => handleViewHotel(item.id)}>查看</Text>
              </View>
            </View>
          ))
        )}
      </View>
      
      {/* Spacer for CustomTabBar */}
      <View style={{ height: '120px' }}></View>
    </View>
    </PageFadeIn>

    <CustomTabBar />
    </>
  )
}
