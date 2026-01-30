import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

// 导入图标
import homeIcon from '../../assets/tab-home.png'
import homeActiveIcon from '../../assets/tab-home-active.png'
import orderIcon from '../../assets/tab-order.png'
import orderActiveIcon from '../../assets/tab-order-active.png'
import userIcon from '../../assets/tab-user.png'
import userActiveIcon from '../../assets/tab-user-active.png'

const TabBar = ({ current }) => {
  const tabs = [
    {
      pagePath: '/pages/home/index',
      text: '首页',
      icon: homeIcon,
      selectedIcon: homeActiveIcon,
      index: 0
    },
    {
      pagePath: '/pages/order/index',
      text: '订单',
      icon: orderIcon,
      selectedIcon: orderActiveIcon,
      index: 1
    },
    {
      pagePath: '/pages/user/index',
      text: '我的',
      icon: userIcon,
      selectedIcon: userActiveIcon,
      index: 2
    }
  ]

  const switchTab = (item) => {
    if (current === item.index) return
    // 由于禁用了原生 tabBar，必须使用 redirectTo 或 reLaunch
    Taro.redirectTo({
      url: item.pagePath
    })
  }

  return (
    <View className="custom-tab-bar">
      {tabs.map((item, index) => (
        <View 
          key={index} 
          className={`tab-item ${current === item.index ? 'active' : ''}`}
          onClick={() => switchTab(item)}
        >
          <Image 
            className="tab-icon" 
            src={current === item.index ? item.selectedIcon : item.icon} 
          />
          <Text className="tab-text">{item.text}</Text>
        </View>
      ))}
    </View>
  )
}

export default TabBar
