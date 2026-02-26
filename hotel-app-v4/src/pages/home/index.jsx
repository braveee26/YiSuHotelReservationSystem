import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { Loading } from "@taroify/core";
import { Replay } from "@taroify/icons";
import BannerCarousel from "./BannerCarousel";
import SearchCard from "./SearchCard";
import CustomNavBar from "../../components/CustomNavBar";
import HotelCard from "../../components/HotelCard";
import CustomTabBar from "../../components/CustomTabBar";
import PageFadeIn from "../../components/PageFadeIn";
import {
  getHotelRecommendations,
  getHotelAttributes,
} from "../../services/api";
import "./index.scss";

export default function Home() {
  const [hotTags, setHotTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recommendations and hot tags from API on mount
  useEffect(() => {
    fetchRecommendations();
    fetchHotTags();
  }, []);

  const fetchHotTags = async () => {
    try {
      const data = await getHotelAttributes();
      setHotTags(data.map((attr) => attr.attr_name));
    } catch (error) {
      console.error("Failed to fetch hot tags:", error);
      // Fallback to default tags
      setHotTags(["商圈", "温泉酒店", "免费取消", "双床", "高端星"]);
    }
  };

  const fetchRecommendations = async (isManual = false) => {
    if (isManual) {
      Taro.showLoading({ title: "重刷推荐中..." });
    }
    setLoading(true);
    try {
      const data = await getHotelRecommendations();
      // Transform backend data to match HotelCard expected props
      const transformedHotels = data.map((hotel) => {
        // Parse nearby_attractions as tags if available
        let tags = [];
        if (hotel.nearby_attractions) {
          tags = hotel.nearby_attractions
            .split(/[,;，；]/)
            .map((t) => t.trim())
            .filter(Boolean)
            .slice(0, 3);
        }
        if (tags.length === 0) {
          if (hotel.star_level >= 5) tags = ["五星体验", "设施完善"];
          else if (hotel.star_level >= 4) tags = ["品质住宿", "交通便利"];
          else tags = ["经济实惠"];
        }

        return {
          id: hotel.hotel_id,
          name: hotel.hotel_name_cn,
          image:
            hotel.primary_image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=400&h=300",
          stars: hotel.star_level,
          reviews: 0,
          price: hotel.min_price || 0,
          tags: tags,
          distance: hotel.detail_address,
          badges: hotel.star_level >= 4 ? ["推荐"] : [],
        };
      });
      setHotels(transformedHotels);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      Taro.showToast({ title: "加载推荐失败", icon: "none" });
    } finally {
      setLoading(false);
      if (isManual) Taro.hideLoading();
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSearch = (params) => {
    console.log("Search params:", params);
    // Navigate to hotel list with search params
    const query = new URLSearchParams({
      city: params.city || "",
      keyword: params.keyword || "",
      checkIn: params.checkIn || "",
      checkOut: params.checkOut || "",
    }).toString();
    Taro.navigateTo({ url: `/pages/hotel/list/index?${query}` });
  };

  const handleHotelClick = (id) => {
    Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` });
  };

  return (
    <>
      <CustomNavBar title="易宿酒店预订平台" showBack={false} transparent />
      <PageFadeIn>
        <View className="home-page" style={{ paddingTop: 0 }}>
          <View className="scroll-content">
            {/* Banner */}
            <BannerCarousel
              data={hotels.slice(0, 5)}
              onBannerClick={handleHotelClick}
            />

            {/* Search Card */}
            <SearchCard onSearch={handleSearch} />

            {/* Hot Tags */}
            <View className="section-container">
              <View className="section-header">
                <Text className="icon">🔥</Text>
                <Text className="title">热门搜索</Text>
              </View>
              <View className="tags-list">
                {hotTags.map((tag, index) => (
                  <View
                    key={index}
                    className={`hot-tag ${selectedTags.includes(tag) ? "active" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </View>
                ))}
              </View>
            </View>

            {/* Recommendations */}
            <View className="section-container">
              <View className="section-header jb">
                <Text className="title">为你推荐</Text>
                <View
                  className="refresh-box"
                  onClick={() => fetchRecommendations(true)}
                >
                  <Replay className="refresh-icon" />
                  <Text className="refresh-text">换一批</Text>
                </View>
              </View>
              <View className="hotel-list">
                {loading ? (
                  <View style={{ textAlign: "center", padding: "40px 0" }}>
                    <Loading type="spinner" />
                    <Text
                      style={{
                        display: "block",
                        marginTop: "10px",
                        color: "#999",
                      }}
                    >
                      加载中...
                    </Text>
                  </View>
                ) : hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onClick={() => handleHotelClick(hotel.id)}
                    />
                  ))
                ) : (
                  <View
                    style={{
                      textAlign: "center",
                      padding: "40px 0",
                      color: "#999",
                    }}
                  >
                    <Text>暂无酒店数据</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Placeholder for bottom spacing */}
            <View style={{ height: "120px" }}></View>
          </View>
        </View>
      </PageFadeIn>

      {/* CustomTabBar 必须在 PageFadeIn 外面，否则 transform 会导致 fixed 失效 */}
      <CustomTabBar />
    </>
  );
}
