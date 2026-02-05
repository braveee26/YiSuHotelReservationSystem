import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import TabBar from '../../../components/TabBar'
import './index.scss'

export default function Messages() {
  const messages = [
    {
      id: 1,
      title: '订单确认',
      content: '您的订单已确认，入住日期：2月15日',
      time: '10:30',
      unread: true
    },
    {
      id: 2,
      title: '优惠活动',
      content: '春节特惠，全场酒店低至5折起！',
      time: '昨天',
      unread: false
    },
    {
      id: 3,
      title: '系统通知',
      content: '您的会员积分即将到期，请尽快使用',
      time: '3天前',
      unread: false
    }
  ]

  return (
    <View className="messages-page">
      <View className="page-header">
        <Text className="title">消息中心</Text>
      </View>
      
      <View className="messages-list">
        {messages.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-text">暂无消息</Text>
          </View>
        ) : (
          messages.map(item => (
            <View key={item.id} className={`message-card ${item.unread ? 'unread' : ''}`}>
              <View className="message-icon">
                <Text>📧</Text>
              </View>
              <View className="message-content">
                <View className="message-header">
                  <Text className="message-title">{item.title}</Text>
                  <Text className="message-time">{item.time}</Text>
                </View>
                <Text className="message-text">{item.content}</Text>
              </View>
              {item.unread && <View className="unread-dot" />}
            </View>
          ))
        )}
      </View>
      
      <TabBar current={2} />
    </View>
  )
}
