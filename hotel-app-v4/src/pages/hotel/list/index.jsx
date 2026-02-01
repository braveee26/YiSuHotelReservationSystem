import Taro from '@tarojs/taro'
import { useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { Button, Popup } from '@taroify/core'
import { ArrowDown } from '@taroify/icons'
import HotelCard from '../../../components/HotelCard'
import useSearchStore from '../../../store/search'
import './index.scss'

export default function HotelList() {
  const { searchParams } = useSearchStore()
  const [list, setList] = useState([
    {
      id: 1,
      name: '大阪皇家花园酒店',
      image: 'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5NzgxNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      stars: 5,
      rating: 4.8,
      reviews: 1523,
      price: 850,
      tags: ['床很舒服', '服务热情', '交通便利'],
      distance: '距离难波步行100米',
      badges: ['推荐', '华人优选']
    },
    {
      id: 2,
      name: '心斋桥温泉酒店',
      image: 'https://images.unsplash.com/photo-1610375233775-6e0166927193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGhvdGVsJTIwcnlva2FufGVufDF8fHx8MTc2OTg1NjY1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stars: 4,
      rating: 4.6,
      reviews: 987,
      price: 680,
      tags: ['温泉很棒', '日式风格', '早餐丰富'],
      distance: '距离心斋桥地铁站200米',
      badges: ['推荐']
    },
    {
      id: 3,
      name: '梅田商务酒店',
      image: 'https://images.unsplash.com/photo-1546034746-25df3092cc5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhvdGVsJTIwcm9vbXxlbnwxfHx8fDE3Njk4NDkxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stars: 4,
      rating: 4.5,
      reviews: 756,
      price: 520,
      tags: ['性价比高', '位置优越', '干净整洁'],
      distance: '距离梅田站步行5分钟',
      badges: []
    },
    {
      id: 4,
      name: '大阪海湾度假酒店',
      image: 'https://images.unsplash.com/photo-1695173849152-c506198aaf90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzY5ODMyMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      stars: 5,
      rating: 4.7,
      reviews: 1234,
      price: 920,
      tags: ['泳池很棒', '海景房', '设施完善'],
      distance: '距离海边500米',
      badges: ['推荐']
    }
  ])

  const [sortBy, setSortBy] = useState('智能排序')
  const [showSort, setShowSort] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  const quickFilters = ['4.5分以上', '双床房', '华人优选', '免费取消', '含早餐']
  const sortOptions = ['智能排序', '价格从低到高', '价格从高到低', '评分最高', '距离最近']

  const handleToDetail = (id) => {
      Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` })
  }

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <View className="hotel-list-page">
       {/* Search Summary Header */}
       <View className="sticky-header">
         <View className="search-summary">
            <Text className="city">{searchParams.city}</Text>
            <Text className="dot">·</Text>
            <Text className="info">{searchParams.nights}晚</Text>
            <Text className="dot">·</Text>
            <Text className="info">{searchParams.rooms}间</Text>
         </View>
         
         {/* Filter Bar */}
         <ScrollView scrollX className="filter-bar" showScrollbar={false}>
            <View className="filter-item-wrapper">
              <View 
                className="sort-btn"
                onClick={() => setShowSort(true)}
              >
                <Text className="text">{sortBy}</Text>
                <ArrowDown size="12" />
              </View>
              
              <View className="filter-btn normal">筛选</View>
              
              {quickFilters.map((filter, index) => (
                <View 
                  key={index}
                  className={`filter-btn ${activeFilters.includes(filter) ? 'active' : 'normal'}`}
                  onClick={() => toggleFilter(filter)}
                >
                  <Text>{filter}</Text>
                </View>
              ))}
            </View>
         </ScrollView>
       </View>

       {/* List Content */}
       <View className="list-container">
           <Text className="list-count">共找到 {list.length} 家酒店</Text>
           {list.map((item) => (
               <HotelCard 
                 key={item.id} 
                 hotel={item} 
                 onClick={() => handleToDetail(item.id)} 
               />
           ))}
       </View>

       {/* Sort Popup */}
       <Popup 
         open={showSort} 
         placement="bottom" 
         rounded
         onClose={() => setShowSort(false)}
       >
         <View className="sort-popup">
            <View className="popup-title">排序方式</View>
            {sortOptions.map((option, index) => (
              <View 
                key={index} 
                className={`sort-option ${sortBy === option ? 'active' : ''}`}
                onClick={() => { setSortBy(option); setShowSort(false); }}
              >
                <Text>{option}</Text>
                {sortBy === option && <Text className="check">✓</Text>}
              </View>
            ))}
         </View>
       </Popup>
    </View>
  )
}
