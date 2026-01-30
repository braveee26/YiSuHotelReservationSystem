import React from 'react'
import { View } from '@tarojs/components'
import { Cell, Switch } from '@taroify/core'
import './index.scss'

const Settings = () => {
  return (
    <View className="settings-page">
      <Cell.Group title="通知设置">
        <Cell title="订单通知" rightIcon={<Switch size={20} />} />
        <Cell title="优惠推送" rightIcon={<Switch size={20} />} />
      </Cell.Group>
      
      <Cell.Group title="其他">
        <Cell title="清除缓存" isLink />
        <Cell title="关于我们" isLink />
        <Cell title="退出登录" isLink />
      </Cell.Group>
    </View>
  )
}

export default Settings
