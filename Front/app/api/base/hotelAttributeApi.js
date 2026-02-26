import {service as request} from '../../utils/request.js';

/**
 * 获取全部设施/属性列表
 */
export function getAllAttributes() {
    return request({
        url: '/hotel-attribute/list',
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}

/**
 * 新建设施/属性
 * @param {object} data 属性信息
 */
export function createAttribute(data) {
    return request({
        url: '/hotel-attribute',
        method: 'post',
        data: data,
    });
}

/**
 * 编辑设施/属性
 * @param {number} id 属性 ID
 * @param {object} data 属性信息
 */
export function updateAttribute(id, data) {
    return request({
        url: `/hotel-attribute/${id}`,
        method: 'put',
        data: data,
    });
}

/**
 * 删除设施/属性
 * @param {number} id 属性 ID
 */
export function deleteAttribute(id) {
    return request({
        url: `/hotel-attribute/${id}`,
        method: 'delete',
    });
}
