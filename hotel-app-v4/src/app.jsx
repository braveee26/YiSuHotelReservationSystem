
import React, { Component } from 'react'
import "@taroify/core/index.scss"
import './app.scss'

console.log('🔥 [Global] app.jsx loaded! JavaScript is running.')

class App extends Component {
  componentDidMount() {
    console.log('🚀 [App] componentDidMount')
    // 隐藏调试消息，表示React已成功挂载
    if (typeof document !== 'undefined') {
      const debugStatus = document.getElementById('debug-status')
      const appElement = document.getElementById('app')

      if (debugStatus) {
        debugStatus.style.display = 'none'
        console.log('✅ [App] Debug status hidden - React mounted successfully')
      } else {
        console.warn('⚠️ [App] Debug status element not found')
      }

      if (appElement) {
        console.log('✅ [App] App element found, children count:', appElement.children.length)
        console.log('✅ [App] App element innerHTML length:', appElement.innerHTML.length)
        console.log('✅ [App] App element innerHTML:', appElement.innerHTML.substring(0, 200))
        
        // 检查是否有其他可能的挂载点
        const taroRoot = document.getElementById('taro-root')
        const root = document.getElementById('root')
        if (taroRoot) {
          console.log('✅ [App] Found taro-root element, children:', taroRoot.children.length)
        }
        if (root) {
          console.log('✅ [App] Found root element, children:', root.children.length)
        }
        
        // 检查 body 的所有直接子元素
        console.log('✅ [App] Body children:', Array.from(document.body.children).map(el => el.id || el.tagName))
      } else {
        console.error('❌ [App] App element (#app) not found!')
      }
    }
  }

  render() {
    console.log('🚀 [App] render', this.props.children)
    return this.props.children
  }
}

export default App
