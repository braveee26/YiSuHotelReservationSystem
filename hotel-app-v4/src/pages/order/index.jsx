
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Tabs } from '@taroify/core'
import './index.scss'

const Order = () => {
  return (
    <View className="order-page">
      <Tabs defaultValue={0}>
        <Tabs.TabPane title="全部">
            <View className="empty-state">暂无订单</View>
        </Tabs.TabPane>
        <Tabs.TabPane title="待支付">
             <View className="empty-state">暂无待支付订单</View>
        </Tabs.TabPane>
        <Tabs.TabPane title="待入住">
             <View className="empty-state">暂无待入住订单</View>
        </Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default Order
