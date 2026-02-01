import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Tabs, Button, Tag } from '@taroify/core'
import TabBar from '../../components/TabBar'
import './index.scss'

export default function OrderList() {
  const [activeTab, setActiveTab] = useState(0)

  const orders = [
    {
      id: 101,
      hotelName: '大阪皇家花园酒店',
      status: '待入住',
      checkIn: '02-15',
      checkOut: '02-16',
      room: '豪华双床房',
      price: 850,
      image: 'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5NzgxNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 102,
      hotelName: '东京希尔顿酒店',
      status: '已离店',
      checkIn: '01-20',
      checkOut: '01-22',
      room: '行政大床房',
      price: 2400,
      image: 'https://images.unsplash.com/photo-1572177215152-32f247303126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzY5Nzk1MzA1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case '待入住': return '#385e72' // Primary Blue
      case '已离店': return '#047857' // Emerald
      case '已取消': return '#999'
      default: return '#333'
    }
  }

  return (
    <View className="order-page">
       <Tabs active={activeTab} onChange={({eventKey}) => setActiveTab(eventKey)} sticky className="order-tabs">
          <Tabs.TabPane title="全部" />
          <Tabs.TabPane title="待付款" />
          <Tabs.TabPane title="待入住" />
          <Tabs.TabPane title="待评价" />
       </Tabs>

       <View className="order-list">
          {orders.map(order => (
            <View key={order.id} className="order-card">
              <View className="header">
                 <Text className="h-name">{order.hotelName}</Text>
                 <Text className="status" style={{ color: getStatusColor(order.status) }}>
                   {order.status}
                 </Text>
              </View>
              
              <View className="content">
                 <Image src={order.image} mode="aspectFill" className="thumb" />
                 <View className="info">
                    <View className="row">
                       <Text className="label">入离</Text>
                       <Text className="val">{order.checkIn} 至 {order.checkOut}</Text>
                       <Text className="nights">1晚</Text>
                    </View>
                    <View className="row">
                       <Text className="label">房型</Text>
                       <Text className="val">{order.room}</Text>
                    </View>
                    <View className="row price-row">
                       <Text className="price">¥{order.price}</Text>
                    </View>
                 </View>
              </View>
              
              <View className="actions">
                 {order.status === '待入住' && (
                   <>
                     <Button size="small" variant="outlined">取消订单</Button>
                     <Button size="small" className="primary-btn">查看详情</Button>
                   </>
                 )}
                 {order.status === '已离店' && (
                   <Button size="small" variant="outlined">再次预订</Button>
                 )}
              </View>
            </View>
          ))}
       </View>
       
       <TabBar current={1} />
    </View>
  )
}
