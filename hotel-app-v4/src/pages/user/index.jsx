
import React from 'react'
import { View, Text } from '@tarojs/components'
import { Cell, Image } from '@taroify/core'
import { Setting, User as UserIcon } from '@taroify/icons'
import Taro from '@tarojs/taro'
import './index.scss'

import TabBar from '../../components/TabBar'

const User = () => {
  const goToContacts = () => {
    Taro.navigateTo({ url: '/pages/user/contacts/index' })
  }

  const goToSettings = () => {
    Taro.navigateTo({ url: '/pages/user/settings/index' })
  }

  return (
    <View className="user-page" style={{ paddingBottom: '60px' }}>
      <View className="user-header">
        <Image
          shape="circle"
          width="64"
          height="64"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23e0e0e0'/%3E%3Ccircle cx='32' cy='24' r='8' fill='%23999'/%3E%3Cpath d='M 20 45 Q 20 35, 32 35 Q 44 35, 44 45' fill='%23999'/%3E%3C/svg%3E"
          onError={(e) => {
            // 静默处理图片加载错误
            e.target.style.display = 'none';
          }}
        />
        <Text className="user-name">Guest User</Text>
      </View>

      <Cell.Group>
        <Cell title="常用联系人" isLink onClick={goToContacts} />
        <Cell title="设置" icon={<Setting />} isLink onClick={goToSettings} />
      </Cell.Group>
      <TabBar current={2} />
    </View>
  )
}

export default User

