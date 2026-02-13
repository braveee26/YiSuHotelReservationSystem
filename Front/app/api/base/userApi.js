import {service as request} from '../../utils/request.js';

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data,
    })
}

export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data: data,
    });
}


export function getCurrentUserInfo() {
    return request({
        url: '/user/currentInfo',
        method: 'get',
        params: { _t: new Date().getTime() }
    })
}

export function getUserById(id) {
    return request({
        url: '/user/getUser',
        method: 'get',
        params: { id, _t: new Date().getTime() }
    })
}

// 管理员获取所有用户列表
export function getAllUsers(role) {
    return request({
        url: '/user/admin/all',
        method: 'get',
        params: { role, _t: new Date().getTime() }
    })
}

// 管理员更新用户状态
export function updateUserStatus(id, isActive) {
    return request({
        url: `/user/admin/${id}/status`,
        method: 'put',
        params: { isActive }
    })
}

// 管理员获取用户统计数据
export function getUserStatistics() {
    return request({
        url: '/user/admin/statistics',
        method: 'get',
        params: { _t: new Date().getTime() }
    })
}