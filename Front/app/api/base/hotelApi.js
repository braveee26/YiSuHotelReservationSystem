import {service as request} from '../../utils/request.js';

/**
 * 根据 ID 获取酒店详情
 * @param {number} id 酒店 ID
 */
export function getHotelById(id) {
    return request({
        url: `/hotel/${id}`,
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}

/**
 * 新建酒店
 * @param {object} data 酒店信息
 */
export function createHotel(data) {
    return request({
        url: '/hotel',
        method: 'post',
        data: data,
    });
}

/**
 * 编辑酒店信息
 * @param {number} id 酒店 ID
 * @param {object} data 酒店信息
 */
export function updateHotel(id, data) {
    return request({
        url: `/hotel/${id}`,
        method: 'put',
        data: data,
    });
}

/**
 * 获取商户的酒店列表
 * @param {number} merchantId 商户 ID
 */
export function getHotelsByMerchantId(merchantId) {
    return request({
        url: `/hotel/merchant/${merchantId}`,
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}

/**
 * 切换酒店上下线状态
 * @param {number} id 酒店 ID
 */
export function toggleOnlineStatus(id) {
    return request({
        url: `/hotel/${id}/online-status`,
        method: 'put',
    });
}

/**
 * 商户提交酒店审核
 * @param {number} id 酒店 ID
 */
export function submitAudit(id) {
    return request({
        url: `/hotel/${id}/submit-audit`,
        method: 'put',
    });
}

/**
 * 获取商户酒店统计数据
 * @param {number} merchantId 商户 ID
 */
export function getMerchantHotelStats(merchantId) {
    return request({
        url: `/hotel/merchant/${merchantId}/stats`,
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}
