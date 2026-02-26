import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useTabStore } from '../../store/tabStore'
import './index.scss'

// Import icons (SVG format)
import homeIcon from '../../assets/tab/tab-home.svg'
import homeActiveIcon from '../../assets/tab/tab-home-active.svg'
import likeIcon from '../../assets/tab/tab-like.svg'
import likeActiveIcon from '../../assets/tab/tab-like-active.svg'
import msgIcon from '../../assets/tab/tab-message.svg'
import msgActiveIcon from '../../assets/tab/tab-message-active.svg'
import reviewIcon from '../../assets/tab/tab-review.svg'
import reviewActiveIcon from '../../assets/tab/tab-review-active.svg'
import userIcon from '../../assets/tab/tab-user.svg'
import userActiveIcon from '../../assets/tab/tab-user-active.svg'

const tabList = [
  { title: '首页', icon: homeIcon, activeIcon: homeActiveIcon, path: '/pages/home/index', id: 0 },
  { title: '收藏', icon: likeIcon, activeIcon: likeActiveIcon, path: '/pages/sub-main/favorites/index', id: 1 },
  { title: '消息', icon: msgIcon, activeIcon: msgActiveIcon, path: '/pages/sub-main/messages/index', id: 2 },
  { title: '点评', icon: reviewIcon, activeIcon: reviewActiveIcon, path: '/pages/sub-main/reviews/index', id: 3 },
  { title: '我的', icon: userIcon, activeIcon: userActiveIcon, path: '/pages/user/index', id: 4 },
]

const CustomTabBar = () => {
  // 直接从 Zustand store 读取当前选中的 index
  const { activeTab, setActiveTab } = useTabStore()

  const handleSwitch = (index, path) => {
    if (activeTab === index) return
    // 1. 更新 Zustand 状态
    setActiveTab(index)
    // 2. 路由跳转 (使用 redirectTo 避免页面栈过深)
    Taro.redirectTo({ url: path }) 
  }

  // 计算滑块位置: 20% 宽度每个 Tab
  const sliderStyle = {
    left: `${activeTab * 20}%`, 
  }

  return (
    <View className="tab-bar-container">
      {/* 顶部滑动色条 */}
      <View className="slider-track">
        <View className="slider-indicator" style={sliderStyle} />
      </View>

      <View className="tab-bar-wrap">
        {tabList.map((item, index) => {
          const isActive = activeTab === index
          return (
            <View 
              key={index} 
              className={`tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleSwitch(index, item.path)}
            >
              <View className="icon-box">
                <Image 
                  src={isActive ? item.activeIcon : item.icon} 
                  className="tab-icon" 
                  mode="aspectFit" 
                />
              </View>
              <Text className="tab-text">{item.title}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default CustomTabBar
