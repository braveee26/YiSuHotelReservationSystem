import React, { useState } from 'react'
import { View, Text } from '@tarojs/components'
import { Button, Field, Cell } from '@taroify/core'
import Taro from '@tarojs/taro'
import './index.scss'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const handleLogin = () => {
    if (!phone || !code) {
      Taro.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }
    Taro.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      Taro.switchTab({ url: '/pages/home/index' })
    }, 1500)
  }

  const goToRegister = () => {
    Taro.navigateTo({ url: '/pages/auth/register/index' })
  }

  return (
    <View className="login-page">
      <View className="logo-area">
        <Text className="app-name">🏨 Hotel App</Text>
        <Text className="app-slogan">您的旅途好帮手</Text>
      </View>
      
      <View className="login-form">
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
        </Cell.Group>
        
        <View className="btn-area">
          <Button block type="primary" onClick={handleLogin}>登录</Button>
        </View>
        
        <View className="register-link" onClick={goToRegister}>
          <Text>没有账号？立即注册</Text>
        </View>
        
        <View className="test-btn">
          <Button block variant="outlined" onClick={() => Taro.switchTab({ url: '/pages/home/index' })}>
            🧪 测试入口（跳过登录）
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Login

