import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Input, Popup, Tabs } from '@taroify/core'
import { FriendsOutlined, PhoneOutlined, CommentOutlined, LockOutlined } from '@taroify/icons'
import useAuthStore from '../../../store/auth'
import './index.scss'

export default function Login() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginMethod, setLoginMethod] = useState('password') // 'password' or 'code'
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  const loginWithCredentials = useAuthStore(state => state.loginWithCredentials)

  const handleSendCode = () => {
    if (phone.length === 11) {
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      Taro.showToast({ title: '验证码已发送 (123456)', icon: 'none' })
    } else {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
    }
  }

  const handleLogin = async () => {
    if (!phone || phone.length !== 11) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }

    const params = { phone, method: loginMethod }
    if (loginMethod === 'password') {
      if (!password) return Taro.showToast({ title: '请输入密码', icon: 'none' })
      params.password = password
    } else {
      if (!code) return Taro.showToast({ title: '请输入验证码', icon: 'none' })
      params.code = code
    }

    Taro.showLoading({ title: '安全连接中...' })
    const result = await loginWithCredentials(params)
    Taro.hideLoading()

    if (result.success) {
      Taro.showToast({ title: '欢迎回来', icon: 'success' })
      setTimeout(() => {
        Taro.redirectTo({ url: '/pages/home/index' })
      }, 1500)
    } else {
      Taro.showToast({ title: result.error, icon: 'none' })
    }
  }

  const goToRegister = () => {
    Taro.navigateTo({ url: '/pages/auth/register/index' })
  }

  return (
    <View className="login-page">
      <Image
        className="bg-image"
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        mode="aspectFill"
      />
      <View className="bg-overlay" />

      <View className="content-container">
        <View className="logo-section">
          <View className="logo-box">
            <FriendsOutlined size="24" color="#385e72" />
          </View>
          <Text className="app-name">悠然酒店</Text>
        </View>

        <View className="hero-text">
          <Text className="title">开启您的{'\n'}奢华旅程</Text>
          <Text className="subtitle">精选全球高端酒店，为您提供独一无二的定制化住宿体验</Text>
        </View>

        <View className="action-buttons">
          <Button
            className="btn-register"
            block
            shape="round"
            onClick={() => setShowLoginModal(true)}
          >
            登 录
          </Button>

          <View className="login-link">
            <Text className="login-text">还没有账号？</Text>
            <Text className="login-btn" onClick={goToRegister}>立即注册</Text>
          </View>
        </View>
      </View>

      <Popup
        open={showLoginModal}
        rounded
        placement="bottom"
        onClose={() => setShowLoginModal(false)}
        className="login-popup"
      >
        <View className="popup-content">
          <View className="popup-header">
            <Text className="title">身份验证</Text>
          </View>

          <View className="form-container">
            <View className="method-toggle">
              <Text
                className={`method-item ${loginMethod === 'password' ? 'active' : ''}`}
                onClick={() => setLoginMethod('password')}
              >
                密码验证
              </Text>
              <Text
                className={`method-item ${loginMethod === 'code' ? 'active' : ''}`}
                onClick={() => setLoginMethod('code')}
              >
                短信验证
              </Text>
            </View>

            <View className="input-group">
              <Input
                type="number"
                placeholder="手机号码"
                value={phone}
                onChange={(e) => setPhone(e.detail.value)}
              />
            </View>

            {loginMethod === 'password' ? (
              <View className="input-group">
                <Input
                  password
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.detail.value)}
                />
              </View>
            ) : (
              <View className="input-group code-group">
                <Input
                  type="number"
                  placeholder="验证码 (123456)"
                  value={code}
                  onChange={(e) => setCode(e.detail.value)}
                />
                <Button
                  size="small"
                  variant="text"
                  disabled={countdown > 0}
                  onClick={handleSendCode}
                  style={{ color: '#385e72', fontWeight: '800' }}
                >
                  {countdown > 0 ? `${countdown}s` : '获取'}
                </Button>
              </View>
            )}

            <Button
              block
              shape="round"
              className="submit-btn"
              onClick={handleLogin}
            >
              确 定
            </Button>
          </View>
        </View>
      </Popup>
    </View>
  )
}
