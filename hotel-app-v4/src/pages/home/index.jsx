
import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

import TabBar from '../../components/TabBar'

// 极简测试版本 - 排除所有第三方组件
console.log('🔥 [Global] home/index.jsx loaded!')

const Home = () => {
  console.log('🏠 [Home] Component rendering...')
  try {
    return (
      <View className="home-page" style={{ paddingBottom: '60px' }}>
      <Text>Hello, 这是首页测试!</Text>
      <View style={{ padding: '20px', background: '#fff', marginTop: '10px' }}>
        <Text>如果你能看到这段文字，说明页面渲染正常。</Text>
      </View>
      <TabBar current={0} />
    </View>
    )
  } catch (err) {
    console.error('❌ [Home] Render error:', err)
    return <View>Home Render Error: {err.message}</View>
  }
}

export default Home
