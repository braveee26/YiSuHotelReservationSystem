import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import './BannerCarousel.scss'

export default function BannerCarousel({ onBannerClick }) {
  const banners = [
    {
      image: 'https://images.unsplash.com/photo-1744782996368-dc5b7e697f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5NzgxNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: '奢华酒店限时优惠',
      subtitle: '5折起'
    },
    {
      image: 'https://images.unsplash.com/photo-1610375233775-6e0166927193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGhvdGVsJTIwcnlva2FufGVufDF8fHx8MTc2OTg1NjY1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: '日本温泉之旅',
      subtitle: '预订即送温泉券'
    },
    {
      image: 'https://images.unsplash.com/photo-1695173849152-c506198aaf90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc29ydCUyMHBvb2x8ZW58MXx8fHwxNzY5ODMyMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: '海滨度假村',
      subtitle: '畅享无限泳池'
    }
  ]

  return (
    <Swiper
      className="banner-swiper"
      indicatorColor="#rgba(255,255,255,0.5)"
      indicatorActiveColor="#fff"
      circular
      indicatorDots
      autoplay
    >
      {banners.map((item, index) => (
        <SwiperItem key={index}>
          <View className="banner-item" onClick={onBannerClick}>
            <Image src={item.image} mode="aspectFill" className="banner-bg" />
            <View className="banner-content">
              <View className="text-box">
                <View className="title">{item.title}</View>
                <View className="subtitle">{item.subtitle}</View>
              </View>
            </View>
          </View>
        </SwiperItem>
      ))}
    </Swiper>
  )
}
