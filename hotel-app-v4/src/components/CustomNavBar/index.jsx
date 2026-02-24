import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { ArrowLeft } from '@taroify/icons'
import './CustomNavBar.scss'

export default function CustomNavBar({ title, showBack = true, transparent = false }) {
    const handleBack = () => {
        if (showBack) {
            Taro.navigateBack({
                fail: () => {
                    Taro.reLaunch({ url: '/pages/home/index' })
                }
            })
        }
    }

    return (
        <View className={`custom-navbar ${transparent ? 'transparent' : ''}`}>
            <View className="navbar-inner">
                {showBack && (
                    <View className="back-btn" onClick={handleBack}>
                        <ArrowLeft size="20" color={transparent ? '#fff' : '#333'} />
                    </View>
                )}
                <View className="title-box">
                    <Text className="title" style={{ color: transparent ? '#fff' : '#333' }}>{title}</Text>
                </View>
                {/* Placeholder to balance the layout */}
                {showBack && <View className="placeholder" />}
            </View>
        </View>
    )
}
