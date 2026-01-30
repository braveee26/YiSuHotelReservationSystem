import React from 'react'
import { View, Text } from '@tarojs/components'
import { Cell } from '@taroify/core'
import './index.scss'

const Contacts = () => {
  return (
    <View className="contacts-page">
      <Cell.Group title="常用联系人">
        <Cell title="张三" brief="138****1234" />
        <Cell title="李四" brief="139****5678" />
      </Cell.Group>
      
      <View style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
        <Text>点击添加更多联系人</Text>
      </View>
    </View>
  )
}

export default Contacts
