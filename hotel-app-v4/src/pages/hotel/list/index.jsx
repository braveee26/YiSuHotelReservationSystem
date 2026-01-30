
import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
// import { VirtualList } from '@nutui/nutui-react-taro'
import Taro, { useRouter } from '@tarojs/taro'
import './index.scss'

const HotelList = () => {
  const router = useRouter()
  const [list, setList] = useState(new Array(10).fill({ name: 'Hotel Name', price: 299 }))

  const handleToDetail = () => {
      Taro.navigateTo({ url: '/pages/hotel/detail/index' })
  }

  return (
    <View className="hotel-list-page">
       <View className="filter-bar">
           <Text>价格</Text>
           <Text>星级</Text>
           <Text>位置</Text>
       </View>
       <View className="list-container">
           {list.map((item, index) => (
               <View key={index} className="hotel-card" onClick={handleToDetail}>
                   <View className="card-image"></View>
                   <View className="card-info">
                       <Text className="hotel-name">{item.name} {index + 1}</Text>
                       <Text className="hotel-price">¥{item.price}</Text>
                   </View>
               </View>
           ))}
       </View>
    </View>
  )
}

export default HotelList
