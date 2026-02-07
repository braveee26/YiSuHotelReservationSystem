import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Input, Checkbox, CheckboxGroup } from '@tarojs/components'
import { Button, Cell, CellGroup } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import useSearchStore from '../../../store/search'
import './index.scss'

export default function Booking() {
  const { searchParams } = useSearchStore()
  
  // Mock Room Info (In real app, pass via router params or store)
  const room = {
    name: '豪华双床房',
    tags: ['35㎡', '双床', '含早'],
    price: 850,
    cancellation: '2月14日18:00前免费取消'
  }

  const [guestName, setGuestName] = useState('张三')
  const [guestPhone, setGuestPhone] = useState('138****8888')
  const [showCostDetail, setShowCostDetail] = useState(false)

  const totalPrice = room.price * searchParams.nights * searchParams.rooms

  const handleSubmit = () => {
     Taro.showLoading({ title: '提交中...' })
     setTimeout(() => {
       Taro.hideLoading()
       Taro.showToast({ title: '预订成功', icon: 'success' })
       setTimeout(() => {
         Taro.redirectTo({ url: '/pages/order/index' })
       }, 1500)
     }, 1000)
  }

  return (
    <View className="booking-page">
      {/* Hotel Info Card */}
      <View className="info-card">
        <View className="hotel-name">大阪皇家花园酒店</View>
        <View className="date-row">
           <Text className="date">2月15日 - 2月16日</Text>
           <Text className="nights">共{searchParams.nights}晚</Text>
        </View>
        <View className="room-info">
           <Text className="r-name">{room.name}</Text>
           <Text className="r-tags">{room.tags.join(' | ')}</Text>
        </View>
        <View className="cancel-policy">
           <Text className="icon">✓</Text>
           <Text>{room.cancellation}</Text>
        </View>
      </View>

      {/* Guest Form */}
      <View className="form-card">
         <View className="form-item">
            <Text className="label">住客姓名</Text>
            <Input 
              className="input" 
              value={guestName} 
              onInput={e => setGuestName(e.detail.value)}
              placeholder="请输入姓名"
            />
         </View>
         <View className="form-item">
            <Text className="label">联系手机</Text>
            <Input 
              className="input" 
              value={guestPhone} 
              onInput={e => setGuestPhone(e.detail.value)}
              placeholder="用于接收确认短信"
            />
         </View>
         <View className="form-item">
            <Text className="label">预计到店</Text>
            <Text className="val">15:00</Text>
            <ArrowRight color="#999" />
         </View>
      </View>

      {/* Footer (Price & Submit) */}
      <View className="booking-bar">
         <View className="price-info" onClick={() => setShowCostDetail(!showCostDetail)}>
            <Text className="total-label">总价</Text>
            <Text className="currency">¥</Text>
            <Text className="amount">{totalPrice}</Text>
            <Text className="detail-link">明细</Text>
         </View>
         <Button 
           className="submit-btn" 
           color="#047857" 
           shape="round"
           onClick={handleSubmit}
         >
           提交订单
         </Button>
      </View>
    </View>
  )
}
