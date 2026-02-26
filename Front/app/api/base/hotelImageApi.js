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

/**
 * 上传酒店图片
 * @param {number} hotelId 酒店 ID
 * @param {FormData} formData 包含文件的 FormData
 */
export function uploadHotelImage(hotelId, formData) {
    return request({
        url: `/hotel-image/upload/${hotelId}`,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 删除酒店图片
 * @param {number} imageId 图片 ID
 */
export function deleteHotelImage(imageId) {
    return request({
        url: `/hotel-image/${imageId}`,
        method: 'delete'
    });
}

/**
 * 批量保存酒店图片
 * @param {Array} images 图片列表
 */
export function batchSaveHotelImages(images) {
    return request({
        url: '/hotel-image/batch',
        method: 'post',
        data: images
    });
}

/**
 * 批量更新图片排序
 * @param {Array} images 图片列表（包含 imageId 和 sortOrder）
 */
export function batchUpdateSort(images) {
    return request({
        url: '/hotel-image/batch/sort',
        method: 'put',
        data: images
    });
}
