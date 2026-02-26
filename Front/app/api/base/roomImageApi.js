import {service as request} from '../../utils/request.js';

/**
 * 获取指定房型的全部图片
 * @param {number} roomId 房型 ID
 */
export function getImagesByRoomId(roomId) {
    return request({
        url: `/room-image/list/${roomId}`,
        method: 'get',
        params: { _t: new Date().getTime() }
    });
}

/**
 * 上传房型图片
 * @param {number} roomId 房型 ID
 * @param {FormData} formData 包含文件的 FormData
 */
export function uploadRoomImage(roomId, formData) {
    return request({
        url: `/room-image/upload/${roomId}`,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

/**
 * 删除房型图片
 * @param {number} imageId 图片 ID
 */
export function deleteRoomImage(imageId) {
    return request({
        url: `/room-image/${imageId}`,
        method: 'delete'
    });
}

/**
 * 批量保存房型图片
 * @param {Array} images 图片列表
 */
export function batchSaveRoomImages(images) {
    return request({
        url: '/room-image/batch',
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
        url: '/room-image/batch/sort',
        method: 'put',
        data: images
    });
}
