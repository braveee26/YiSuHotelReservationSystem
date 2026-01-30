
import request from './request'

// Auth
export const login = (data) => request({ url: '/auth/login', method: 'POST', data })

// Hotel
export const getHotelList = (params) => request({ url: '/robot/hotel/list', data: params })
export const getHotelDetail = (id) => request({ url: `/robot/hotel/${id}` })

// Order
export const createOrder = (data) => request({ url: '/order/create', method: 'POST', data })
export const getOrderList = (status) => request({ url: '/order/list', data: { status } })
