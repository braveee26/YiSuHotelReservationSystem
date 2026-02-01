import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

// 导入新图标
import homeIcon from '../../assets/tab/tab-home.png'
import homeActiveIcon from '../../assets/tab/tab-home-active.png'
import likeIcon from '../../assets/tab/tab-like.png'
import likeActiveIcon from '../../assets/tab/tab-like-active.png'
import messageIcon from '../../assets/tab/tab-message.png'
import messageActiveIcon from '../../assets/tab/tab-message-active.png'
import reviewIcon from '../../assets/tab/tab-review.png'
import reviewActiveIcon from '../../assets/tab/tab-review-active.png'
import userIcon from '../../assets/tab/tab-user.png'
import userActiveIcon from '../../assets/tab/tab-user-active.png'

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
      pagePath: '/pages/sub-main/favorites/index',
      text: '收藏',
      icon: likeIcon,
      selectedIcon: likeActiveIcon,
      index: 1
    },
    {
      pagePath: '/pages/sub-main/messages/index',
      text: '消息',
      icon: messageIcon,
      selectedIcon: messageActiveIcon,
      index: 2
    },
    {
      pagePath: '/pages/sub-main/reviews/index',
      text: '点评',
      icon: reviewIcon,
      selectedIcon: reviewActiveIcon,
      index: 3
    },
    {
      pagePath: '/pages/user/index',
      text: '我的',
      icon: userIcon,
      selectedIcon: userActiveIcon,
      index: 4
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
