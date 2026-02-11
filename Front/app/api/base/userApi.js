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