import {service as request} from '../../utils/request.js';

/**
 * 获取指定酒店的全部图片
 * @param {number} hotelId 酒店 ID
 */
export function getImagesByHotelId(hotelId) {
    return request({
        url: `/hotel-image/list/${hotelId}`,
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}
