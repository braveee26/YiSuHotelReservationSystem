import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import { ArrowRight } from '@taroify/icons'
import useAuthStore from '../../store/auth'
import TabBar from '../../components/TabBar'
import './index.scss'

export default function User() {
  const { userInfo, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    gender: '不透露'
  })

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

  const handleSaveProfile = () => {
    setIsEditing(false)
    Taro.showToast({ title: '保存成功', icon: 'success' })
  }

  const tabs = ['个人信息', '常用入住人', '设置']

  return (
    <View className="user-page">
       {/* Header */}
       <View className="user-header">
         <Text className="back-btn" onClick={() => Taro.navigateBack()}>‹</Text>
         <Text className="header-title">我的</Text>
         <View className="avatar-box">
            <Text className="avatar-icon">👤</Text>
         </View>
         <View className="user-info">
            <Text className="name">{userInfo?.name || editForm.name}</Text>
            <Text className="email">{userInfo?.email || editForm.email}</Text>
         </View>
       </View>

       {/* Custom Tabs */}
       <View className="tabs-wrapper">
         <View className="custom-tabs">
           {tabs.map((tab, idx) => (
             <Text 
               key={idx} 
               className={`tab-item ${activeTab === idx ? 'active' : ''}`}
               onClick={() => setActiveTab(idx)}
             >
               {tab}
             </Text>
           ))}
         </View>
         
         <View className="tab-content">
           {activeTab === 0 && (
             <View>
               <View className="section-header">
                 <Text className="title">个人信息</Text>
                 {!isEditing ? (
                   <Button className="action-btn" onClick={() => setIsEditing(true)}>编辑</Button>
                 ) : (
                   <Button className="action-btn" onClick={handleSaveProfile}>保存</Button>
                 )}
               </View>
               
               <View className="profile-avatar">
                 <Text className="icon">👤</Text>
               </View>
               
               <View className="info-list">
                 <View className="info-item">
                   <Text className="label">姓名</Text>
                   {isEditing ? (
                     <Input 
                       className="input" 
                       value={editForm.name} 
                       onInput={e => setEditForm({...editForm, name: e.detail.value})}
                     />
                   ) : (
                     <Text className="val">{editForm.name}</Text>
                   )}
                 </View>
                 <View className="info-item">
                   <Text className="label">邮箱</Text>
                   {isEditing ? (
                     <Input 
                       className="input" 
                       value={editForm.email} 
                       onInput={e => setEditForm({...editForm, email: e.detail.value})}
                     />
                   ) : (
                     <Text className="val">{editForm.email}</Text>
                   )}
                 </View>
                 <View className="info-item">
                   <Text className="label">手机号</Text>
                   <Text className="val">{editForm.phone}</Text> 
                 </View>
                 <View className="info-item">
                   <Text className="label">性别</Text>
                   <Text className="val">{editForm.gender}</Text>
                 </View>
               </View>
             </View>
           )}
           
           {activeTab === 1 && (
             <View>
               <View className="guest-list">
                 {guests.map(guest => (
                   <View key={guest.id} className="guest-card">
                     <View className="g-info">
                       <Text className="g-name">{guest.name}</Text>
                       <Text className="g-id">身份证: {guest.idCard}</Text>
                       <Text className="g-phone">手机: {guest.phone}</Text>
                     </View>
                     <Button className="edit-btn" size="mini">编辑</Button>
                   </View>
                 ))}
                 <Button className="add-guest-btn">添加常用入住人</Button>
               </View>
             </View>
           )}
           
           {activeTab === 2 && (
             <View>
               <View className="settings-list">
                 <View className="setting-item">
                   <Text>修改密码</Text>
                   <ArrowRight color="#999" size="16" />
                 </View>
                 <View className="setting-item">
                   <Text>隐私设置</Text>
                   <ArrowRight color="#999" size="16" />
                 </View>
                 <View className="setting-item">
                   <Text>用户协议</Text>
                   <ArrowRight color="#999" size="16" />
                 </View>
                 <View className="setting-item">
                   <Text>我的订单</Text>
                   <ArrowRight color="#999" size="16" />
                 </View>
                 <View className="setting-item danger" onClick={handleLogout}>
                   <Text>退出登录</Text>
                 </View>
               </View>
             </View>
           )}
         </View>
       </View>

       <TabBar current={4} />
    </View>
  )
}
