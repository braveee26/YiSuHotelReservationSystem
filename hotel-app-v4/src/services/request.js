
import Taro from '@tarojs/taro'
import useUserStore from '../store/userStore'

const baseUrl = 'https://api.example.com' // Replace with actual API URL

const request = (options) => {
    const { url, method = 'GET', data, header = {} } = options
    const { token } = useUserStore.getState() // Get token from Zustand store

    if (token) {
        header['Authorization'] = `Bearer ${token}`
    }

    return Taro.request({
        url: baseUrl + url,
        method,
        data,
        header: {
            'Content-Type': 'application/json',
            ...header
        }
    }).then(res => {
        const { code, data, msg } = res.data
        if (code === 200) {
            return data
        } else if (code === 401) {
            // Unauthenticated
            Taro.navigateTo({ url: '/pages/auth/login/index' })
            return Promise.reject('Unauthorized')
        } else {
            Taro.showToast({ title: msg || 'Error', icon: 'none' })
            return Promise.reject(msg)
        }
    }).catch(err => {
        Taro.showToast({ title: 'Network Error', icon: 'none' })
        return Promise.reject(err)
    })
}

export default request
