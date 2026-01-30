
import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button, Field, Cell } from '@taroify/core'
import Taro from '@tarojs/taro'
import './index.scss'

const Booking = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = () => {
      Taro.showToast({ title: '订单提交成功', icon: 'success' })
      setTimeout(() => {
          Taro.switchTab({ url: '/pages/order/index' })
      }, 1500)
  }

  return (
    <View className="booking-page">
      <View className="room-info">
          <Text className="hotel-name">Luxury Hotel</Text>
          <Text className="room-type">Deluxe Room</Text>
          <Text className="date-info">2023-10-01 至 2023-10-03 (2晚)</Text>
      </View>
      
      <View className="form-container">
          <Cell.Group title="入住信息">
            <Field 
                label="入住人" 
                placeholder="请输入姓名" 
                value={name} 
                onChange={(e) => setName(e.detail.value)}
            />
            <Field 
                label="手机号" 
                placeholder="用于接收通知" 
                type="number"
                value={phone} 
                onChange={(e) => setPhone(e.detail.value)}
            />
          </Cell.Group>
      </View>
      
      <View className="footer-bar">
          <View className="price-total">¥798</View>
          <Button type="primary" onClick={handleSubmit}>提交订单</Button>
      </View>
    </View>
  )
}

export default Booking
