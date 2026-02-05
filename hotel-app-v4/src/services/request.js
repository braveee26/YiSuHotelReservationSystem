
import Taro from '@tarojs/taro'
import useUserStore from '../store/userStore'

const baseUrl = 'http://localhost:3000/api' // Local Backend API

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
        // Backend returns data directly, not wrapped in {code, data, msg}
        if (res.statusCode >= 200 && res.statusCode < 300) {
            return res.data
        } else if (res.statusCode === 401) {
            // Unauthenticated
            Taro.navigateTo({ url: '/pages/auth/login/index' })
            return Promise.reject('Unauthorized')
        } else {
            const errorMsg = res.data?.error || 'Error'
            Taro.showToast({ title: errorMsg, icon: 'none' })
            return Promise.reject(errorMsg)
        }
    }).catch(err => {
        Taro.showToast({ title: 'Network Error', icon: 'none' })
        return Promise.reject(err)
    })
}

export default request

