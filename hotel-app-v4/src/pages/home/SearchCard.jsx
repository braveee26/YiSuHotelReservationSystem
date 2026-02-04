import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { Button, Popup, Calendar } from '@taroify/core'
import { LocationOutlined, ArrowRight, ArrowDown } from '@taroify/icons'
import useSearchStore from '../../store/search'
import './SearchCard.scss'

export default function SearchCard({ onSearch }) {
  const { searchParams, updateSearchParam } = useSearchStore()
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [calendarSelection, setCalendarSelection] = useState([new Date(searchParams.checkIn), new Date(searchParams.checkOut)])
  
  // Common cities list
  const cityList = ['北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '武汉', '西安', '南京', '苏州', '天津', '大阪', '东京']
  
  // Date helpers
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
  
  const getDayOfWeek = (dateStr) => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const day = new Date(dateStr).getDay()
    return days[isNaN(day) ? 0 : day]
  }

  const handleDateChange = () => {
    // Initialize calendar selection with current params when opening
    if (searchParams.checkIn && searchParams.checkOut) {
      setCalendarSelection([new Date(searchParams.checkIn), new Date(searchParams.checkOut)])
    }
    setShowCalendar(true)
  }

  const onCalendarSelect = (value) => {
    if (value) {
      setCalendarSelection(value)
    }
  }

  const handleCalendarConfirm = () => {
    onCalendarConfirm(calendarSelection)
  }

  const onCalendarConfirm = (value) => {
    console.log('Calendar value:', value)
    if (value && value.length === 2 && value[0] && value[1]) {
      const [start, end] = value
      const checkIn = new Date(start)
      const checkOut = new Date(end)
      const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)))
      
      const checkInStr = checkIn.toISOString().split('T')[0]
      const checkOutStr = checkOut.toISOString().split('T')[0]
      
      updateSearchParam('checkIn', checkInStr)
      updateSearchParam('checkOut', checkOutStr)
      updateSearchParam('nights', nights)
    }
    setShowCalendar(false)
  }
  
  const handleCitySelect = (city) => {
    updateSearchParam('city', city)
    setShowCityPicker(false)
  }
  
  // Calculate nights for button text
  const getNightsText = () => {
    if (calendarSelection && calendarSelection.length === 2 && calendarSelection[0] && calendarSelection[1]) {
      const start = new Date(calendarSelection[0])
      const end = new Date(calendarSelection[1])
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)))
      return `完成（${nights}晚）`
    }
    return '完成'
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
          <LocationOutlined />
          <Input 
            className="city-input"
            placeholder="输入城市名称"
            value={searchParams.city}
            onInput={(e) => updateSearchParam('city', e.detail.value)}
            style={{ flex: 1, marginLeft: '8px' }}
          />
        </View>
        <View className="input-box">
           <Input 
             className="search-input"
             placeholder="搜索酒店名称/地址"
             value={searchParams.keyword}
             onInput={(e) => updateSearchParam('keyword', e.detail.value)}
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

      {/* City Picker Popup */}
      <Popup 
        open={showCityPicker} 
        rounded 
        placement="bottom" 
        onClose={() => setShowCityPicker(false)}
      >
        <Popup.Close />
        <View className="picker-content">
          <View className="picker-header">选择城市</View>
          <View style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
            {cityList.map(city => (
              <View 
                key={city} 
                style={{ 
                  padding: '8px 16px', 
                  margin: '5px', 
                  backgroundColor: searchParams.city === city ? '#385e72' : '#f5f5f5',
                  color: searchParams.city === city ? '#fff' : '#333',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </View>
            ))}
          </View>
        </View>
      </Popup>

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
            defaultValue={[new Date(searchParams.checkIn), new Date(searchParams.checkOut)]}
            onSelect={onCalendarSelect}
            onConfirm={onCalendarConfirm} // Keep default confirm for potential internal logic
          >
             <Calendar.Footer>
              <View style={{ padding: '10px 16px' }}>
                <Button 
                  block 
                  color="#1989fa" 
                  shape="round"
                  onClick={handleCalendarConfirm}
                >
                  {getNightsText()}
                </Button>
              </View>
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

