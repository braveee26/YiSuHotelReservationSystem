import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { Button, Popup, Calendar } from '@taroify/core'
import { LocationOutlined, ArrowRight } from '@taroify/icons'
import useSearchStore from '../../store/search'
import './SearchCard.scss'

export default function SearchCard({ onSearch }) {
  const { searchParams, updateSearchParam } = useSearchStore()
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  
  // Date helpers
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
  
  const getDayOfWeek = (dateStr) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return days[new Date(dateStr).getDay()]
  }

  const handleDateChange = () => {
    setShowCalendar(true)
  }

  const onCalendarConfirm = (value) => {
    if (value && value.length === 2) {
      const [start, end] = value
      const checkIn = new Date(start)
      const checkOut = new Date(end)
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      
      updateSearchParam('checkIn', checkIn.toISOString().split('T')[0])
      updateSearchParam('checkOut', checkOut.toISOString().split('T')[0])
      updateSearchParam('nights', nights)
    }
    setShowCalendar(false)
  }

  return (
    <View className="search-card">
      {/* Business Type Tabs */}
      <View className="business-tabs">
        {['国内', '海外', '钟点房', '民宿'].map((type) => (
          <View 
            key={type}
            className={`tab-item ${searchParams.businessType === type ? 'active' : ''}`}
            onClick={() => updateSearchParam('businessType', type)}
          >
            <Text className="text">{type}</Text>
          </View>
        ))}
      </View>

      {/* City & Location */}
      <View className="location-section">
        <View className="city-box">
          <Text className="city-name">{searchParams.city}</Text>
          <Text className="current-location">
            <LocationOutlined /> 当前位置
          </Text>
        </View>
        <View className="input-box">
           <Input 
             className="search-input"
             placeholder="我的附近"
             disabled
           />
        </View>
      </View>

      {/* Date Selection */}
      <View className="date-section border-bottom" onClick={handleDateChange}>
        <View className="date-item">
          <Text className="label">入住</Text>
          <View className="date-val">
            <Text className="date">{formatDate(searchParams.checkIn)}</Text>
            <Text className="week">{getDayOfWeek(searchParams.checkIn)}</Text>
          </View>
        </View>
        <View className="nights">
          <Text className="text">共{searchParams.nights}晚</Text>
        </View>
        <View className="date-item">
          <Text className="label">离店</Text>
          <View className="date-val">
             <Text className="date">{formatDate(searchParams.checkOut)}</Text>
             <Text className="week">{getDayOfWeek(searchParams.checkOut)}</Text>
          </View>
        </View>
      </View>

      {/* Guests */}
      <View className="guest-section border-bottom" onClick={() => setShowGuestPicker(true)}>
        <Text className="val">
          {searchParams.rooms}间 · {searchParams.adults}成人 · {searchParams.children}儿童
        </Text>
        <ArrowRight color="#999" />
      </View>

      {/* Search Button */}
      <Button 
        block 
        color="#385e72" 
        className="search-btn"
        onClick={() => onSearch && onSearch(searchParams)}
      >
        搜索酒店
      </Button>

      {/* Calendar Popup */}
      <Popup 
        open={showCalendar} 
        rounded 
        placement="bottom" 
        style={{ height: '80vh' }}
        onClose={() => setShowCalendar(false)}
      >
        <Popup.Close />
        <View className="calendar-popup">
          <View className="calendar-header">
            <Text className="calendar-title">选择入住日期</Text>
          </View>
          <Calendar 
            type="range"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)}
            onConfirm={onCalendarConfirm}
          >
            <Calendar.Footer>
              <Calendar.Button type="confirm">确定</Calendar.Button>
            </Calendar.Footer>
          </Calendar>
        </View>
      </Popup>

      {/* Guest Picker Popup */}
      <Popup 
        open={showGuestPicker} 
        rounded 
        placement="bottom" 
        onClose={() => setShowGuestPicker(false)}
      >
        <Popup.Close />
        <View className="picker-content">
           <View className="picker-header">选择人数</View>
           {['rooms', 'adults', 'children'].map(key => (
             <View key={key} className="counter-row">
               <Text className="label">
                 {key === 'rooms' ? '房间数' : key === 'adults' ? '成人' : '儿童'}
               </Text>
               <View className="stepper">
                 <Button 
                   size="small" 
                   disabled={searchParams[key] <= 0}
                   onClick={() => updateSearchParam(key, Math.max(0, searchParams[key] - 1))}
                 >-</Button>
                 <Text className="count">{searchParams[key]}</Text>
                 <Button 
                   size="small" 
                   onClick={() => updateSearchParam(key, searchParams[key] + 1)}
                 >+</Button>
               </View>
             </View>
           ))}
           <Button block color="#385e72" onClick={() => setShowGuestPicker(false)} className="confirm-btn">确定</Button>
        </View>
      </Popup>
    </View>
  )
}
