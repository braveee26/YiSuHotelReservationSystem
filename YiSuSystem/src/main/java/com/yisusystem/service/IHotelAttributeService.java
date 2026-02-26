package com.yisusystem.service;

import com.yisusystem.pojo.entity.HotelAttribute;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 存储酒店可选属性（支持前端筛选标签） 服务类
 * </p>
 *
 * @author liufuming
 * @since 2026-02-04
 */
public interface IHotelAttributeService extends IService<HotelAttribute> {

    /**
     * 管理员创建新的酒店属性
     *
     * @param attributeName 属性名称
     * @param attributeType 属性类型
     * @return 创建结果
     */
    Boolean createHotelAttribute(String attributeName, String attributeType);

    /**
     * 管理员更新酒店属性
     *
     * @param id 属性ID
     * @param attributeName 属性名称
     * @param attributeType 属性类型
     * @return 更新结果
     */
    Boolean updateHotelAttribute(Long id, String attributeName, String attributeType);

    /**
     * 管理员删除酒店属性
     *
     * @param id 属性ID
     * @return 删除结果
     */
    Boolean deleteHotelAttribute(Long id);

}
