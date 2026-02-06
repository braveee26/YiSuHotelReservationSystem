import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image, Textarea } from '@tarojs/components'
import { Button, Tabs, Popup, Rate } from '@taroify/core'
import TabBar from '../../../components/TabBar'
import './index.scss'

export default function Reviews() {
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [currentReview, setCurrentReview] = useState(null)
  const [score, setScore] = useState(5)
  const [comment, setComment] = useState('')

  const myReviews = [
    {
      id: 1,
      hotelName: '大阪皇家花园酒店',
      date: '2024-02-10',
      roomType: '行政大床房',
      rating: 5,
      content: '非常好的酒店体验，房间干净整洁，服务态度很好！窗外视野极佳。',
      status: 'done',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80'
    }
  ]

  const pendingReviews = [
    {
      id: 101,
      hotelName: '京都柏悦酒店',
      date: '2024-03-01',
      roomType: '特选双人间',
      status: 'pending',
      img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=80'
    }
  ]

  const handleOpenForm = (item) => {
    setCurrentReview(item)
    setShowForm(true)
  }

  const handleSubmit = () => {
    Taro.showLoading({ title: '提交中' })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({ title: '感谢您的评价', icon: 'success' })
      setShowForm(false)
      setComment('')
      setScore(5)
    }, 1000)
  }

  return (
    <View className="reviews-page">
      <View className="page-header">
        <Text className="title">我的点评</Text>
        <Text className="subtitle">真实评价，发现更好的住宿体验</Text>
      </View>

      <Tabs active={activeTab} onChange={({ eventKey }) => setActiveTab(eventKey)} className="tabs-nav">
        <Tabs.TabPane title="已评价" />
        <Tabs.TabPane title="待评价" />
      </Tabs>

      <View className="reviews-list">
        {activeTab === 0 ? (
          myReviews.map(item => (
            <View key={item.id} className="review-card">
              <View className="review-header">
                <Text className="hotel-name">{item.hotelName}</Text>
                <Text className="status-tag done">已完成</Text>
              </View>
              <View className="review-info">
                <Image className="hotel-thumb" src={item.img} mode="aspectFill" />
                <View className="info-content">
                  <Text className="date">评价于：{item.date}</Text>
                  <Text className="room-type">{item.roomType}</Text>
                </View>
              </View>
              <View className="review-content-box">
                <Text className="stars">{'★'.repeat(item.rating)}</Text>
                <Text className="content-text">{item.content}</Text>
              </View>
            </View>
          ))
        ) : (
          pendingReviews.map(item => (
            <View key={item.id} className="review-card">
              <View className="review-header">
                <Text className="hotel-name">{item.hotelName}</Text>
                <Text className="status-tag pending">待评价</Text>
              </View>
              <View className="review-info">
                <Image className="hotel-thumb" src={item.img} mode="aspectFill" />
                <View className="info-content">
                  <Text className="date">入住于：{item.date}</Text>
                  <Text className="room-type">{item.roomType}</Text>
                </View>
              </View>
              <View className="action-footer">
                <Button className="action-btn" onClick={() => handleOpenForm(item)}>
                  写评价
                </Button>
              </View>
            </View>
          ))
        )}
      </View>

      <Popup
        open={showForm}
        placement="bottom"
        rounded
        style={{ height: '80%' }}
        onClose={() => setShowForm(false)}
        className="review-popup"
      >
        <View className="popup-content">
          <View className="form-header">
            <Text className="title">发表评价</Text>
          </View>

          <View className="rating-section">
            <Text className="label">您对“{currentReview?.hotelName}”的整体印象如何？</Text>
            <View className="stars-row">
              <Rate value={score} onChange={(e) => setScore(e)} />
            </View>
          </View>

          <View className="input-section">
            <Textarea
              className="comment-area"
              placeholder="分享您的住宿体验，帮助更多旅客..."
              value={comment}
              onInput={e => setComment(e.detail.value)}
            />
          </View>

          <View className="submit-bar">
            <Button
              block
              shape="round"
              className="submit-btn"
              onClick={handleSubmit}
            >
              提交发布
            </Button>
          </View>
        </View>
      </Popup>

      <TabBar current={3} />
    </View>
  )
}
