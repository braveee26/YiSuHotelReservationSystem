import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

const PageFadeIn = ({ children }) => {
  return (
    <View className="page-fade-in">
      {children}
    </View>
  )
}

export default PageFadeIn
