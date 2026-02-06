
import request from './request'

// Auth
export const login = (data) => request({ url: '/users/login', method: 'POST', data })
export const register = (data) => request({ url: '/users/register', method: 'POST', data })
export const getUserProfile = (userId) => request({ url: `/users/profile/${userId}` })
export const updateUserProfile = (userId, data) => request({ url: `/users/profile/${userId}`, method: 'PUT', data })

// Hotel
export const getHotelList = () => request({ url: '/hotels' })
export const getHotelDetail = (id) => request({ url: `/hotels/${id}` })
export const searchHotels = (params) => request({ url: '/hotels/search', data: params })
export const getHotelAttributes = () => request({ url: '/hotels/attributes' })

// Order
export const createOrder = (data) => request({ url: '/order/create', method: 'POST', data })
export const getOrderList = (status) => request({ url: '/order/list', data: { status } })


