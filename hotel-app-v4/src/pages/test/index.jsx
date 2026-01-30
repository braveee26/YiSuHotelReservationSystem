import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'

export default class TestPage extends Component {
  componentDidMount() {
    console.log('🧪 [TestPage] mounted')
  }

  render() {
    return (
      <View style={{ padding: 50, background: 'lightgreen' }}>
        <Text>Test Page Logic</Text>
        <View>如果这页能显示，说明是 TabBar 配置的问题</View>
      </View>
    )
  }
}
