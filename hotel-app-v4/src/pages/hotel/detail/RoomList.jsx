import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Tag } from '@taroify/core'
import { ArrowDown, ArrowUp } from '@taroify/icons'
import useSearchStore from '../../../store/search'
import './RoomList.scss'

export default function RoomList({ hotelId, roomTypes = [] }) {
  const { searchParams } = useSearchStore()
  const [expandedRoom, setExpandedRoom] = useState(null)

  // Transform room types from database or use fallback mock data
  const rooms = roomTypes.length > 0 ? roomTypes.map(room => ({
    id: room.room_type_id,
    name: room.type_name,
    image: room.image_url || 'https://images.unsplash.com/photo-1648383228240-6ed939727ad6?fit=crop&w=400&h=300',
    bedType: room.bed_type || '大床',
    size: room.room_size || 25,
    breakfast: room.breakfast_included ? '含早餐' : '不含早餐',
    maxGuests: room.max_guests || 2,
    freeCancellation: true,
    instantConfirm: true,
    price: Number(room.price) || 0,
    originalPrice: room.original_price ? Number(room.original_price) : null,
    facilities: ['免费WiFi', '空调', '迷你吧', '保险箱']
  })) : [
    // Fallback mock data if no room types from database
    {
      id: 1,
      name: '标准房',
      image: 'https://images.unsplash.com/photo-1648383228240-6ed939727ad6?fit=crop&w=400&h=300',
      bedType: '大床/双床',
      size: 25,
      breakfast: '含早餐',
      maxGuests: 2,
      freeCancellation: true,
      instantConfirm: true,
      price: 399,
      facilities: ['免费WiFi', '空调', '迷你吧']
    }
  ]

  const toggleRoom = (id) => {
    setExpandedRoom(expandedRoom === id ? null : id)
  }
  
  const handleBook = (roomId) => {
    Taro.navigateTo({ url: `/pages/order/index?hotelId=${hotelId}&roomId=${roomId}` })
  }

  return (
    <View className="room-list">
      {rooms.map((room) => (
        <View key={room.id} className="room-card">
           <View className="image-box">
             <Image src={room.image} mode="aspectFill" className="room-img" />
           </View>
           
           <View className="content">
             <View className="header">
               <Text className="name">{room.name}</Text>
               <View className="tags">
                 <Text className="tag-text">{room.bedType}</Text>
                 <Text className="dot">·</Text>
                 <Text className="tag-text">{room.size}㎡</Text>
                 <Text className="dot">·</Text>
                 <Text className="tag-text">{room.breakfast}</Text>
               </View>
               <View className="badges">
                 {room.freeCancellation && <Tag color="#d1fae5" textColor="#047857" className="badge">✓ 免费取消</Tag>}
                 {room.instantConfirm && <Tag color="#dbeafe" textColor="#1d4ed8" className="badge">⚡ 立即确认</Tag>}
               </View>
             </View>

             {expandedRoom === room.id && (
                <View className="details-expanded">
                   <Text className="title">房间设施</Text>
                   <View className="facilities">
                     {room.facilities.map((f, i) => (
                       <Text key={i} className="fac-item">{f}</Text>
                     ))}
                   </View>
                </View>
             )}

             <View className="footer">
                <View className="price-box">
                  {room.originalPrice && <Text className="original">¥{room.originalPrice}</Text>}
                  <Text className="current-price">¥{room.price}</Text>
                  <Text className="suffix">每晚</Text>
                </View>
             </View>
             
             <View className="actions">
                <Button 
                  className="toggle-btn" 
                  variant="outlined" 
                  color="#047857"
                  size="small"
                  onClick={() => toggleRoom(room.id)}
                >
                  {expandedRoom === room.id ? '收起' : '详情'}
                </Button>
                <Button 
                  className="book-btn" 
                  color="#047857"
                  size="small"
                  onClick={() => handleBook(room.id)}
                >
                  预订
                </Button>
             </View>
             
             {expandedRoom === room.id && (
               <View className="total-price">
                 <Text>共 {searchParams.nights} 晚 · 总价 </Text>
                 <Text className="highlight">¥{room.price * searchParams.nights}</Text>
               </View>
             )}
           </View>
        </View>
      ))}
    </View>
  )
}

