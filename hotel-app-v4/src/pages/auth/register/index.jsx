import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Input } from '@taroify/core'
import { FriendsOutlined, PhoneOutlined, LockOutlined, CommentOutlined } from '@taroify/icons'
import { register } from '../../../services/api'
import './index.scss'

export default function Register() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

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

  const handleRegister = async () => {
    if (!phone || phone.length !== 11) {
      return Taro.showToast({ title: '手机号格式错误', icon: 'none' })
    }
    if (!password || password.length < 6) {
      return Taro.showToast({ title: '密码至少6位', icon: 'none' })
    }
    if (password !== confirmPassword) {
      return Taro.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    }
    if (code !== '123456') {
      return Taro.showToast({ title: '验证码错误', icon: 'none' })
    }

    Taro.showLoading({ title: '建立您的账户...' })
    try {
      const res = await register({ phone, password })
      Taro.hideLoading()
      Taro.showToast({ title: '注册成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    } catch (error) {
      Taro.hideLoading()
      const errorMsg = error.response?.data?.error || error.message || '注册失败'
      Taro.showToast({ title: errorMsg, icon: 'none' })
    }
  }

  return (
    <View className="login-page">
      <Image
        className="bg-image"
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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

        <View className="register-content" style={{ marginTop: '40rpx', backgroundColor: 'rgba(255,255,255,0.95)', padding: '60rpx 40rpx', borderRadius: '40rpx' }}>
          <Text style={{ fontSize: '44rpx', fontWeight: '800', color: '#1e293b', marginBottom: '40rpx', display: 'block' }}>加入悠然会员</Text>

          <View style={{ marginBottom: '30rpx' }}>
            <Input
              className="custom-input"
              type="number"
              placeholder="手机号码"
              value={phone}
              onInput={(e) => setPhone(e.detail.value)}
              style={{ background: '#f8fafc', padding: '24rpx', borderRadius: '16rpx', border: '1rpx solid #e2e8f0' }}
            />
          </View>

          <View style={{ display: 'flex', gap: '20rpx', marginBottom: '30rpx' }}>
            <Input
              className="custom-input"
              type="number"
              placeholder="验证码 (123456)"
              value={code}
              onInput={(e) => setCode(e.detail.value)}
              style={{ flex: 1, background: '#f8fafc', padding: '24rpx', borderRadius: '16rpx', border: '1rpx solid #e2e8f0' }}
            />
            <Button
              size="small"
              disabled={countdown > 0}
              onClick={handleSendCode}
              style={{ width: '200rpx', height: '90rpx', borderRadius: '16rpx', background: '#385e72', color: '#fff' }}
            >
              {countdown > 0 ? `${countdown}s` : '获取'}
            </Button>
          </View>

          <View style={{ marginBottom: '30rpx' }}>
            <Input
              className="custom-input"
              password
              placeholder="设置登录密码 (≥6位)"
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
              style={{ background: '#f8fafc', padding: '24rpx', borderRadius: '16rpx', border: '1rpx solid #e2e8f0' }}
            />
          </View>

          <View style={{ marginBottom: '60rpx' }}>
            <Input
              className="custom-input"
              password
              placeholder="确认登录密码"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.detail.value)}
              style={{ background: '#f8fafc', padding: '24rpx', borderRadius: '16rpx', border: '1rpx solid #e2e8f0' }}
            />
          </View>

          <Button
            block
            shape="round"
            onClick={handleRegister}
            style={{ height: '100rpx', background: '#385e72', color: '#fff', fontSize: '32rpx', fontWeight: '800' }}
          >
            完成注册
          </Button>

          <View style={{ marginTop: '40rpx', textAlign: 'center' }}>
            <Text style={{ color: '#64748b', fontSize: '26rpx' }}>已经有账户？</Text>
            <Text
              style={{ color: '#385e72', fontSize: '26rpx', fontWeight: '800', marginLeft: '10rpx' }}
              onClick={() => Taro.navigateBack()}
            >
              去登录
            </Text>
          </View>
        </View>

        <View style={{ padding: '60rpx 0' }} />
      </View>
    </View>
  )
}
