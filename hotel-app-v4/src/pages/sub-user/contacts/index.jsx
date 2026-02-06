import React, { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { Button, Popup, Toast } from '@taroify/core'
import { Plus, Edit, Delete } from '@taroify/icons'
import TabBar from '../../../components/TabBar'
import './index.scss'

const Contacts = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [contacts, setContacts] = useState([
    { id: 1, name: '陈悠然', phone: '138****8888', idCard: '4403************12', type: '身份证' },
    { id: 2, name: '林悦', phone: '139****1234', idCard: 'E1234567', type: '护照' }
  ])
  const [formData, setFormData] = useState({ name: '', phone: '', idCard: '', type: '身份证' })
  const [isEdit, setIsEdit] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  const handleAdd = () => {
    setIsEdit(false)
    setFormData({ name: '', phone: '', idCard: '', type: '身份证' })
    setShowPopup(true)
  }

  const handleEdit = (item) => {
    setIsEdit(true)
    setCurrentId(item.id)
    setFormData({ ...item })
    setShowPopup(true)
  }

  const handleDelete = (id) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      return
    }
    if (isEdit) {
      setContacts(contacts.map(c => c.id === currentId ? { ...formData, id: currentId } : c))
    } else {
      setContacts([...contacts, { ...formData, id: Date.now() }])
    }
    setShowPopup(false)
  }

  return (
    <View className="contacts-page">
      <View className="page-header">
        <View className="header-content">
          <Text className="title">常用入住人</Text>
          <Text className="desc">管理预订时常用的入住信息</Text>
        </View>
        <View className="add-icon-btn" onClick={handleAdd}>
          <Plus size="24" color="#fff" />
        </View>
      </View>

      <View className="contacts-list">
        {contacts.length === 0 ? (
          <View className="empty-state">
            <View className="empty-icon">📂</View>
            <Text className="empty-text">暂无入住人信息</Text>
          </View>
        ) : (
          contacts.map(item => (
            <View key={item.id} className="contact-card">
              <View className="card-main">
                <View className="name-row">
                  <Text className="name">{item.name}</Text>
                  <Text className="type-tag">{item.type}</Text>
                </View>
                <View className="info-row">
                  <Text className="label">手机号</Text>
                  <Text className="value">{item.phone}</Text>
                </View>
                <View className="info-row">
                  <Text className="label">证件号</Text>
                  <Text className="value">{item.idCard}</Text>
                </View>
              </View>
              <View className="card-actions">
                <Edit className="action-icon" size="20" color="#385e72" onClick={() => handleEdit(item)} />
                <Delete className="action-icon" size="20" color="#ef4444" onClick={() => handleDelete(item.id)} />
              </View>
            </View>
          ))
        )}
      </View>

      <Popup
        open={showPopup}
        rounded
        placement="bottom"
        onClose={() => setShowPopup(false)}
        className="contact-popup"
      >
        <View className="popup-content">
          <View className="form-header">
            <Text className="title">{isEdit ? '编辑入住人' : '新增入住人'}</Text>
          </View>

          <View className="form-fields">
            <View className="field-group">
              <Text className="label">姓名</Text>
              <Input
                className="input-box"
                placeholder="请输入真实姓名"
                value={formData.name}
                onInput={e => setFormData({ ...formData, name: e.detail.value })}
              />
            </View>
            <View className="field-group">
              <Text className="label">手机号码</Text>
              <Input
                className="input-box"
                placeholder="手机号码"
                type="number"
                value={formData.phone}
                onInput={e => setFormData({ ...formData, phone: e.detail.value })}
              />
            </View>
            <View className="field-group">
              <Text className="label">证件号</Text>
              <Input
                className="input-box"
                placeholder="请输入证件号码"
                value={formData.idCard}
                onInput={e => setFormData({ ...formData, idCard: e.detail.value })}
              />
            </View>
          </View>

          <View className="submit-bar">
            <Button className="cancel-btn" onClick={() => setShowPopup(false)}>取消</Button>
            <Button className="save-btn" onClick={handleSave}>保存并生效</Button>
          </View>
        </View>
      </Popup>
    </View>
  )
}

export default Contacts
