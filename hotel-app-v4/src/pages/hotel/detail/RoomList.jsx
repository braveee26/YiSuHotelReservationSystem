import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { Button, Tag } from '@taroify/core'
import { ArrowDown, ArrowUp } from '@taroify/icons'
import useSearchStore from '../../../store/search'
import './RoomList.scss'

export default function RoomList() {
  const { searchParams } = useSearchStore()
  const [expandedRoom, setExpandedRoom] = useState(null)

  const rooms = [
    {
      id: 1,
      name: '豪华双床房',
      image: 'https://images.unsplash.com/photo-1648383228240-6ed939727ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHR3aW4lMjBiZWQlMjByb29tfGVufDF8fHx8MTc2OTg1Njc5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      bedType: '2张单人床',
      size: 35,
      breakfast: '含双人早餐',
      maxGuests: 2,
      freeCancellation: true,
      instantConfirm: true,
      price: 850,
      originalPrice: 1200,
      facilities: ['免费WiFi', '空调', '迷你吧', '保险箱', '浴缸']
    },
    {
      id: 2,
      name: '高级大床房',
      image: 'https://images.unsplash.com/photo-1572177215152-32f247303126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb20lMjBiZWR8ZW58MXx8fHwxNzY5Nzk1MzA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bedType: '1张大床',
      size: 30,
      breakfast: '含单人早餐',
      maxGuests: 2,
      freeCancellation: true,
      instantConfirm: true,
      price: 720,
      facilities: ['免费WiFi', '空调', '迷你吧', '保险箱']
    },
    {
       id: 3,
       name: '豪华套房',
       image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwbHV4dXJ5fGVufDF8fHx8MTc2OTg0MTcyNnww&ixlib=rb-4.1.0&q=80&w=1080',
       bedType: '1张特大床 + 客厅',
       size: 60,
       breakfast: '含双人早餐',
       maxGuests: 3,
       freeCancellation: true,
       instantConfirm: true,
       price: 1580,
       originalPrice: 2200,
       facilities: ['免费WiFi', '空调', '迷你吧', '保险箱', '浴缸', '客厅', '厨房']
     }
  ]

  const toggleRoom = (id) => {
    setExpandedRoom(expandedRoom === id ? null : id)
  }
  
  const handleBook = () => {
    Taro.navigateTo({ url: '/pages/order/index' })
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
                  onClick={handleBook}
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
