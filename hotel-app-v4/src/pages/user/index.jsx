import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import { ArrowRight } from '@taroify/icons'
import useAuthStore from '../../store/auth'
import { updateUserProfile } from '../../services/api'
import CustomTabBar from '../../components/CustomTabBar'
import PageFadeIn from '../../components/PageFadeIn'
import logoSvg from '../../assets/login/logo.svg'
import './index.scss'

export default function User() {
  const { userInfo, logout, isLoggedIn, updateUserInfo } = useAuthStore()
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Initialize edit form from userInfo
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '不透露'
  })

  // Update form when userInfo changes
  useEffect(() => {
    if (userInfo) {
      setEditForm({
        name: userInfo.real_name || userInfo.user_name || '',
        email: userInfo.email || '',
        phone: userInfo.phone ? maskPhone(userInfo.phone) : '',
        gender: '不透露'
      })
    }
  }, [userInfo])

  // Mask phone number for display
  const maskPhone = (phone) => {
    if (!phone || phone.length < 7) return phone
    return phone.slice(0, 3) + '****' + phone.slice(-4)
  }

  // Redirect to login if not logged in
  /* useEffect(() => {
    if (!isLoggedIn) {
      Taro.showToast({ title: '请先登录', icon: 'none' })
      setTimeout(() => {
        Taro.navigateTo({ url: '/pages/auth/login/index' })
      }, 1000)
    }
  }, [isLoggedIn]) */

  const [guests, setGuests] = useState([
    { id: 1, name: '张三', idCard: '1101011990****1234', phone: '138****8888' },
    { id: 2, name: '李四', idCard: '1101011992****5678', phone: '139****9999' }
  ])

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          logout()
          Taro.reLaunch({ url: '/pages/auth/login/index' })
        }
      }
    })
  }

  const handleSaveProfile = async () => {
    if (!userInfo?.user_id) return

    setSaving(true)
    Taro.showLoading({ title: '保存中...' })

    try {
      const response = await updateUserProfile(userInfo.user_id, {
        real_name: editForm.name,
        email: editForm.email
        // Add other fields if needed
      })

      if (response && response.user) {
        // Update local state and global store
        updateUserInfo(response.user)
        setIsEditing(false)
        Taro.showToast({ title: '保存成功', icon: 'success' })
      } else {
        throw new Error('Update failed')
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
      Taro.showToast({ title: '保存失败', icon: 'none' })
    } finally {
      setSaving(false)
      Taro.hideLoading()
    }
  }

  const tabs = ['个人信息', '常用入住人', '订单', '设置']
  const orderFilters = ['全部', '待入住', '待评价', '历史订单', '退款/售后']
  const [activeOrderFilter, setActiveOrderFilter] = useState(0)

  const mockOrders = [
    {
      id: 1,
      hotelName: '宜宿精品酒店 (上海店)',
      roomType: '豪华大床房',
      date: '2024-02-15 至 2024-02-16',
      price: 588,
      status: '待入住',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=300&h=200'
    },
    {
      id: 2,
      hotelName: '宜宿度假村 (南京店)',
      roomType: '湖景双人房',
      date: '2024-01-10 至 2024-01-12',
      price: 1280,
      status: '历史订单',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?fit=crop&w=300&h=200'
    }
  ]

  return (
    <>
      <PageFadeIn>
        <View className="user-page">
          {!isLoggedIn ? (
            // Guest View - Full Screen
            <View className="guest-full-page">
              <View className="guest-container">
                <Image src={logoSvg} className="guest-logo" mode="aspectFit" />
                <Text className="guest-text">登录以享受更多权益</Text>
                <Button
                  className="guest-login-btn"
                  onClick={() => Taro.navigateTo({ url: '/pages/auth/login/index' })}
                >
                  立即登录 / 注册
                </Button>
              </View>
            </View>
          ) : (
            <>
              {/* Logged-in User View */}
              <View className="user-bg-gradient"></View>

              {/* Header */}
              <View className="user-header">
                <View className="header-nav">
                  <Text className="header-title">个人中心</Text>
                </View>

                <View className="user-profile-card">
                  <View className="avatar-box">
                    <Image className="avatar-img" src={userInfo?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=100&h=100"} />
                  </View>
                  <View className="user-info">
                    <Text className="name">{userInfo?.real_name || userInfo?.user_name || '用户'}</Text>
                    <Text className="email">{userInfo?.email || '未设置邮箱'}</Text>
                  </View>
                  <View className="vip-tag">
                    <Text className="vip-text">尊享会员</Text>
                  </View>
                </View>
              </View>

              {/* Custom Tabs */}
              <View className="tabs-container">
                <View className="custom-tabs">
                  {tabs.map((tab, idx) => (
                    <View
                      key={idx}
                      className={`tab-item ${activeTab === idx ? 'active' : ''}`}
                      onClick={() => setActiveTab(idx)}
                    >
                      <Text className="tab-text">{tab}</Text>
                      <View className="active-line"></View>
                    </View>
                  ))}
                </View>

                <View className="tab-content">
                  {activeTab === 0 && (
                    <View className="content-card">
                      <View className="section-header">
                        <Text className="title">基本信息</Text>
                        {!isEditing && (
                          <View className="edit-trigger" onClick={() => setIsEditing(true)}>
                            <Text>编辑资料</Text>
                          </View>
                        )}
                      </View>

                      <View className="info-list">
                        <View className="info-item">
                          <Text className="label">我的姓名</Text>
                          {isEditing ? (
                            <Input
                              className="input-field"
                              value={editForm.name}
                              onInput={e => setEditForm({ ...editForm, name: e.detail.value })}
                            />
                          ) : (
                            <Text className="val">{editForm.name}</Text>
                          )}
                        </View>
                        <View className="info-item">
                          <Text className="label">电子邮箱</Text>
                          {isEditing ? (
                            <Input
                              className="input-field"
                              value={editForm.email}
                              onInput={e => setEditForm({ ...editForm, email: e.detail.value })}
                            />
                          ) : (
                            <Text className="val">{editForm.email}</Text>
                          )}
                        </View>
                        <View className="info-item">
                          <Text className="label">手机号码</Text>
                          <Text className="val">{editForm.phone}</Text>
                        </View>
                        <View className="info-item">
                          <Text className="label">性别信息</Text>
                          <Text className="val">{editForm.gender}</Text>
                        </View>
                      </View>

                      {isEditing && (
                        <View className="edit-footer">
                          <Button
                            className="cancel-btn"
                            onClick={() => setIsEditing(false)}
                            disabled={saving}
                          >
                            取消
                          </Button>
                          <Button
                            className="save-btn-new"
                            loading={saving}
                            onClick={handleSaveProfile}
                          >
                            确认保存
                          </Button>
                        </View>
                      )}
                    </View>
                  )}

                  {activeTab === 1 && (
                    <View className="guest-section">
                      <View className="guest-list">
                        {guests.map(guest => (
                          <View key={guest.id} className="guest-card">
                            <View className="g-avatar">
                              <Text>{guest.name.charAt(0)}</Text>
                            </View>
                            <View className="g-info">
                              <View className="g-header">
                                <Text className="g-name">{guest.name}</Text>
                                <Text className="g-phone">{guest.phone}</Text>
                              </View>
                              <Text className="g-id">证件: {guest.idCard}</Text>
                            </View>
                            <View className="g-action">
                              <Text className="edit-btn">编辑</Text>
                            </View>
                          </View>
                        ))}
                        <View className="add-guest-card">
                          <Text className="plus">+</Text>
                          <Text>新增常用入住人</Text>
                        </View>
                      </View>
                    </View>
                  )}

                  {activeTab === 2 && (
                    <View className="order-section">
                      <View className="order-filters">
                        {orderFilters.map((filter, index) => (
                          <View
                            key={index}
                            className={`filter-item ${activeOrderFilter === index ? 'active' : ''}`}
                            onClick={() => setActiveOrderFilter(index)}
                          >
                            <Text>{filter}</Text>
                          </View>
                        ))}
                      </View>

                      <View className="order-list">
                        {mockOrders.map(order => (
                          <View key={order.id} className="order-card-new">
                            <View className="order-card-header">
                              <Text className="hotel-name">{order.hotelName}</Text>
                              <Text className={`status ${order.status === '待入住' ? 'primary' : ''}`}>{order.status}</Text>
                            </View>
                            <View className="order-card-body">
                              <Image className="hotel-img" src={order.image} mode="aspectFill" />
                              <View className="order-details">
                                <Text className="room-type">{order.roomType}</Text>
                                <Text className="order-date">{order.date}</Text>
                                <View className="price-box">
                                  <Text className="currency">¥</Text>
                                  <Text className="amount">{order.price}</Text>
                                </View>
                              </View>
                            </View>
                            <View className="order-card-footer">
                              <View className="action-btn secondary">
                                <Text>联系酒店</Text>
                              </View>
                              <View className="action-btn primary">
                                <Text>{order.status === '待入住' ? '查看详情' : '再次预订'}</Text>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {activeTab === 3 && (
                    <View className="settings-section">
                      <View className="settings-list-card">
                        {[
                          { label: '账户与安全', icon: '🔒' },
                          { label: '通知设置', icon: '🔔' },
                          { label: '清除缓存', icon: '🧹' },
                          { label: '关于宜宿', icon: 'ℹ️' },
                          { label: '帮助与反馈', icon: '💬' }
                        ].map((item, id) => (
                          <View key={id} className="setting-row">
                            <View className="row-left">
                              <Text className="row-icon">{item.icon}</Text>
                              <Text className="row-label">{item.label}</Text>
                            </View>
                            <ArrowRight color="#CCCCCC" size="16" />
                          </View>
                        ))}
                      </View>
                      <View className="logout-btn-container">
                        <Button className="logout-btn" onClick={handleLogout}>退出当前账号</Button>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}


          {/* Spacer for CustomTabBar */}
          <View style={{ height: '120px' }}></View>
        </View>
      </PageFadeIn>

      <CustomTabBar />
    </>
  )
}
