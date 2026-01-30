import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button, Field, Cell } from '@taroify/core'
import Taro from '@tarojs/taro'
import './index.scss'

const Register = () => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    if (!phone || !code || !password) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }
    Taro.showToast({ title: '注册成功', icon: 'success' })
    setTimeout(() => {
      Taro.navigateBack()
    }, 1500)
  }

  const goToLogin = () => {
    Taro.navigateBack()
  }

  return (
    <View className="register-page">
      <View className="logo-area">
        <Text className="app-name">🏨 Hotel App</Text>
        <Text className="app-slogan">创建您的账号</Text>
      </View>
      
      <View className="register-form">
        <Cell.Group>
          <Field 
            label="手机号" 
            placeholder="请输入手机号" 
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.detail.value)}
          />
          <Field 
            label="验证码" 
            placeholder="请输入验证码"
            value={code}
            onChange={(e) => setCode(e.detail.value)}
          >
            <Button size="small" type="primary">获取验证码</Button>
          </Field>
          <Field 
            label="密码" 
            placeholder="请设置密码" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.detail.value)}
          />
        </Cell.Group>
        
        <View className="btn-area">
          <Button block type="primary" onClick={handleRegister}>注册</Button>
        </View>
        
        <View className="login-link" onClick={goToLogin}>
          <Text>已有账号？立即登录</Text>
        </View>
      </View>
    </View>
  )
}

export default Register
