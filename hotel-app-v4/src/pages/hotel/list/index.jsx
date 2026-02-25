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
        city: decodeURIComponent(router.params.city || '') || searchParams.city,
        checkIn: decodeURIComponent(router.params.checkIn || '') || searchParams.checkIn,
        checkOut: decodeURIComponent(router.params.checkOut || '') || searchParams.checkOut,
        nights: parseInt(router.params.nights) || searchParams.nights,
        keyword: decodeURIComponent(router.params.keyword || '') || searchParams.keyword
      })
    }
    fetchFilters()
  }, [])

  // 核心拉取逻辑：依赖 searchParams 变化
  useEffect(() => {
    fetchHotels()
  }, [searchParams.city, searchParams.checkIn, searchParams.checkOut, searchParams.keyword, activeFilters])

  useEffect(() => {
    applyFilters()
  }, [allHotels, sortBy])

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

      // 从 activeFilters 中拆分星级和标签
      const starFilterMap = { '五星级': 5, '四星级': 4, '三星级': 3 }
      const activeStarFilters = activeFilters.filter(f => starFilters.includes(f))
      const activeTagFilters = activeFilters.filter(f => !starFilters.includes(f))

      const params = { city, keyword }
      if (activeStarFilters.length === 1) {
        params.stars = starFilterMap[activeStarFilters[0]]
      }
      if (activeTagFilters.length > 0) {
        params.tags = activeTagFilters.join(',')
      }

      const data = await searchHotels(params)

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

    // 星级和标签筛选已由后端处理，前端只做排序
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

  const handleCalendarConfirm = (val) => {
    if (!val || val.length < 2) return
    const format = (d) => {
      const y = d.getFullYear()
      const m = (d.getMonth() + 1).toString().padStart(2, "0")
      const day = d.getDate().toString().padStart(2, "0")
      return `${y}-${m}-${day}`
    }
    const cin = format(val[0])
    const cout = format(val[1])
    const nights = Math.max(1, Math.round((val[1] - val[0]) / 86400000))
    setSearchParams({ checkIn: cin, checkOut: cout, nights })
    setShowCalendar(false)
    Taro.showToast({ title: "日期更新成功", icon: "success" })
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

      <Calendar
        type="range"
        poppable
        showPopup={showCalendar}
        showConfirm={false}
        onClose={() => setShowCalendar(false)}
        value={tempDateRange}
        onChange={(val) => setTempDateRange(val)}
        onConfirm={handleCalendarConfirm}
        minDate={new Date()}
        activeColor="#385e72"
        rowHeight={56}
        formatter={(day) => {
    if (day.type === 'start' || day.type === 'end') {
      day.bottomInfo = ''; 
    }
    return day;
  }}
        style={{
        "--calendar-day-font-size": "14px",           // 日期数字字体大小
        "--calendar-header-title-font-size": "16px",  // 月份标题字体大小
        "--calendar-week-day-font-size": "12px",      // 周几标题字体大小
        "--van-calendar-day-height": "56px",           // 日期高度
        "--calendar-day-height": "56px",
        "--van-calendar-month-title-font-size": "14px",
        "--calendar-month-title-font-size": "14px",
        "--van-calendar-bottom-info-font-size": "10px",
    "--calendar-bottom-info-font-size": "10px",
          }}
      >
        {/* 自定义头部 */}
    <Calendar.Header>
        <View style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px" }}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>选择日期</Text>
            <Text style={{ color: "#385e72", fontSize: "14px" }} onClick={() => handleCalendarConfirm(tempDateRange)}>确定</Text>
        </View>
    </Calendar.Header>
      </Calendar>

      <Popup open={showCityPicker} rounded placement="bottom" onClose={() => setShowCityPicker(false)}>
        <View className="cascader-wrap">
          <Cascader
            placeholder="请选择城市"
            onSelect={handleCitySelect}
            options={regions}
            defaultValue={searchParams.city ? [null, searchParams.city] : []}>
            <Cascader.Header>切换城市</Cascader.Header>
          </Cascader>
        </View>
      </Popup>
    </View>
  )
}


