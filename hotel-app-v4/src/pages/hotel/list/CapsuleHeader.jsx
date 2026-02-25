import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Search, LocationOutlined, More, ArrowLeft } from "@taroify/icons";
import "./CapsuleHeader.scss";

export default function CapsuleHeader({
    city,
    checkIn,
    checkOut,
    rooms = 1,
    adults = 2,
    keyword = "",
    onBack,
    onCityClick,
    onDateClick,
    onSettingClick,
    onKeywordClick
}) {
    // 稳健的日期格式化 MM-DD
    const formatMD = (dateStr) => {
        if (!dateStr || typeof dateStr !== "string" || dateStr.length < 5) return "--";
        try {
            const parts = dateStr.split("-");
            if (parts.length < 3) return dateStr;
            return `${parts[1]}-${parts[2]}`;
        } catch (e) {
            return "--";
        }
    };

    return (
        <View className="capsule-header-wrapper">
            <View className="back-icon" onClick={onBack}>
                <ArrowLeft size="20" />
            </View>

            <View className="capsule-body">
                {/* 城市 */}
                <View className="section city" onClick={onCityClick}>
                    <Text className="text">{city || "城市"}</Text>
                </View>

                {/* 日期和间数 */}
                <View className="section info" onClick={onDateClick}>
                    <View className="dates">
                        <Text className="date">{formatMD(checkIn)}</Text>
                        <Text className="date">{formatMD(checkOut)}</Text>
                    </View>
                    <View className="occupancy">
                        <Text className="line">{rooms}间</Text>
                        <Text className="line">{adults}人</Text>
                    </View>
                </View>

                {/* 搜索框 */}
                <View className="section search" onClick={onKeywordClick}>
                    <Text className="keyword-text">{keyword || "关键字/酒店/地标"}</Text>
                    <Search size="16" color="#999" />
                </View>
            </View>

            <View className="action-icons">
                <View className="icon-item" onClick={() => Taro.showToast({ title: "地图模式开发中", icon: "none" })}>
                    <LocationOutlined size="20" />
                    <Text className="label">地图</Text>
                </View>
                <View className="icon-item more" onClick={onSettingClick}>
                    <More size="20" />
                    <Text className="label">更多</Text>
                    <View className="dot"></View>
                </View>
            </View>
        </View>
    );
}
