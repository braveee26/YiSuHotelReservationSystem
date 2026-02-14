import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import './BannerCarousel.scss'

export default function BannerCarousel({ data, onBannerClick }) {
  // If no data, show a fallback or empty
  if (!data || data.length === 0) {
    return null
  }

  return (
    <Swiper
      className="banner-swiper"
      indicatorColor="#rgba(255,255,255,0.5)"
      indicatorActiveColor="#fff"
      circular
      indicatorDots
      autoplay
    >
      {data.map((item) => (
        <SwiperItem key={item.id}>
          <View className="banner-item" onClick={() => onBannerClick(item.id)}>
            <Image src={item.image} mode="aspectFill" className="banner-bg" />
            <View className="banner-content">
              <View className="text-box">
                <View className="title">{item.name}</View>
                <View className="subtitle">立即预订</View>
              </View>
            </View>
          </View>
        </SwiperItem>
      ))}
    </Swiper>
  )
}
