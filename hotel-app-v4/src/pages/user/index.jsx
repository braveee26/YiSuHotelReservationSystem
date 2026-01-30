
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Cell, Image } from '@taroify/core'
import { Setting, User as UserIcon } from '@taroify/icons'
import Taro from '@tarojs/taro'
import './index.scss'

const User = () => {
  const goToContacts = () => {
    Taro.navigateTo({ url: '/pages/user/contacts/index' })
  }

  const goToSettings = () => {
    Taro.navigateTo({ url: '/pages/user/settings/index' })
  }

  return (
    <View className="user-page">
        <View className="user-header">
            <Image round width="64" height="64" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <Text className="user-name">Guest User</Text>
        </View>
        
        <Cell.Group>
            <Cell title="常用联系人" isLink onClick={goToContacts} />
            <Cell title="设置" icon={<Setting />} isLink onClick={goToSettings} />
        </Cell.Group>
    </View>
  )
}

export default User

