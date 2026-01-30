
import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

// 极简测试版本 - 排除所有第三方组件
console.log('🔥 [Global] home/index.jsx loaded!')

const Home = () => {
  console.log('🏠 [Home] Component rendering...')
  return (
    <View className="home-page">
      <Text>Hello, 这是首页测试!</Text>
      <View style={{ padding: '20px', background: '#fff', marginTop: '10px' }}>
        <Text>如果你能看到这段文字，说明页面渲染正常。</Text>
      </View>
    </View>
  )
}

export default Home
