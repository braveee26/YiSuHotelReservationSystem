import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { Search } from '@taroify/icons'
import useSearchStore from '../../../store/search'
import { getSearchSuggestions } from '../../../services/api'
import CustomNavBar from '../../../components/CustomNavBar'
import './index.scss'

export default function SearchSuggestion() {
    const [keyword, setKeyword] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const { updateSearchParam } = useSearchStore()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (keyword.trim()) {
                fetchSuggestions()
            } else {
                setSuggestions([])
            }
        }, 300)
        return () => clearTimeout(timer)
    }, [keyword])

    const fetchSuggestions = async () => {
        setLoading(true)
        try {
            const data = await getSearchSuggestions(keyword)
            setSuggestions(data)
        } catch (error) {
            console.error('Fetch suggestions failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelect = (item) => {
        updateSearchParam('keyword', item.name)
        // 根据类型可能还需要更新其他参数，或者仅更新关键字
        Taro.navigateBack()
    }

    return (
        <View className="search-suggestion-page">
            <CustomNavBar title="搜索" />
            <View className="search-header">
                <View className="search-input-wrap">
                    <Search size="20" color="#999" />
                    <Input
                        className="input"
                        value={keyword}
                        placeholder="雨花台"
                        onInput={(e) => setKeyword(e.detail.value)}
                        focus
                    />
                </View>
                <Text className="cancel-btn" onClick={() => Taro.navigateBack()}>取消</Text>
            </View>

            <ScrollView scrollY className="suggestion-list">
                {keyword && (
                    <View className="section-title">当前城市搜索结果</View>
                )}
                {suggestions.map((item, index) => (
                    <View key={index} className="suggestion-item" onClick={() => handleSelect(item)}>
                        <View className="info-main">
                            <Text className="name">{item.name}</Text>
                            {item.subText && <Text className="subtext">{item.subText}</Text>}
                        </View>
                        <Text className="type-tag">{item.type}</Text>
                    </View>
                ))}
                {!loading && keyword && suggestions.length === 0 && (
                    <View className="no-result">暂无搜索结果</View>
                )}
            </ScrollView>
        </View>
    )
}
