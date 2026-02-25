import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { Popup, Loading, Calendar, Cascader } from '@taroify/core'
import { ArrowDown } from '@taroify/icons'
import HotelCard from '../../../components/HotelCard'
import CapsuleHeader from './CapsuleHeader'
import useSearchStore from '../../../store/search'
import { searchHotels, getHotelAttributes } from '../../../services/api'
import { regions } from '../../../data/regions'
import './index.scss'

export default function HotelList() {
  const router = useRouter()
  const { searchParams, setSearchParams } = useSearchStore()
  const [allHotels, setAllHotels] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('智能排序')
  const [showSort, setShowSort] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [tempDateRange, setTempDateRange] = useState(() => {
    const cin = searchParams.checkIn || "";
    const cout = searchParams.checkOut || "";
    return [
      new Date(cin ? cin.replace(/-/g, "/") : new Date()),
      new Date(cout ? cout.replace(/-/g, "/") : new Date(Date.now() + 86400000)),
    ];
  });
  const [activeFilters, setActiveFilters] = useState([])
  const [quickFilters, setQuickFilters] = useState([])

  const starFilters = ['五星级', '四星级', '三星级']
  const sortOptions = ['智能排序', '价格从低到高', '价格从高到低', '评分最高', '距离最近']

  // 初始化：将路由参数同步到 Store (若有)
  useEffect(() => {
    if (router.params.city || router.params.checkIn) {
      setSearchParams({
        city: router.params.city || searchParams.city,
        checkIn: router.params.checkIn || searchParams.checkIn,
        checkOut: router.params.checkOut || searchParams.checkOut,
        nights: parseInt(router.params.nights) || searchParams.nights,
        keyword: router.params.keyword || searchParams.keyword
      })
    }
    fetchFilters()
  }, [])

  // 核心拉取逻辑：依赖 searchParams 变化
  useEffect(() => {
    fetchHotels()
  }, [searchParams.city, searchParams.checkIn, searchParams.checkOut, searchParams.keyword])

  useEffect(() => {
    applyFilters()
  }, [activeFilters, allHotels, sortBy])

  const fetchFilters = async () => {
    try {
      const attrs = await getHotelAttributes()
      setQuickFilters([...starFilters, ...attrs.map(a => a.attr_name)])
    } catch (e) {
      setQuickFilters(starFilters)
    }
  }

  const fetchHotels = async () => {
    setLoading(true)
    try {
      // 优先从 store 获取当前生效的筛选参数
      const { city, keyword } = searchParams
      const data = await searchHotels({ city, keyword })

      if (!Array.isArray(data)) {
        console.warn('Hotel API result is not an array:', data)
        setAllHotels([])
        return
      }

      const transformed = data.map(hotel => ({
        id: hotel.hotel_id,
        name: hotel.hotel_name_cn,
        image: hotel.primary_image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=400&h=300',
        stars: hotel.star_level,
        price: hotel.min_price || 0,
        tags: hotel.nearby_attractions ? hotel.nearby_attractions.split(/[,;，；]/).slice(0, 3) : ['高配'],
        distance: hotel.detail_address,
        badges: hotel.star_level >= 4 ? ['推荐'] : []
      }))
      setAllHotels(transformed)
    } catch (error) {
      console.error('Fetch hotels failed:', error)
      Taro.showToast({ title: '加载酒店列表失败', icon: 'none' })
      setAllHotels([])
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...allHotels]
    const starFilterMap = { '五星级': 5, '四星级': 4, '三星级': 3 }
    const activeStarFilters = activeFilters.filter(f => starFilters.includes(f))

    if (activeStarFilters.length > 0) {
      const levels = activeStarFilters.map(f => starFilterMap[f])
      filtered = filtered.filter(h => levels.includes(h.stars))
    }

    if (sortBy === '价格从低到高') filtered.sort((a, b) => a.price - b.price)
    else if (sortBy === '价格从高到低') filtered.sort((a, b) => b.price - a.price)
    else if (sortBy === '评分最高') filtered.sort((a, b) => b.stars - a.stars)

    setList(filtered)
  }

  const handleCitySelect = (values) => {
    if (values && values.length > 0) {
      const selectedCity = values[values.length - 1]
      setSearchParams({ city: selectedCity })
      // 如果级联完成（通常2级），关闭弹窗
      if (values.length >= 2) {
        setShowCityPicker(false)
        Taro.showToast({ title: `已切换至 ${selectedCity}`, icon: 'none' })
      }
    }
  }

  const handleConfirmDate = () => {
    if (tempDateRange && tempDateRange.length === 2 && tempDateRange[0] && tempDateRange[1]) {
      const format = (d) => {
        const date = new Date(d)
        if (isNaN(date.getTime())) return null;
        const y = date.getFullYear()
        const m = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        return `${y}-${m}-${day}`
      }
      const cin = format(tempDateRange[0])
      const cout = format(tempDateRange[1])

      if (!cin || !cout) {
        Taro.showToast({ title: '日期格式错误', icon: 'none' })
        return
      }

      const nights = Math.max(1, Math.round((new Date(cout.replace(/-/g, '/')) - new Date(cin.replace(/-/g, '/'))) / 86400000))

      setSearchParams({ checkIn: cin, checkOut: cout, nights })
      setShowCalendar(false)
      Taro.showToast({ title: "日期更新成功", icon: "success" })
    }
  }

  return (
    <View className="hotel-list-page">
      {/* 核心筛选胶囊头 */}
      <CapsuleHeader
        city={searchParams.city}
        checkIn={searchParams.checkIn}
        checkOut={searchParams.checkOut}
        rooms={searchParams.rooms}
        adults={searchParams.adults}
        keyword={searchParams.keyword}
        onBack={() => Taro.navigateBack()}
        onCityClick={() => setShowCityPicker(true)}
        onDateClick={() => {
          const cin = searchParams.checkIn || "";
          const cout = searchParams.checkOut || "";
          let checkInDate = new Date();
          let checkOutDate = new Date(Date.now() + 86400000);

          if (cin) {
            const d = new Date(cin.replace(/-/g, "/"));
            if (!isNaN(d.getTime())) checkInDate = d;
          }
          if (cout) {
            const d = new Date(cout.replace(/-/g, "/"));
            if (!isNaN(d.getTime())) checkOutDate = d;
          }

          setTempDateRange([checkInDate, checkOutDate]);
          setShowCalendar(true);
        }}
        onKeywordClick={() => Taro.showToast({ title: "关键词搜索开发中", icon: "none" })}
        onSettingClick={() => Taro.showToast({ title: "搜索偏好设置", icon: "none" })}
      />

      <View className="list-sticky-filters">
        <ScrollView scrollX className="filter-bar" showScrollbar={false}>
          <View className="filter-item-wrapper">
            <View className="sort-btn" onClick={() => setShowSort(true)}>
              <Text className="text">{sortBy}</Text>
              <ArrowDown size="12" />
            </View>
            {quickFilters.map((filter, index) => (
              <View
                key={index}
                className={`filter-btn ${activeFilters.includes(filter) ? 'active' : 'normal'}`}
                onClick={() => setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter])}
              >
                <Text>{filter}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="list-container">
        {loading ? (
          <View className="loading-state"><Loading type="spinner" /><Text>寻找优质酒店中...</Text></View>
        ) : list.length > 0 ? (
          <>
            <Text className="list-count">在该城市为您找到 {list.length} 家好店</Text>
            {list.map((item) => (
              <HotelCard key={item.id} hotel={item} onClick={() => Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${item.id}` })} />
            ))}
          </>
        ) : (
          <View className="empty-state">暂无符合条件的酒店</View>
        )}
      </View>

      <Popup open={showSort} placement="bottom" rounded onClose={() => setShowSort(false)}>
        <View className="sort-popup">
          <View className="popup-title">选择排序方式</View>
          {sortOptions.map((opt) => (
            <View key={opt} className={`sort-option ${sortBy === opt ? 'active' : ''}`} onClick={() => { setSortBy(opt); setShowSort(false); }}>
              <Text>{opt}</Text>
              {sortBy === opt && <Text className="check">✓</Text>}
            </View>
          ))}
        </View>
      </Popup>

      <Popup open={showCalendar} placement="bottom" rounded onClose={() => setShowCalendar(false)}>
        <View className="calendar-popup-wrap">
          <View className="popup-header">
            <Text className="title">修改入离日期</Text>
            <Text className="btn-confirm" onClick={handleConfirmDate}>确定</Text>
          </View>
          <Calendar
            key={showCalendar ? 'open' : 'closed'}
            type="range"
            minDate={new Date()}
            defaultValue={tempDateRange}
            onSelect={(val) => setTempDateRange(val)}
            activeColor="#385e72"
          />
        </View>
      </Popup>

      <Popup open={showCityPicker} rounded placement="bottom" onClose={() => setShowCityPicker(false)}>
        <View className="cascader-wrap">
          <Cascader
            placeholder="请选择城市"
            onSelect={handleCitySelect}
            options={regions}
            defaultValue={searchParams.city ? [null, searchParams.city] : []}
          >
            <Cascader.Header>切换城市</Cascader.Header>
          </Cascader>
        </View>
      </Popup>
    </View>
  )
}


