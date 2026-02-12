import {service as request} from '../../utils/request.js';

/**
 * 获取指定酒店的全部房型
 * @param {number} hotelId 酒店 ID
 */
export function getRoomsByHotelId(hotelId) {
    return request({
        url: `/room-type/list/${hotelId}`,
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}

/**
 * 新建房型
 * @param {object} data 房型信息
 */
export function createRoom(data) {
    return request({
        url: '/room-type',
        method: 'post',
        data: data,
    });
}

/**
 * 编辑房型
 * @param {number} id 房型 ID
 * @param {object} data 房型信息
 */
export function updateRoom(id, data) {
    return request({
        url: `/room-type/${id}`,
        method: 'put',
        data: data,
    });
}

/**
 * 删除房型
 * @param {number} id 房型 ID
 */
export function deleteRoom(id) {
    return request({
        url: `/room-type/${id}`,
        method: 'delete',
    });
}
