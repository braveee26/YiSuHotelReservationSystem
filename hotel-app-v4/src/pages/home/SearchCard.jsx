import Taro from "@tarojs/taro";
import { useState, useMemo } from "react";
import { View, Text } from "@tarojs/components";
import { Button, Popup, Calendar, Cascader, Radio } from "@taroify/core";
import { Search, Aim, ArrowDown } from "@taroify/icons";
import useSearchStore from "../../store/search";
import { regions } from "../../data/regions";
import "./SearchCard.scss";

export default function SearchCard({ onSearch = () => { } }) {
  const { searchParams, setSearchParams, updateSearchParam } = useSearchStore();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showStarPicker, setShowStarPicker] = useState(false);

  // 临时状态，用于日历弹窗内的选择
  const [tempDateRange, setTempDateRange] = useState([
    new Date(searchParams.checkIn.replace(/-/g, '/')),
    new Date(searchParams.checkOut.replace(/-/g, '/')),
  ]);

  const quickFilterTags = [
    "洗衣机", "免费WIFI", "免费停车", "SPA", "泳池", "送餐机器人",
  ];

  const starOptions = [
    { label: "不限星级", value: "" },
    { label: "五星级", value: "5" },
    { label: "四星级", value: "4" },
    { label: "三星级", value: "3" },
    { label: "二星级", value: "2" },
    { label: "一星级", value: "1" },
  ];

  // 100% 规避时区偏移的显示逻辑：直接字符串切割
  const formatDateDisplay = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return "";
    const parts = dateStr.split("-"); // yyyy-mm-dd
    if (parts.length < 3) return dateStr;
    return `${parts[1]}月${parts[2]}日`;
  };

  const getDayOfWeekShort = (dateStr) => {
    if (!dateStr || typeof dateStr !== 'string') return "";
    const date = new Date(dateStr.replace(/-/g, '/'));
    if (isNaN(date.getTime())) return "";
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return days[date.getDay()];
  };




  const handleCalendarConfirm = (dateRange) => {
    if (!dateRange || dateRange.length < 2) return
    const [start, end] = dateRange

    const formatToYMD = (date) => {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const checkInStr = formatToYMD(start);
    const checkOutStr = formatToYMD(end);
    const nights = Math.max(
      1,
      Math.round((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)),
    );

    setSearchParams({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      nights: nights
    });

    Taro.showToast({ title: '修改日期成功', icon: 'success' });
    setShowCalendar(false);
  };

  const handleCitySelect = (values) => {
    if (values && values.length > 0) {
      const selectedCity = values[values.length - 1];
      updateSearchParam("city", selectedCity);
      if (values.length >= 2) {
        setShowCityPicker(false);
        Taro.showToast({ title: `已选: ${selectedCity}`, icon: "none" });
      }
    }
  };

  const handleLocationClick = () => {
    Taro.showLoading({ title: "识别位置中...", mask: true });
    Taro.getLocation({
      success: () => {
        setTimeout(() => {
          Taro.hideLoading();
          updateSearchParam("city", "南京市");
          Taro.showToast({ title: "自动识别: 南京", icon: "success" });
        }, 800);
      },
      fail: () => {
        setTimeout(() => {
          Taro.hideLoading();
          updateSearchParam("city", "南京市");
          Taro.showToast({ title: "环境受限，已推荐南京", icon: "none" });
        }, 1000);
      }
    });
  };

  const navigateToSearch = () => {
    // 携带核心参数跳转，支持推荐逻辑
    const query = new URLSearchParams({
      city: searchParams.city || "",
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      nights: searchParams.nights,
      keyword: searchParams.keyword || ""
    }).toString();
    Taro.navigateTo({ url: `/pages/hotel/list/index?${query}` });
  };

  return (
    <View className="search-card-upgraded">
      <View className="search-top-row">
        <View className="city-selector" onClick={() => setShowCityPicker(true)}>
          <Text className="city-name">{searchParams.city || "选择城市"}</Text>
          <ArrowDown size="12" color="#64748b" style={{ marginLeft: "4rpx" }} />
        </View>
        <View className="divider-v" />
        <View className="star-trigger" onClick={() => setShowStarPicker(true)}>
          <Text className="label">选择星级</Text>
          <View className="val-box">
            <Text className="val">{searchParams.stars ? `${searchParams.stars}星` : "不限"}</Text>
            <ArrowDown size="10" color="#94a3b8" />
          </View>
        </View>
        <View className="divider-v" />
        <View className="keyword-entry" onClick={navigateToSearch}>
          <Search size="16" color="#666" />
          <Text className="placeholder">{searchParams.keyword || "关键字/酒店/地标"}</Text>
        </View>
        <View className="location-action" onClick={handleLocationClick}>
          <Aim size="20" color="#385e72" />
        </View>
      </View>

      <View className="date-row" onClick={() => {
        setTempDateRange([
          new Date(searchParams.checkIn.replace(/-/g, '/')),
          new Date(searchParams.checkOut.replace(/-/g, '/'))
        ]);
        setShowCalendar(true);
      }}>
        <View className="date-box left">
          <Text className="label">入住日期</Text>
          <View className="date-val">
            <Text className="num">{formatDateDisplay(searchParams.checkIn)}</Text>
            <Text className="week">{getDayOfWeekShort(searchParams.checkIn)}</Text>
          </View>
        </View>
        <View className="night-info">
          <View className="badge">{searchParams.nights}晚</View>
        </View>
        <View className="date-box right">
          <Text className="label">离店日期</Text>
          <View className="date-val">
            <Text className="num">{formatDateDisplay(searchParams.checkOut)}</Text>
            <Text className="week">{getDayOfWeekShort(searchParams.checkOut)}</Text>
          </View>
        </View>
      </View>

      <View className="tags-row">
        {quickFilterTags.map((tag) => (
          <View
            key={tag}
            className={`tag-item ${(searchParams.tags || []).includes(tag) ? "active" : ""}`}
            onClick={() => {
              const currentTags = searchParams.tags || [];
              const newTags = currentTags.includes(tag)
                ? currentTags.filter((t) => t !== tag)
                : [...currentTags, tag];
              updateSearchParam("tags", newTags);
            }}
          >
            {tag}
          </View>
        ))}
      </View>

      <View className="search-btn-container">
        <Button
          color="#385e72"
          className="search-btn-main"
          onClick={navigateToSearch}
        >
          立即预订
        </Button>
      </View>

      <Popup open={showCityPicker} rounded placement="bottom" onClose={() => setShowCityPicker(false)}>
        <View className="cascader-wrap">
          <Cascader placeholder="请选择城市" onSelect={handleCitySelect} options={regions}>
            <Cascader.Header>选择城市</Cascader.Header>
          </Cascader>
        </View>
      </Popup>

      <Popup open={showStarPicker} rounded placement="bottom" onClose={() => setShowStarPicker(false)}>
        <View className="star-picker-content">
          <View className="picker-header">选择星级</View>
          <Radio.Group value={searchParams.stars} onChange={(val) => {
            updateSearchParam("stars", val);
            setTimeout(() => setShowStarPicker(false), 200);
          }}>
            {starOptions.map((opt) => (
              <View key={opt.value} className="star-option-item">
                <Text className="label">{opt.label}</Text>
                <Radio name={opt.value} shape="square" />
              </View>
            ))}
          </Radio.Group>
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
        "--calendar-month-title-font-size": "14px",
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
    </View>
  );
}
