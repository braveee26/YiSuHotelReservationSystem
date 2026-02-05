import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { Button } from '@taroify/core'
import TabBar from '../../../components/TabBar'
import './index.scss'

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      hotelName: '大阪皇家花园酒店',
      date: '2024-02-10',
      rating: 5,
      content: '非常好的酒店体验，房间干净整洁，服务态度很好！',
      status: '已点评'
    },
    {
      id: 2,
      hotelName: '东京希尔顿酒店',
      date: '2024-01-20',
      rating: 0,
      content: '',
      status: '待点评'
    }
  ]

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <View className="reviews-page">
      <View className="page-header">
        <Text className="title">我的点评</Text>
      </View>
      
      <View className="reviews-list">
        {reviews.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-text">暂无点评记录</Text>
          </View>
        ) : (
          reviews.map(item => (
            <View key={item.id} className="review-card">
              <View className="review-header">
                <Text className="hotel-name">{item.hotelName}</Text>
                <Text className={`status ${item.status === '待点评' ? 'pending' : 'done'}`}>
                  {item.status}
                </Text>
              </View>
              <Text className="review-date">入住日期：{item.date}</Text>
              
              {item.rating > 0 ? (
                <View className="review-content">
                  <Text className="stars">{renderStars(item.rating)}</Text>
                  <Text className="review-text">{item.content}</Text>
                </View>
              ) : (
                <View className="review-action">
                  <Button color="#385e72" size="small" shape="round">立即点评</Button>
                </View>
              )}
            </View>
          ))
        )}
      </View>
      
      <TabBar current={3} />
    </View>
  )
}
