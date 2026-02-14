import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Input } from '@taroify/core'
import { PhoneOutlined, LockOutlined, CommentOutlined } from '@taroify/icons'
import logoSvg from '../../../assets/login/logo.svg'
import { register } from '../../../services/api'
import CustomNavBar from '../../../components/CustomNavBar'
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
        {/* 优化后的顶部区域 */}
        <View className="logo-section">
          <View className="logo-box">
            <Image src={logoSvg} className="logo-img" mode="aspectFit" />
          </View>
          <Text className="app-name">悠然酒店</Text>
          <Text className="app-slogan">尊享品质住宿体验</Text>
        </View>

        {/* 优化后的表单区域 */}
        <View className="register-content">
          <Text className="form-title">加入悠然会员</Text>

          {/* 手机号输入 */}
          <View className="input-wrapper">
            <Input
              className="custom-input"
              type="number"
              placeholder="手机号码"
              value={phone}
              onInput={(e) => setPhone(e.detail.value)}
            />
          </View>

          {/* 验证码输入 */}
          <View className="code-wrapper">
            <View className="input-wrapper flex-1">
              <Input
                className="custom-input"
                type="number"
                placeholder="验证码 (123456)"
                value={code}
                onInput={(e) => setCode(e.detail.value)}
              />
            </View>
            <Button
              size="small"
              disabled={countdown > 0}
              onClick={handleSendCode}
              className="code-btn"
            >
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </Button>
          </View>

          {/* 密码输入 */}
          <View className="input-wrapper">
            <Input
              className="custom-input"
              password
              placeholder="设置登录密码 (≥6位)"
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
            />
          </View>

          {/* 确认密码输入 */}
          <View className="input-wrapper">
            <Input
              className="custom-input"
              password
              placeholder="确认登录密码"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.detail.value)}
            />
          </View>

          {/* 注册按钮 */}
          <Button
            block
            shape="round"
            onClick={handleRegister}
            className="register-btn"
          >
            完成注册
          </Button>

          {/* 底部链接 */}
          <View className="footer-links">
            <Text className="footer-text">已经有账户?</Text>
            <Text
              className="link-text"
              onClick={() => Taro.navigateBack()}
            >
              去登录
            </Text>
          </View>
        </View>

        <View className="bottom-spacer" />
      </View>
    </View>
  )
}