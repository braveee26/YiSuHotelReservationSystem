
import React, { Component } from 'react'
import "@taroify/core/index.scss"
import './app.scss'

console.log('🔥 [Global] app.jsx loaded! JavaScript is running.')

class App extends Component {
  componentDidMount() {
    console.log('🚀 [App] componentDidMount')
  }

  render() {
    console.log('🚀 [App] render', this.props.children)
    return this.props.children
  }
}

export default App
