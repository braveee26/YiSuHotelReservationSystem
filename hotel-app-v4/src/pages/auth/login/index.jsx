import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Input, Popup, Tabs } from '@taroify/core'
import { FriendsOutlined, PhoneOutlined, CommentOutlined } from '@taroify/icons'
import useAuthStore from '../../../store/auth'
import './index.scss'

export default function Login() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeTab, setActiveTab] = useState(0) // 0: Login, 1: Register
  const [loginMethod, setLoginMethod] = useState('password') // 'password' or 'code'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  console.log('✅ [Login] Component rendering...')
  
  const loginWithCredentials = useAuthStore(state => state.loginWithCredentials)

  const handleSendCode = () => {
    if (username.length >= 3) {
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
    } else {
      Taro.showToast({ title: '请输入用户名', icon: 'none' })
    }
  }

  const handleLogin = async () => {
    if (!username) {
      Taro.showToast({ title: '请输入用户名', icon: 'none' })
      return
    }
    if (!password) {
      Taro.showToast({ title: '请输入密码', icon: 'none' })
      return
    }
    
    // Real login API call
    Taro.showLoading({ title: '登录中...' })
    const result = await loginWithCredentials(username, password)
    Taro.hideLoading()
    
    if (result.success) {
      Taro.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => {
        Taro.redirectTo({ url: '/pages/home/index' })
      }, 1500)
    } else {
      Taro.showToast({ title: result.error || '登录失败', icon: 'none' })
    }
  }

  // Test login - directly go to home
  const handleTestLogin = () => {
    Taro.redirectTo({ url: '/pages/home/index' })
  }

  return (
    <View className="login-page">
      {/* Background Image */}
      <Image
        className="bg-image"
        src="https://images.unsplash.com/photo-1707648496492-38255a8f1877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwYmx1ZXxlbnwxfHx8fDE3Njk5MjI0Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
        mode="aspectFill"
      />
      <View className="bg-overlay" />

      {/* Content */}
      <View className="content-container">
        {/* Logo */}
        <View className="logo-section">
          <View className="logo-box">
            <FriendsOutlined size="24" color="#385e72" />
          </View>
          <Text className="app-name">悠然酒店</Text>
        </View>

        {/* Text */}
        <View className="hero-text">
          <Text className="title">找到您最喜欢的{'\n'}酒店入住</Text>
          <Text className="subtitle">轻松找到您的酒店，随心所欲{'\n'}去任何想去的地方</Text>
        </View>

        {/* Buttons */}
        <View className="action-buttons">
          <Button 
            className="btn-register" 
            block 
            shape="round" 
            style={{ backgroundColor: '#b7cfdc' }}
            onClick={() => { setActiveTab(1); setShowLoginModal(true); }}
          >
            <Text style={{ color: '#385e72', fontWeight: 'bold' }}>注册</Text>
          </Button>
          
          <View className="login-link">
            <Text className="login-text">已有账号？</Text>
            <Text 
              className="login-btn"
              onClick={() => { setActiveTab(0); setShowLoginModal(true); }}
            >
              登录
            </Text>
          </View>
          
          <Button 
            className="btn-test" 
            block 
            shape="round" 
            color="#047857"
            onClick={handleTestLogin}
          >
            测试登录（跳过验证）
          </Button>
        </View>
      </View>

      {/* Login/Register Popup */}
      <Popup 
        open={showLoginModal} 
        rounded 
        placement="bottom" 
        onClose={() => setShowLoginModal(false)}
        className="login-popup"
      >
        <Popup.Close />
        <View className="popup-content">
          <View className="popup-header">
            <Text className="title">{activeTab === 0 ? '登录' : '注册'}</Text>
          </View>
          
          <Tabs active={activeTab} onChange={({eventKey}) => setActiveTab(eventKey)} className="auth-tabs">
            <Tabs.TabPane title="登录">
              <View className="form-container">
                <View className="method-toggle">
                  <Text 
                    className={`method-item ${loginMethod === 'password' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('password')}
                  >
                    密码登录
                  </Text>
                  <Text 
                    className={`method-item ${loginMethod === 'code' ? 'active' : ''}`}
                    onClick={() => setLoginMethod('code')}
                  >
                    验证码登录
                  </Text>
                </View>

                <View className="input-group">
                  <Input 
                    placeholder="请输入用户名" 
                    value={username} 
                    onChange={(e) => setUsername(e.detail.value)}
                    prefix={<FriendsOutlined />}
                  />
                </View>

                {loginMethod === 'password' && (
                  <View className="input-group">
                    <Input 
                      password 
                      placeholder="请输入密码" 
                      value={password} 
                      onChange={(e) => setPassword(e.detail.value)}
                      // prefix={<Lock />}
                    />
                  </View>
                )}

                {loginMethod === 'code' && (
                  <View className="input-group code-group">
                    <Input 
                      placeholder="请输入验证码" 
                      value={code} 
                      onChange={(e) => setCode(e.detail.value)}
                      prefix={<CommentOutlined />}
                    />
                    <Button 
                      size="small" 
                      color="#d9e4ec" 
                      disabled={countdown > 0}
                      onClick={handleSendCode}
                    >
                      <Text style={{ color: '#385e72' }}>
                        {countdown > 0 ? `${countdown}s` : '获取验证码'}
                      </Text>
                    </Button>
                  </View>
                )}

                <Button 
                  block 
                  shape="round" 
                  color="#385e72" 
                  className="submit-btn"
                  onClick={handleLogin}
                >
                  登录
                </Button>
              </View>
            </Tabs.TabPane>
            
            <Tabs.TabPane title="注册">
              <View className="form-container">
                <View className="input-group">
                  <Input 
                    placeholder="请输入用户名" 
                    value={username} 
                    onChange={(e) => setUsername(e.detail.value)}
                    prefix={<FriendsOutlined />}
                  />
                </View>
                 <View className="input-group code-group">
                    <Input 
                      placeholder="请输入验证码" 
                      value={code} 
                      onChange={(e) => setCode(e.detail.value)}
                      prefix={<CommentOutlined />}
                    />
                    <Button 
                      size="small" 
                      color="#d9e4ec" 
                      disabled={countdown > 0}
                      onClick={handleSendCode}
                    >
                      <Text style={{ color: '#385e72' }}>
                        {countdown > 0 ? `${countdown}s` : '获取验证码'}
                      </Text>
                    </Button>
                  </View>
                  <Button 
                  block 
                  shape="round" 
                  color="#385e72" 
                  className="submit-btn"
                  onClick={handleLogin}
                >
                  注册
                </Button>
              </View>
            </Tabs.TabPane>
          </Tabs>
        </View>
      </Popup>
    </View>
  )
}
